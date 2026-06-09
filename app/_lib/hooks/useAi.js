'use client';

import { useState, useEffect } from 'react';
import { askAI } from '@/app/_actions/askAI';
import { hasReachedLimit, incrementCount } from '../helper';
import { MAX_PER_DAY } from '../config';
import { presets } from '../data';

export function useAi(chart, chartContext, selected) {
    
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visiblePresets, setVisiblePresets] = useState([]);
  const [messages, setMessages] = useState([]);

const [expanded, setExpanded] = useState(false);
const type = selected === 'birth' ? 'Transit' : 'Partner'

const aiIntro = chart === 'transit' ? `the current ${type === 'Partner' ? 'partner' : 'transit'}` : chart === 'natalTransit' ? `${type === 'Partner' ? 'the current synastry' : 'the current transits on your natal'}`
              : `your ${chart}`

function getPresets(chart) {
  if (chart === "natalTransit") {
    return type === "Transit"
      ? presets.comparisonTransit
      : presets.comparisonPartner;
  }
  else if (chart === "transit") {
      return type === "Transit"
      ? presets.transit
      : presets.partner;
  }

  return presets[chart] || [];
}

const isFirstConversation =
  messages.filter(m => m.role === 'user').length === 0;

function getRandomPresets(chart) {
  const list = getPresets(chart);

  return [...list]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}

useEffect(() => {

   setVisiblePresets(getRandomPresets(chart));

    setMessages([
      {
        role: 'assistant',
        isIntro: true,
        content:
          `Hi, I’m Lia ✨\nI’m here to read your scope and help you explore ${aiIntro} chart 🌙`,
      },
    ]);
  // }

}, [chart,type]);


  async function sendMessage() {
    if (!input.trim() || loading) return;


 if (hasReachedLimit(chart)) {
    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: `You've reached your daily limit of ${MAX_PER_DAY} questions for this chart 🌙 Try again tomorrow.`,
      },
    ]);
    return;
  }


    const userMessage = {
      role: 'user',
      content: input,
    };

   setMessages(prev => [...prev, userMessage]);

     setInput('');
     setLoading(true);

     try {

    const response = await askAI(chartContext, input);

if (!response.success) {
  setMessages(prev => [
    ...prev,
    {
      role: 'assistant',
      content: response.content,
    },
  ]);

  return; 
}

setMessages(prev => [
  ...prev,
  {
    role: 'assistant',
    content: response.content,
  },
]);

incrementCount(chart);
 
    } catch (err) {
      
  console.error('ASK AI ERROR:', err);
  setMessages(prev => [
    ...prev,
    {
      role: "assistant",
      content: "Something went wrong 🌙 Please try again in a moment.",
    },
  ]);

  return;
} finally {
      setLoading(false);
    }
  }

  return {
    aiIntro,
    input,
    setInput,
    loading,
    messages,
    visiblePresets,
    setVisiblePresets,
    expanded,
    setExpanded,
    isFirstConversation,
    sendMessage,
    getRandomPresets,
  };
}
'use client';

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { askAI } from '@/app/_actions/askAI';
import { hasReachedLimit, incrementCount } from '../helper';
import { MAX_PER_DAY } from '../config';
import { presets } from '../data';
import useHorary from './useHorary';

export function useAi(chart, chartContext, selected, mode) {
    
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visiblePresets, setVisiblePresets] = useState([]);
  const [messages, setMessages] = useState([]);
const pathname = usePathname();
const [expanded, setExpanded] = useState(false);
const type = selected === 'birth' ? 'Transit' : 'Partner'

const transitPath = pathname.split("/")[2]
const textareaRef = useRef(null);

const {horaryContent} = useHorary();

useLayoutEffect(() => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  textarea.style.height = "0px"; // oder "auto"
  textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
}, [input]);


const aiIntro = useMemo(() =>  chart === 'natalTransit' ? `to explore the current ${type === 'Partner' ? 'Synastry' : 'Transits on your Natal'} Chart` 
                             : chart === 'Horary' ? 'to get an answer to your next question. Horary mode is on. Ask one clear question.' 
                             : `to explore the current ${chart} Chart`, [chart, type])


function getPresets(chart) {
  if (chart === "natalTransit") {
    return type === "Transit"
      ? presets.comparisonTransit
      : presets.comparisonPartner;
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

const chartText = useMemo(()=>{ 
  if (mode === 'horary') {
  
    return horaryContent
  }
 else {return chartContext}},
 [mode, horaryContent, chartContext])

useEffect(() => {
   setVisiblePresets(getRandomPresets(chart));

    setMessages([
      {
        role: 'assistant',
        isIntro: true,
        content:
          `Hi, I’m Lia ✨\nI’m here to read your scope and help you ${aiIntro} 🌙`,
      },
    ]);
}, [aiIntro, chart]);


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

    const response = await askAI(chartText, input);

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
    textareaRef, transitPath, type
  };
}
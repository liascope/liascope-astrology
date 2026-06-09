'use client';

import ReactMarkdown from "react-markdown";
import CopyContext from './CopyContext';
import AiReminder from './AiReminder';
import AiLimitTracker from "./AiLimitTracker";

import { useAstroForm } from '../_lib/context/AstroContext';
import { useAi } from '../_lib/hooks/useAi';
import ArrowUp from "./navicons/ArrowUp";

export default function AiChat({ chartContext, chart}) {
  const {selected } = useAstroForm();
  const {aiIntro, input,
    setInput,
    loading,
    messages,
    visiblePresets,
    setVisiblePresets,
    expanded,
    setExpanded,
    isFirstConversation,
    sendMessage,
    getRandomPresets} = useAi (chart, chartContext, selected)

  return (
<div
  className={`flex flex-col rounded-lg border border-white/20 mx-5 backdrop-blur-xl p-3 sm:p-6 shadow-lg transition-all duration-300 ${
    expanded ? "h-[650px]" : "h-[420px] relative"
  }`}
>
  {/* ai chat header */}
  <div className='absolute -top-16 left-1/3'>
{ messages.filter(m => m.role === "assistant").length > 1 && (<AiReminder/>)}</div>

<div onClick={() => setExpanded(prev => !prev)}
  className="cursor-pointer text-sm font-medium text-black/70 mb-2"
>
  AI-powered Astrology Chat
    <div className="my-3 text-xs text-black/60">
        Lia is reading {aiIntro} chart only🌙
      </div>
    
</div>
      {/* ai chat */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === 'user'
                ? 'sm:text-base text-sm ml-auto max-w-[80%] rounded-xl rounded-tr-none  bg-gradient-to-br from-[rgb(232,155,83,0.7)] to-[rgba(230,193,85,0.1)] text-black/80 p-3 shadow-sm backdrop-blur-md'
                : 'sm:text-base text-sm whitespace-pre-line mr-auto max-w-[80%] rounded-xl rounded-tl-none bg-gradient-to-br from-[rgba(230,193,85,0.6)] to-[rgb(232,155,83,0.1)] text-black/80 p-3 shadow-sm backdrop-blur-md'
            }
          >
           <ReactMarkdown
                  components={{
                    strong: ({ children }) => ( <span>{children}</span>
                      ),
                        }}
                       >
                   {msg.content}
                  </ReactMarkdown>
                  {msg.role === "assistant" && idx !== 0 && (
              <CopyContext copy={msg.content} title='Copy Reading' padding='pr-2'/>
                   )}
          </div>
        ))}

        {loading && (
          <div className="mr-auto text-xs text-black/60 animate-pulse">
            ✨ Lia is reading...
          </div>
        )}
      </div>
        {isFirstConversation && (
  <div className="mb-3 flex flex-col">
    
    <div className="flex gap-2 overflow-x-auto pb-2 min-w-0">
      {visiblePresets.map((preset) => (
        <button
          key={preset}
          onClick={() => setInput(preset)}
          className="shrink-0 rounded-full px-3 py-1 text-xs border border-[rgb(232,155,83,0.7)] hover:bg-gradient-to-br hover:to-[rgb(232,155,83,0.4)]"
        >
          {preset}
        </button>
      ))}
    </div>
    <button
  onClick={() =>
    setVisiblePresets(getRandomPresets(chart))
  }
  className="text-right text-[10px] text-black/40 hover:text-black/70 mt-2"
>
  refresh suggestions ↻
</button>
  </div>
)}
  {/* chat */}
   <div
  className="
    relative
    flex items-end
    rounded-3xl
    border border-white/20
    bg-[rgb(96,127,106,0.4)]
    backdrop-blur-md
    pr-1 pl-5 py-1
  "
>
  <textarea
    value={input}
    onChange={(e) => {
      setInput(e.target.value);

      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }}
    rows={1}
    placeholder={`Ask Lia about ${aiIntro} chart...`}
    className="
      flex-1
      resize-none
      bg-transparent
      outline-none
      text-sm
      text-black/90
      placeholder-white/95
      mb-2
      max-h-40
      overflow-y-auto
    "
  />

  <button
    onClick={sendMessage}
    className={`
      ml-2
      shrink-0
      rounded-full
      text-white/95
      p-2
      bg-[#ebc155cc]
      hover:bg-[#e89b53]
      transition-all
      duration-300
      ${input ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
  >
    <ArrowUp />
  </button>
</div>
    
     <AiLimitTracker chart={chart}/>
    </div>
  );
}
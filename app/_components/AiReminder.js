'use client'
import { useState } from "react"
export default function AiReminder() {
const [showReminder, setShowReminder] = useState(true);


{return showReminder &&
 (
  <div className="relative self-start mb-3 max-w-[240px]">

    {/* Close */}
    <button
      onClick={() => setShowReminder(false)}
      className="
        absolute top-2 right-2 z-20
        text-black/40 hover:text-black/95
        text-xs leading-none
        transition cursor-pointer
      "
      aria-label="Close reminder"
    >
      ✕
    </button>

    <div
      className="
        rounded-2xl rounded-bl-sm
        bg-gradient-to-br
        from-[rgba(230,193,85)]
        to-[rgb(232,155,83)]
        border border-white/20
        px-3 py-2 pr-7
        text-[11px] text-black/60
        backdrop-blur-md
      "
    >
      <div className="font-medium text-black/70 mb-1">
        Leaving this chart? ✨
      </div>

      <div>
        Copy your readings first so you can revisit them later. 🌙
      </div>
    </div>

  </div>
)}
    
}
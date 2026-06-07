'use client';

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyContext({ copy, title = 'Copy Chart', padding='-mb-7 pt-5 pr-10' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copy);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group flex justify-end ${padding} w-full`}>

      {/* Tooltip */}
      <div
        className={`
          absolute -top-8 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md
          transition-all duration-200
          ${copied
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1 pointer-events-none"
          }
        `}
      >
        {copied ? "Copied ✓" : "Copy"}
      </div>

      {/* Button */}
      <button
        onClick={handleCopy}
        className="text-black/40 hover:text-black/80 transition"
        title={title}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

    </div>
  );
}
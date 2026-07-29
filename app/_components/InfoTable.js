
'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { aspectSymbols, dignity } from "@/app/_lib/config";

  
export default function InfoTable () {
  const [isOpen, setIsOpen] = useState(false);
  const fadeZoom = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="text-xs z-20 w-36 md:scale-100 scale-80 text-right  md:mr-0
    -mr-3">

  <button onClick={() => setIsOpen(!isOpen)} className="text-xs
    rounded-2xl bg-white/35
    backdrop-blur-md
    border
    border-white/40
    shadow-md
   tracking-wide
      text-[#607f6a]
      font-medium
    p-3 
  ">
        Info {isOpen ?  "▲" : "▼"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...fadeZoom}
            className=" absolute
    top-full
    right-0
    z-10 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent sm:h-[20rem] h-[10em] p-2"
          >
              <ul className="py-3"> 
                   <h3>Letter Meanings:</h3>
                {dignity.map(([symbol, meaning]) => (
                  <li key={symbol}>
                    {symbol} {meaning}
                  </li>
                ))}
              </ul>  
                <ul> <h3>Symbol Meanings:</h3>
                {Object.entries(aspectSymbols).map(([name, symbol]) => (
                  <li key={name}>
                    {symbol} – {name}
                  </li>
                ))}
              </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { symbols } from "@/app/_lib/config";

export default function AspectTableTransitNatal({planets, aspectMatrix}) {

  return ( 
      <div className="grid text-center text-[clamp(0.6rem,1.5vw,1rem)] sm:text-[clamp(0.8rem,1vw,1.2rem)] backdrop-blur-sm overflow-hidden"
        style={{gridTemplateColumns: `repeat(${planets.length + 1}, minmax(0, 1fr))`, gridAutoRows: "1fr",}}>
        {/* Empty corner */}
        <div/>
        {/* Top headers - Transit / Partner */}
        {planets.map((p) => (
          <div key={p} className="flex items-center justify-center md:rounded-md text-[#3f638d] border border-[#3f638d]/30 font-bold text-xs md:text-base md:p-1">
            {symbols.find((s) => s[1] === p)?.[0]} </div> ))}
        {/* Rows */}
        {aspectMatrix.map((row) => [<div key={`${row.planet}-header`}
            className="flex items-center justify-center text-xs sm:text-sm md:text-base border border-[#607f6a]/30 font-bold text-[#607f6a] md:rounded-md md:p-1">
            {symbols.find((s) => s[1] === row.planet)?.[0]}</div>, ...row.aspects.map((symbol, idx) => (
            <div key={`${row.planet}-${idx}`} className="flex items-center justify-center text-[#947936d5] font-bold border border-[#947936cc]/20 transition-all duration-200 text-sm lg:text-lg hover:bg-stone-400/20">
              {symbol}
            </div>))])}
    </div>
   );}
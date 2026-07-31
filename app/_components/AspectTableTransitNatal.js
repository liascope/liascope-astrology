import { symbols } from "@/app/_lib/config";

export default function AspectTableTransitNatal({planets, aspectMatrix}) {

  return ( 
      <div className="grid text-center text-[clamp(0.6rem,1.5vw,1rem)] sm:text-[clamp(0.8rem,1vw,1.2rem)] backdrop-blur-sm overflow-hidden"
        style={{gridTemplateColumns: `repeat(${planets.length + 1}, minmax(0, 1fr))`, gridAutoRows: "1fr",}}>
        {/* Empty corner */}
        <div/>
        {/* Top headers - Transit / Partner */}
        {planets.map((p) => (
          <div key={p} className="p-1 text-[#3f638d] border border-[#3f638d]/20 md:font-bold font-normal md:text-sm text-xxs lg:text-lg">
            {symbols.find((s) => s[1] === p)?.[0]} </div> ))}
        {/* Rows */}
        {aspectMatrix.map((row) => [<div key={`${row.planet}-header`}
            className="text-[#4fa091] md:font-bold font-normal md:text-sm text-xxs lg:text-lg p-1 border border-[#4fa091]/30">
            {symbols.find((s) => s[1] === row.planet)?.[0]}</div>, ...row.aspects.map((symbol, idx) => (
            <div key={`${row.planet}-${idx}`} className=" text-[#947936d5] border border-[#947936cc]/20 transition-all duration-200 text-xxs md:text-sm lg:text-lg hover:bg-gray-400/10 p-1">
              {symbol}
            </div>))])}
    </div>
   );}
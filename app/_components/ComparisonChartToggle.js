import ChartCircle from "./navicons/ChartCircle"

export default function ComparisonChartToggle ({setChange, change, type}){

    return ( <button type="button" onClick={() => setChange(!change)}
      className="flex items-center gap-1 md:gap-3 rounded-full bg-white backdrop-blur-sm border border-white/40 px-4 py-2 text-xs md:text-sm  text-[#607f6a] mt-2 md:mt-0 scale-70 md:scale-100 shadow-md transition-all  duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:bg-[#e89b53]/10">
    
      <span className={`whitespace-nowrap
    flex-shrink-0 flex flex-row items-center justify-center gap-1 transition-all ${!change ? "font-semibold text-[#607f6a]" : "opacity-45"}`}>
        {!change ? '◉' : '◎'} Natal
      </span>
    <ChartCircle/>
      <span className={`whitespace-nowrap
    flex-shrink-0 flex flex-row items-center justify-center gap-1 transition-all ${change ? "font-semibold text-[#607f6a]" : "opacity-45"}`}>
         {type} {change ? '◉' : '◎'} </span>
    
        </button>)
}
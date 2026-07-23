import { symbols } from "@/app/_lib/config";

export default function AspectTableTransitNatal({planets, aspectMatrix}) {

  return (
    <div className="flex lg:flex-row flex-col md:w-fit w-full relative">
  <div className="w-full h-fit sm:rounded-none lg:w-[39rem] lg:h-[39rem]">
  <div
    className="grid text-[clamp(0.6rem, 1.5vw, 1rem)] sm:text-[clamp(0.8rem, 1vw, 1.2rem)]"
    style={{
      gridTemplateColumns: `repeat(${planets.length + 1}, minmax(0, 1fr))`,
      gridAutoRows: "1fr" 
    }}
  > 
   {/* header */}
    <div></div>
    {planets.map((p) => (
      <div
        key={p}
        className="font-bold text-sm gridContainer text-[#3f638d]"
      >
        {symbols.find((s) => s[1] === p)?.[0]}
      </div>
    ))}

    {aspectMatrix.map((row) => [
      <div
        key={`${row.planet}-header`}
        className="text-[#4fa091] font-bold text-sm gridContainer"
      >
        {symbols.find((s) => s[1] === row.planet)?.[0]}
      </div>,

      ...row.aspects.map((symbol, idx) => (
        <div
          key={`${row.planet}-${idx}`}
          className=" text-center gridContainer"
        >
          {symbol}
        </div>
      ))
    ])}
  </div>
</div>
    </div>);}

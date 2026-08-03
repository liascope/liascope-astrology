import { symbols } from "@/app/_lib/config";
import { getSymbolFromAspect } from "@/app/_lib/helper";

export default function AspectTable({ aspect }) {
  const planetNames = symbols.map((s) => s[1]);

 return (
  <div className="w-full flex justify-center py-2">

    <div className="w-[min(96vw,420px)] sm:w-[min(90vw,520px)]">

      <div
        className="grid overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${planetNames.length}, minmax(0, 1fr))`, }}>
        {planetNames.map((planet, i) => {const planetAspects = aspect?.filter((a) => a.includes(planet));

          const emptyCells = Array.from({ length: i }).map((_, k) => (
            <div key={`empty-${i}-${k}`} className="aspect-square"/> ));

          const headerCell = (
            <div key={`header-${i}`} className="aspect-square flex items-center justify-center border md:rounded-md border-[#607f6a]/30 font-bold text-[#607f6a] text-xs sm:text-sm md:text-base">
              {symbols.find((s) => s[1] === planet)?.[0] || planet}
            </div>
          );

          const dataCells = planetNames.slice(i + 1).map((p, j) => {
              const asp = planetAspects?.find((a) => a.includes(p));

              const symbol = asp ? getSymbolFromAspect(asp) : "";

              return (
                <div key={`cell-${i}-${j}`} className="
                    aspect-square flex items-center justify-center border border-[#947936cc]/20 text-[#947936d5] font-bold text-xs sm:text-sm md:text-base transition-colors duration-200 hover:bg-stone-400/20">
                  {symbol}
                </div>
              );
            });

          return [
            ...emptyCells,
            headerCell,
            ...dataCells,
          ];
        })}
      </div>

    </div>

  </div>
);
}

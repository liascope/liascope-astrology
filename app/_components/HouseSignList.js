import { useAstroForm } from "../_lib/context/AstroContext";
import { usePathname } from "next/navigation";

export default function HouseSignList({ data }) {
  const { unknownTime } = useAstroForm();
  const pathname = usePathname();
  const path = pathname.replace('/charts/', '');
  const isNatalType = ['natal', 'progression', 'draconic'].includes(path);

  const showHouses = !((isNatalType && unknownTime?.birth) || (path === 'external' && unknownTime?.transit));

  if (!showHouses) {
    return (
      <ul className="flex flex-col items-center py-7">
  <h3 className="mb-4 text-center font-medium tracking-wide text-[#607f6a]">
            Planets
          </h3>
        {data?.planetList?.filter((p) => !["Mc", "As", "SNode"].includes(p.planet))?.map((p, i) => (
            <li key={i} className="text-justify space-x-2 flex flex-row justify-between w-[20%]">
              <span className="w-[20%] ">{p.planet}</span>
              <span className="grayscale">{p.symbol}</span>
            </li>
          ))}
      </ul>
    );
  }

return (
  <div className="w-full flex justify-center text-xs sm:text-sm md:text-base py-7 my-5">
    <div className="flex gap-3 md:gap-8">

      {/* Houses */}
      {data.cuspList?.length > 0 && (
        <div className="pr-3 sm:pr-8 border-r border-[#607f6a]/20">
          <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide">
            Houses
          </h3>

          <ul className="space-y-1">
            {data.cuspList.map((cusp, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 md:gap-5 text-[#40584a]">

                {/* House & Position */}
                <span className="flex items-center gap-1 md:gap-3 justify-start font-medium ">
                  {cusp.planet} 
                  <span className="text-[10px] sm:text-xs text-neutral-500"> {cusp.position}</span>
                </span>

                {/* Sign */}
                <span>{cusp.sign}</span>
              </li>
            ))}
          </ul>
        </div>
      )}



      {/* Planets */}
      <div>
        <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide">Planets</h3>

        <ul className="space-y-1">
          {data.planetList?.filter((p) => !["Mc", "As", "SNode"].includes(p.planet))?.map((p, i) => (
            <li key={i}
              className="flex items-center justify-between gap-3 md:gap-5">

              {/* Planet & Position */}
              <span className="flex items-center justify-start font-medium gap-1 md:gap-3 text-[#40584a]">
                {p.planet}    <span
                className="text-[10px] sm:text-xs text-neutral-500">
                {p.position}
              </span>
              </span>

              {/* House & Symbol */}
              <span className="flex items-center gap-1 md:gap-3 text-neutral-500 text-right">
                {p.house}H 
                <span className="grayscale">{p.symbol}</span>
              </span>

            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}





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
      <ul className="text-sm sm:text-xl flex flex-col items-center justify-center">
       <h3 className="text-center mb-5 font-medium tracking-wide text-[#607f6a]">
            Planets
          </h3>
        {data?.planetList?.filter((p) => !["Mc", "As", "SNode"].includes(p.planet))?.map((p, i) => (
            <li key={i} className="w-[80%] lg:w-[65%] grid grid-rows-1 grid-cols-3 gap-20">
              <span> {p.planet} </span>
               <span className="text-sm text-neutral-500">{p.position}</span>
              <span className="grayscale text-center">{p.symbol}</span>
            </li>
          ))}
      </ul>
    );
  }

return (
  <div className="text-xs min-[365px]:text-base md:text-lg flex justify-center">

      {/* Houses */}
      {data.cuspList?.length > 0 && (
          <ul className="border-r border-[#607f6a]/20 space-y-1 pr-2 min-[375px]:pr-3 md:pr-12">
               <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide text-sm sm:text-xl">
            Houses
          </h3>
            {data.cuspList.map((cusp, i) => (
              <li
                key={i}
                className="flex items-center gap-4 justify-between sm:gap-10 text-[#40584a]">

                {/* House & Position */}
                <span className="flex w-fit items-center gap-1 sm:gap-2 font-medium flex-row whitespace-nowrap">
                  <span>
                  {cusp.planet} </span>
                  <span className="text-[10px] sm:text-xs text-neutral-500"> {cusp.position}</span>
                </span>

                {/* Sign */}
                <span>{cusp.sign}</span>
              </li>
            ))}
          </ul>
      )}

      {/* Planets */}
        <ul className="pl-2 min-[375px]:pl-4 md:pl-13">
            <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide text-sm sm:text-xl ">Planets</h3>
          {data.planetList?.filter((p) => !["Mc", "As", "SNode"].includes(p.planet))?.map((p, i) => (
            <li key={i}
              className="flex flex-row items-center justify-between gap-4 sm:gap-10">
              {/* Planet & Position */}
              <span className="flex w-fit items-center gap-1 sm:gap-2 font-medium flex-row whitespace-nowrap">
               <span> {p.planet} </span>   <span
                className="text-[10px] sm:text-xs text-neutral-500">
                {p.position}
              </span>
              </span>

              {/* House & Symbol */}
              <span className="flex items-center gap-1 text-neutral-500 text-right">
                {p.house}H 
                <span className="grayscale">{p.symbol}</span>
              </span>

            </li>
          ))}
        </ul>
  </div>
);
}





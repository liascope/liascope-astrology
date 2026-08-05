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
  <div className="flex justify-center gap-5 sm:gap-12 text-xs sm:text-lg">

      {/* Houses */}
      {data.cuspList?.length > 0 && (
        <div className="pr-5 sm:pr-12 border-r border-[#607f6a]/20">
          <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide text-sm sm:text-xl">
            Houses
          </h3>

          <ul className="space-y-1">
            {data.cuspList.map((cusp, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-5 sm:gap-10 text-[#40584a]">

                {/* House & Position */}
                <span className="flex items-right md:items-center md:gap-3 justify-start font-medium flex-col md:flex-row whitespace-nowrap">
                  <span>
                  {cusp.planet} </span>
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
        <h3 className="mb-3 text-center text-[#607f6a] font-medium tracking-wide text-sm sm:text-xl ">Planets</h3>

        <ul className="gap-5 sm:gap-12">
          {data.planetList?.filter((p) => !["Mc", "As", "SNode"].includes(p.planet))?.map((p, i) => (
            <li key={i}
              className="flex flex-row items-center justify-between gap-5 sm:gap-10">

              {/* Planet & Position */}
              <span className="flex items-right md:items-center justify-start font-medium md:gap-3 text-[#40584a] flex-col md:flex-row">
               <span> {p.planet} </span>   <span
                className="text-[10px] sm:text-xs text-neutral-500">
                {p.position}
              </span>
              </span>

              {/* House & Symbol */}
              <span className="flex items-center gap-3 text-neutral-500 text-right">
                {p.house}H 
                <span className="grayscale">{p.symbol}</span>
              </span>

            </li>
          ))}
        </ul>
      </div>
  </div>
);
}





import { useEffect, useState } from "react";

export default function AspectFilter({chartID}) {
  const [selectedAspect, setSelectedAspect] = useState("all");

  useEffect(() => {
    const container = document.getElementById(chartID);
    if (!container) return;

    const allAspects = ["opposition", "square", "trine", "sextile", "quincunx", "semiSextile"];

    allAspects.forEach((aspect) => {
      const lines = container.querySelectorAll(`svg line[data-name='${aspect}']`);
      lines.forEach((line) => {
        if (selectedAspect === "all" || selectedAspect === aspect) {
          line.style.display = "inline";
        } else {
          line.style.display = "none";
        }
      });
    });
  }, [selectedAspect, chartID]);

  return (
   <div className="flex flex-col gap-2 text-xs rounded-2xl
    bg-white/35 backdrop-blur-md md:scale-100 scale-70 border border-white/40 shadow-md p-3 md:ml-0 -ml-5">
  <label htmlFor="aspectFilter"className="tracking-wide text-[#607f6a] font-medium">Filter Aspects</label>

  <select id="aspectFilter" value={selectedAspect} onChange={(e) => setSelectedAspect(e.target.value)}
    className="rounded-xl border border-[#607f6a]/20 bg-white/70 text-center text-[#40584a] outline-none  px-1 transition-all 
     duration-200 focus:border-[#607f6a] focus:ring-2  focus:ring-[#607f6a]/15">
    <option value="all">All</option>
    <option value="opposition">Opposition</option>
    <option value="square">Square</option>
    <option value="trine">Trine</option>
    <option value="sextile">Sextile</option>
    <option value="quincunx">Quincunx</option>
    <option value="semiSextile">Semi-Sextile</option>
  </select>
</div>
  );
};


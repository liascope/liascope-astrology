import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getChartType } from "../helper";

export default function useRetroPlanetsAndTimeUnknown(id, retro, unknownTime) {
  const pathname = usePathname();
 const chart = getChartType(pathname);

 useEffect(() => {
 const showRetro = chart === "natal" ? retro?.natal : chart === "transit" ? retro?.transit : chart === "progression" ? retro?.progression : null;

 if (!showRetro) return;

 const container = document.getElementById(id); if (!container) return;

 const apply = (retro) => { const svg = container.querySelector("svg"); if (!svg) return;

retro.forEach((retroPlanet) => {const gEl = svg.querySelector(`g#${id}-astrology-radix-planets-${retroPlanet}`);
  if (!gEl) return;

  // prevent dublicates
  if (svg.querySelector(`text[data-retro="${retroPlanet}"]`)) return;

  const textEl = document.createElementNS("http://www.w3.org/2000/svg","text");
  textEl.textContent = "r";
  textEl.dataset.retro = retroPlanet;

  const bbox = gEl.getBBox();
  textEl.setAttribute("x", bbox.x + bbox.width + 3);
  textEl.setAttribute("y", bbox.y + bbox.height / 2);
  textEl.setAttribute("font-size", "14");
  textEl.setAttribute("font-weight", "bold");

  svg.appendChild(textEl);});};

 apply(showRetro);

 // observer for changes
 const observer = new MutationObserver(() => apply(showRetro));
 observer.observe(container, { childList: true, subtree: true });

 return () => {observer.disconnect();
// cleanup
const svg = container.querySelector("svg");
svg?.querySelectorAll("text[data-retro]").forEach((el) => el.remove());
 };  }, [id, retro, chart]);


  useEffect(() => {
 const shouldHide = chart === "natal" || chart === "progression" ? unknownTime?.birth : chart === "transit" ? unknownTime?.transit : null;

 const container = document.getElementById(id); if (!container) return;

 const hideSelectors = [`g#${id}-astrology-radix-axis`,`g#${id}-astrology-radix-cusps`,];

 const apply = (hide) => { const svg = container.querySelector("svg"); if (!svg) return;
     hideSelectors.forEach((sel) => svg.querySelector(sel)?.classList.toggle("hidden", hide));};

 const observer = new MutationObserver(() => apply(shouldHide));
    observer.observe(container, { childList: true, subtree: true });

    apply(shouldHide);

    return () => observer.disconnect();}, [id, unknownTime, chart]);

}

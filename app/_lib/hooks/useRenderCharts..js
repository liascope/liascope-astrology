import { useMemo, useEffect} from "react";
import { calculateAspects} from "../data-service";
import { settings, zodiac } from "../config";
import { useAstroForm } from "@/app/_lib/context/AstroContext";

// Custom Hook for SVG Chart & Aspect Table
export function useRenderCharts(chartID) {
  const context = useAstroForm();

   const data = context[`${chartID}Data`] ?? null;
  const dataDetails = context[`${chartID}Details`] ?? null;

  // Chart Rendering
 useEffect(() => {if (!data) return;

  let chartInstance;
//dynamic import:
  import('@astrodraw/astrochart').then((astrochart) => {const el = document.getElementById(chartID);
  if (el) el.innerHTML = "";
    const chart = new astrochart.Chart(chartID, 900, 900, settings);zodiac
    chartID === "perfection" ? chart.radix(data) : chart.radix(data).aspects(calculateAspects(dataDetails?.planets));
    chartInstance = chart;
  });

  return () => {const el = document.getElementById(chartID); if (el) el.innerHTML = ""; chartInstance = null; };
}, [dataDetails,data, chartID]);

  // Aspects Table
  const aspect = useMemo(() => { if (!dataDetails) return []; return calculateAspects(dataDetails?.planets)?.map(({ point, aspect, toPoint, precision }) => `${point.name} ${data?.retroData?.includes(point.name) ? "retrograde" : ""} ${point.degree} ${aspect.name} ${toPoint.name} ${data?.retroData?.includes(toPoint.name) ? "retrograde" : ""} ${point.retrograde ? 'retrograde' : ''} ${toPoint.degree} - ${precision}`
);}, [dataDetails, data]);

  return { aspect, planetList:dataDetails?.planets, cuspList: dataDetails?.cusps};
}

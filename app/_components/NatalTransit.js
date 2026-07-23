 'use client'
import * as astrochart from '@astrodraw/astrochart';
import { motion } from 'framer-motion';
import { useAstroForm } from '../_lib/context/AstroContext';
import { useEffect } from 'react';
import AspectTableTransitNatal from './AspectTableTransitNatal';
import { settings, symbols, aspectSymbols} from '@/app/_lib/config';
import NatalTransitHouseSign from './NatalTransitHouseSign';
import { calculateAspectsBetweenCharts, generateComparisonTable } from '@/app/_lib/data-service';
import AspectFilter from './AspectFilter';
import CopyContext from './CopyContext';
import AiChat from './AiChat';
import useRetroPlanetsAndTimeUnknown from '../_lib/hooks/useRetroPlanetsAndUnknownTime';

export default function NatalTransitWrapper({ chartID }) {
 
  const { natalData, transitData, unknownTime, retro, selected, natalDetails, transitDetails } = useAstroForm();
    
  const type = selected === 'birth' ? 'Transit' : 'Partner'

  // Comparison Aspects
  const aspects = calculateAspectsBetweenCharts(natalData, transitData);
  const planets = symbols.map(([, name]) => name);

  const aspectMatrix = planets.map((natalPlanet) => { return {planet: natalPlanet,
      aspects: planets.map((transitPlanet) => {const match = aspects.find(
          (a) => a.point.name === natalPlanet && a.toPoint.name === transitPlanet);
        return match ? aspectSymbols[match.aspect.name] : "";}),};});

  const aspectText = aspectMatrix.flatMap(a => a.aspects.map((symbol, index) => ({ symbol, index })).filter(x => x.symbol).map(x => {
      const name = Object.entries(aspectSymbols).find(([, v]) => v === x.symbol)?.[0] || "";
      return `Natal ${a.planet} ${name} ${type} ${symbols[x.index].at(-1)}`;}));

  // Comparison Planets, Signs and Houses
const comparison = generateComparisonTable(natalDetails, transitDetails, [unknownTime?.birth, unknownTime?.transit])?.comparison;
const comparisonPlanetHouses = generateComparisonTable(natalDetails, transitDetails, [unknownTime?.birth, unknownTime?.transit], retro)?.comparisonPlanetHouses;

const copyChart = [`Natal & ${type}-Comparison Chart`, "", (comparisonPlanetHouses(type)), '', `Natal & ${type} Comparison Aspects:`, '', ...aspectText].join("\n");

useRetroPlanetsAndTimeUnknown(chartID, retro, unknownTime);
  // render combined Natal + Transit chart
  useEffect(() => {
    if (!natalData || !transitData) return;

    const chart = new astrochart.Chart(chartID, 750, 750, settings);
   
    chart.radix(natalData).transit(transitData).aspects(calculateAspectsBetweenCharts(natalData, transitData));

    const container = document.getElementById(chartID); if (!container) return;

    const svg = container.querySelector("svg"); 
    if (!svg) return;
   const transitColor = svg.querySelectorAll(`g#natalTransit-astrology-transit-planets path`);
   transitColor.forEach(el => { el.setAttribute("stroke", "#345374");});

    // hide transit cusps if transit time unknown
    if (unknownTime.transit) {const el = svg.querySelector(`g#${chartID}-astrology-transit-cusps`);
      if (el) el.classList.add("hidden");}

    // add "r" for retro planets
    retro?.transit?.forEach((retroPlanet) => {
      const gEl = svg.querySelector(`g#${chartID}-astrology-transit-planets-${retroPlanet}`); 
      
      if (!gEl) return;
      const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.textContent = "r";
      const bbox = gEl.getBBox();
      textEl.setAttribute("x", bbox.x + bbox.width + 3);
      textEl.setAttribute("y", bbox.y + bbox.height / 2);
      svg.appendChild(textEl); });

    return () => {container.innerHTML = "";};
  }, [chartID, natalData, transitData, unknownTime, retro]);

  return (
    <motion.div
      className="w-screen min-[1625px]:w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col-reverse min-[1625px]:flex-row justify-around w-screen min-[1625px]:w-full h-fit relative">
        {/* Left panel: tables */}
      
        <div className="flex flex-col min-[1625px]:items-baseline items-center min-[1625px]:w-[40rem] h-fit gap-5 w-screen p-2">
           <CopyContext copy={copyChart}/>
          <NatalTransitHouseSign comparison={comparison} selected={selected} />
          <AspectTableTransitNatal planets={planets} aspects={aspects} aspectMatrix={aspectMatrix} />
        </div>

        {/* Right panel: chart + filter */}
        <div className="relative">
          <div className="absolute top-0 left-2 z-25">
            <AspectFilter chartID={chartID} />
          </div>
          <div className='flex flex-col'>
          <div className="min-[1625px]:block flex items-center justify-center h-svw min-[1625px]:h-fit" id={chartID} />
            <AiChat chartContext={copyChart} chart={chartID}></AiChat>
          </div>
        </div>
      </div>
     
    </motion.div>
  );
}



'use client';

import { motion } from 'framer-motion';
import { useState} from 'react';
import { usePathname } from 'next/navigation';

import AspectTable from './AspectTable';
import HouseSignList from './HouseSignList';
import AspectFilter from './AspectFilter';
import CopyContext from './CopyContext';
import AiChat from './AiChat';

import { capitalize } from '../_lib/config';
import { useRenderCharts } from '../_lib/hooks/useRenderCharts.';
import { useAstroForm } from '../_lib/context/AstroContext';
import useRetroPlanetsAndTimeUnknown from '../_lib/hooks/useRetroPlanetsAndUnknownTime';
import InfoTable from './InfoTable';

export default function Charts({ chartID }) {

  const [mode, setMode] = useState('transit')
  const { unknownTime, retro, selected} = useAstroForm();

 // Chart & Aspect Table & Aspect List, House and Planet Positions Lists
  const { aspect, planetList, cuspList } = useRenderCharts(chartID);

  // CopyContext Feature
const pathname = usePathname()
const page = pathname.split("/").at(-1);

let chartName;

if (page === "external") {
  chartName = selected === "birth" ? "Transit" : "Partner";
} else {
  chartName = capitalize(page);
}
const timeUnknown = (["natal", "draconic", "progression"].includes(chartID) && unknownTime?.birth) || (chartID === "transit" && unknownTime?.transit);

const copyChart = [`${chartName} Chart:`, "",
  ...(timeUnknown ? ["Unknown time, house placements unavailable.", ""] : ["Signs:", ...cuspList.map((c,i) => `${c.planet.replace("House ", "H")} ${c.position} ${c.sign}`), ""]),
 "Planets:", ...planetList.map(p => {const house = p.planet === "As" ? 1 : p.planet === "Mc" ? 10 : p.house;
  return `${p.planet} ${retro[chartID]?.includes(p.planet) ? "retrograde" : ""} ${p.position} ${p.sign} ${!timeUnknown ? ` H${house}` : ""}`;}),"",
  "Aspects:", ...aspect,"",].join("\n");

  useRetroPlanetsAndTimeUnknown(chartID, retro, unknownTime)

  return (
    <motion.div
      className="flex flex-row max-[1150px]:flex-col-reverse w-full justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -7 }}
      transition={{ duration: 0.4 }}
    >

      <div className="min-[1150px]:w-[45%] min-w-0 h-fit flex flex-col">
        <div className="min-[1150px]:w-full flex flex-col gap-7">
          <CopyContext copy={copyChart}/>
       
        <HouseSignList data={{ planetList, cuspList }} />
        <AspectTable aspect={aspect} />
       </div>  
      </div>

    <div className='relative min-[1150px]:w-[55%] min-w-0'>

    <div className='flex flex-row items-start justify-between absolute md:top-2 -top-10 z-25 px-1'>
      <AspectFilter chartID={chartID}/>
      <InfoTable></InfoTable>
      </div>

      <div className='flex items-center justify-center h-dvw md:h-fit' id={chartID}/>

      <AiChat chartContext={copyChart} chart={mode === 'horary' ? 'Horary' : chartName} mode={mode} setMode={setMode}/>
       </div>

    </motion.div>
  );
}

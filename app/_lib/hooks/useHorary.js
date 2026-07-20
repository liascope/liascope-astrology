'use client'

import { useState, useEffect, useMemo } from "react";
import useCurrentDateTime from "./useCurrentDateTime";
import { calcChart, fetchTimezone, calculateAspects } from "../data-service";


export default function useHorary (mode) {
    const [timezone, setTimezone] = useState('')
   const {currentPlace, currentDate} = useCurrentDateTime();

useEffect(() => {
 
if (mode !== 'horary' || !currentPlace?.place) return;


    const loadTimezone = async () => {
      try {
        const tz = await fetchTimezone(currentPlace?.lat, currentPlace?.lon);
        setTimezone(tz);
      } catch (err) {
        console.error("Timezone could not be calculated.", err);
      }
    };

    loadTimezone();
  }, [currentPlace, mode]);


const {retroData, planetDetails, cuspDetails } = calcChart(timezone,currentPlace?.lat, currentPlace?.lon, currentDate,3,false)
 
  const aspect = useMemo(() => { if (!planetDetails) return []; return calculateAspects(planetDetails)?.map(({ point, aspect, toPoint, precision }) => `${point.name} ${retroData?.includes(point.name) ? "retrograde" : ""} ${point.degree} ${aspect.name} ${toPoint.name} ${retroData?.includes(toPoint.name) ? "retrograde" : ""} ${point.retrograde ? 'retrograde' : ''} ${toPoint.degree} - ${precision}`
);}, [planetDetails, retroData]);


const copyChart = ['Horary Chart:', "",
  "Signs:", ...cuspDetails.map((c,i) => `${c.planet.replace("House ", "H")} ${c.position} ${c.sign}`), "",
 "Planets:", ...planetDetails.map(p => {p.planet === "As" ? 1 : p.planet === "Mc" ? 10 : p.house;
  return `${p.planet} ${retroData?.includes(p.planet) ? "retrograde" : ""} ${p.position} ${p.sign}`;}),"",
  "Aspects:", ...aspect,"",].join("\n");


return {horaryContent: copyChart}

}
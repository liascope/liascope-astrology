'use client'

import { useState, useEffect } from "react";
import useCurrentDateTime from "./useCurrentDateTime";
import {zodiac} from "../config";
import { calcChart, generateAllListData, generateTableAspects, fetchTimezone } from "../data-service";


export default function useHorary () {
    const [timezone, setTimezone] = useState('')
   const {currentPlace, currentDate} = useCurrentDateTime();

useEffect(() => {
if (!currentPlace?.place) return;
    const loadTimezone = async () => {
      try {
        const tz = await fetchTimezone(currentPlace?.lat, currentPlace?.lon);
        setTimezone(tz);
      } catch (err) {
        console.error("Timezone could not be calculated.", err);
      }
    };

    loadTimezone();
  }, [currentPlace]);

const horary = calcChart(timezone,currentPlace?.lat, currentPlace?.lon, currentDate,3,false)

const signInHouse = generateAllListData(horary.positionData);
const aspect = generateTableAspects(horary.positionData)

const copyChart = [
  'Horary Chart',
  "",
  "Signs:",
  ...signInHouse.cuspList.map((c, i) => `H${i + 1} ${c.sign}`),
  "",
  "Planets:",
  ...signInHouse.planetList.map((p) => {
    const house =
      p.planet === "As" ? 1 : p.planet === "Mc" ? 10 : p.house;

   return `${p.planet} ${
  Object.keys(zodiac).find((s) => zodiac[s] === p.symbol)
} H${house}`;;

  }),
  "",
  "Aspects:",
  ...aspect,
].join("\n");

return {horaryContent: copyChart}

}
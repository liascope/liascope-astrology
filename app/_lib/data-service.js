import moment from "moment-timezone";
import { calPlanetPosition2, calHouseCusp2, checkRetrograde} from "./calcDegrees";
import { TIMEZONE_API_BASE_URL, ASPECTS,} from "./config";
import { fetchData, createChartData, findPlanetHouses, calcCuspsDraconic} from "./helper";

// CityAutoComplete in Form for lat, lon, city, country 
// Previously fetched directly against Nominatim, which works in production
// but leads to CORS and client-side rate-limit issues during local development.
// Therefore suggestions are now fetched via a Next.js API route that proxies the request server-side.
// export const fetchSuggestions = async (query) => {
//   if (!query) return [];
//   try {
//     const url = `${NOMINATIM_URL}${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;
//     const data = await fetchData(url, "City, Country, Coords data not found");
//     return data;
//   } catch {
//     throw new Error("Failed to fetch suggestions");
//   }
// }; 
export const fetchSuggestions = async (query) => {
  if (!query) return [];
  try {
    const data = await fetchData(`/api/nominatim?q=${query}`, "City, Country, Coords data not found");
    return data;
  } catch {
    return error
    //  throw new Error("Failed to fetch suggestions");
  }
};

// for chart-data calc
export const fetchTimezone = async (lat, lon) => {
  const url = `${TIMEZONE_API_BASE_URL}key=${process.env.NEXT_PUBLIC_TIME_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;
  const data =  await fetchData(url, "Timezone data not found");
  return data.zoneName
};

// Libary: degree calc (JST) for SVG-Chart Drawing on custom hook 'useRenderChart'
//  Getting planet and cusps degrees from API-Call return & calc other chart datas, data for table and lists
export const calcChart = function (timezoneData, lat, lon, dateString, houseSystem, uT) {
  try {
  const asiaTimeZone = (zT) => zT.clone().tz("Asia/Tokyo");
    let planetPosition = new Array();
    let cuspLongitudes = new Array();
    const zoneTime = moment.tz(dateString, "DD.MM.YYYY HH:mm", timezoneData);

    // Japanese standart time (JST)
    const jstTime = asiaTimeZone(zoneTime);
    const localTime = zoneTime.format("YYYY-MM-DD HH:mm z").trim().split(" ").pop(); // next to time
    const utcTime = zoneTime.utc().format("DD.MM.YYYY HH:mm [UTC]"); // small under time
    const year = jstTime.year();
    const month = jstTime.month() + 1;
    const day = jstTime.date();
    const hour = jstTime.hour();
    const minute = jstTime.minute();
    // data for SVG Chart rendering
    planetPosition = calPlanetPosition2(+year, +month, +day, +hour, +minute, +lon, +lat);
    cuspLongitudes = calHouseCusp2(
      +year,
      +month,
      +day,
      +hour,
      +minute,
      +lon,
      +lat,
      houseSystem // Placidus 1, for Koch 2..
    ).filter((value) => value !== null && value !== undefined && value !== "")

    // date for retrograde
const [datePart, timePart] = dateString.split(" ");
const [d, m, y] = datePart.split(".").map(Number);
const [h, min] = timePart.split(".").map(Number);

 const retroPlanets = checkRetrograde(+y, +m, +d, +h, +min)
const retroData = [
  'Mercury', 'Venus', 'Mars', 'Jupiter',
  'Saturn', 'Uranus', 'Neptune', 'Pluto'
].filter((_, i) => retroPlanets[i + 3] === -1);

// calc SNode from Nnode 
const normalize360 = (deg) => (deg % 360 + 360) % 360;

// ASC-based Part of Fortune calculation; switches between day/night formula using Sun vs ASC+180 (Descendant axis) to determine sect
const fortune = planetPosition[1] < normalize360(planetPosition[13]+180) ? (planetPosition[13] + planetPosition[1]) - planetPosition[2] : (planetPosition[13] + planetPosition[2]) - planetPosition[1]

// console.log(retroData)
 const planets = {
  Sun: [Math.trunc(planetPosition[1])],
  Moon: [Math.trunc(planetPosition[2])],
  Mercury: [Math.trunc(planetPosition[3])],
  Venus: [Math.trunc(planetPosition[4])],
  Mars: [Math.trunc(planetPosition[5])],
  Jupiter: [Math.trunc(planetPosition[6])],
  Saturn: [Math.trunc(planetPosition[7])],
  Uranus: [Math.trunc(planetPosition[8])],
  Neptune: [Math.trunc(planetPosition[9])],
  Pluto: [Math.trunc(planetPosition[10])],
  NNode: [Math.trunc(planetPosition[11])],
  SNode: [normalize360(Math.trunc(planetPosition[11]+180))],
  Lilith: [Math.trunc(planetPosition[12])],
  Chiron: [Math.trunc(planetPosition[19])],
  Fortune: [normalize360(Math.trunc(fortune))]
};

if (!uT) {
  planets.As = [Math.trunc(planetPosition[13])];
  planets.Mc = [Math.trunc(planetPosition[14])];
}

const {
  positionData,
  planetDetails,
  cuspDetails,
} = createChartData({
  planets,
  cusps: cuspLongitudes,
});

const draconic = calcCuspsDraconic({planets, cusps:cuspLongitudes}) // same as positionData for draconic

const {   positionData: positionDataDraconic, planetDetails: planetDetailsDraconic, cuspDetails: cuspDetailsDraconic,} = createChartData(draconic);

    return { positionData, localTime, utcTime, retroData, planetDetails, cuspDetails,  positionDataDraconic, planetDetailsDraconic, cuspDetailsDraconic};
  } catch (error) {
    console.log(error)
    console.error(error.message);
    throw error;
  }
};


export function calcProgressionDate(birthDate) {
      const birthDateObj = new Date(birthDate);
      const now = new Date();
      // calc days based on birthday
      const age = now.getFullYear() - birthDateObj.getFullYear();

      // Progression: Date and Age
      const progressionDate = new Date(birthDateObj);
      progressionDate.setDate(progressionDate.getDate() + age); 
      // const formattedProgressionDate = progressionDate.toLocaleDateString("de-DE");
      const formattedProgressionDate = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(progressionDate);
      return formattedProgressionDate
}


export const perfectionChart = function (age, natalData) {
  const perfectionDegrees = [165, 135, 105, 75, 45, 15, 345, 315, 285, 255, 225, 195];
  const perfectionData = {
    planets: {},
    cusps: natalData.cusps.map((_, i) => Math.floor(natalData.cusps[0] / 30) * 30 + i * 30),
  };
  const index = +age % 12;
  const perfectionHouse = index + 1;
  const perfectionIndex = perfectionDegrees[index] 
  return {perfectionIndex, perfectionHouse, perfectionData};
};

export const calculateAspects = (planetDetails = []) => {
  const excludedPairs = new Set([
    "MC-IC",
    "MC-As",
    "MC-Ds",
    "IC-As",
    "IC-Ds",
    "As-Ds",
    "NNode-SNode",
  ]);

  return planetDetails.flatMap((planet1, i) =>
    planetDetails
      .slice(i + 1)
      .filter(
        (planet2) =>
          !excludedPairs.has(`${planet1.planet}-${planet2.planet}`) &&
          !excludedPairs.has(`${planet2.planet}-${planet1.planet}`)
      )
      .flatMap((planet2) => {
        let angle = Math.abs(planet1.longitude - planet2.longitude);
        angle = angle > 180 ? 360 - angle : angle;

        return ASPECTS.filter(
          ({ angle: aspAngle, orb }) =>
            Math.abs(angle - aspAngle) <= orb
        ).map(({ name, angle: aspAngle }) => ({
          aspect: {
            name,
            degree: angle.toFixed(2),
          },
          point: {
            name: planet1.planet,
            position: planet1.longitude,
            sign: planet1.sign,
            symbol: planet1.symbol,
            house: planet1.house,
            degree: planet1.position,
            retrograde: planet1.retrograde,
          },
          toPoint: {
            name: planet2.planet,
            position: planet2.longitude,
            sign: planet2.sign,
            symbol: planet2.symbol,
            house: planet2.house,
            degree: planet2.position,
            retrograde: planet2.retrograde,
          },
          precision: Number(
            Math.abs(angle - aspAngle).toFixed(2)
          ),
        }));
      })
  );
};


export const generateComparisonTable = function (natalDetail, transitDetails, unknownTime, retro) {
  const {planets: transitp, cusps: transitc} = transitDetails;
  const {planets: natalp, cusps: natalc} = natalDetail;
 
  const getHouse = (cusps, planetDegrees) => findPlanetHouses(cusps, { temp: [planetDegrees] }).temp || "";

  const comparison = natalp?.map((planet) => ({
      Planet: planet.planet,
      Natal: planet.sign,
      NatalPosition: planet.position,
      NH: unknownTime[0] ? "" : `${planet.planet === "Mc" ? 10 : planet.planet === "As" ? 1 : planet.house}`,
      TH: unknownTime[1] ? "" : getHouse(transitc?.map(c=>c?.longitude), planet.longitude),
      Transit: transitp?.find(p => p.planet === planet.planet)?.sign,
      TransitPosition: transitp?.find(p => p.planet === planet.planet)?.position,
      TH2: unknownTime[1] ? "" : `${planet.planet === "Mc" ? 10 : planet.planet === "As" ? 1 : transitp?.find(p => p.planet === planet.planet)?.house}`,
      NH2: unknownTime[0] ? "" : getHouse(natalc?.map(c=>c?.longitude), transitp?.find(p => p.planet === planet.planet)?.longitude),
    }));

     const timeBasedComparison = comparison.filter(p =>!(unknownTime[0] || unknownTime[1]) ||(p.Planet !== "As" && p.Planet !== "Mc"));


   const transitOrPartnerInNatal = (transitOrPartner) => timeBasedComparison?.map((d)=>(`${transitOrPartner} ${d.Planet} ${retro?.['transit'].includes(d.Planet) ? " Retrograde" : ""} in ${d.Transit + ' ' + d.TransitPosition} in Natal ${d.NH2}H`))?.join("\n")

   const natalInPartner = (transitOrPartner) => timeBasedComparison.map((d)=>(`Natal ${d.Planet} ${retro?.['natal'].includes(d.Planet) ? "Retrograde" : ""} in ${d.Natal + ' ' + d.NatalPosition} in ${transitOrPartner} ${d.TH}H`))?.join("\n")
   
    const comparisonPlanetHouses = (transitOrPartner) => (unknownTime[0] && unknownTime[1]) ? `Unknown Natal time and ${transitOrPartner} time. Only sign and planet aspects can be shown.` : unknownTime[0] ? `Unknown Natal time. Only Natal Signs and Planets in ${transitOrPartner}-Chart can be shown.` + natalInPartner(transitOrPartner) : unknownTime[1] ? `Unknown ${transitOrPartner} time. Only ${transitOrPartner} Signs and Planets in Natal Chart can be shown.\n\n${transitOrPartner} in Natal Chart:\n\n${transitOrPartnerInNatal(transitOrPartner)}` : `${transitOrPartner} Signs and Planets in Natal Chart:\n\n${transitOrPartnerInNatal(transitOrPartner)}\n\nNatal Signs and Planets in ${transitOrPartner} Chart:\n\n${natalInPartner(transitOrPartner)}`


    return {comparison, comparisonPlanetHouses}
};

export const calculateAspectsBetweenCharts = (natalData, transitData) => {
  const natalPlanets = Object.entries(natalData.planets);
  const transitPlanets = Object.entries(transitData.planets);

  return natalPlanets.flatMap(([planet1, pos1]) =>
    transitPlanets.flatMap(([planet2, pos2]) => {
      let angle = Math.abs(pos1[0] - pos2[0]);
      angle = angle > 180 ? 360 - angle : angle;

      return ASPECTS.filter(({ angle: aspAngle, orb }) => Math.abs(angle - aspAngle) <= orb).map(({ name, angle: aspAngle }) => ({
        aspect: { name, degree: angle.toFixed(2) },
        point: { name: planet1, position: pos1[0] },
        toPoint: { name: planet2, position: pos2[0] },
        precision: Math.abs(angle - aspAngle) <= 1 ? 0.5 : 0.0,
      }));
    })
  );
};

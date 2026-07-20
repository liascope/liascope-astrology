import { aspectSymbols, zodiac, chartMap, MAX_PER_DAY } from "./config";


export const getChartType = (pathname) => Object.entries(chartMap).find(([type, paths]) => 
  paths.includes(pathname))?.[0] || null;

export const validateDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const now = new Date().getFullYear();

  if (isNaN(date.getTime())) return "Invalid date";
  if (year < 1700 || year > now) return "Invalid year";

  return true;
};

export const getSymbolFromAspect = (aspect) => {
  return (Object.entries(aspectSymbols).find(([key]) => aspect.includes(key))?.[1] || "");};

export const fetchData = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    //  console.log(response)
    if (!response.ok) {
      throw new Error(`Something went wrong, ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.dir("API Fetch Error:", error.message);
    throw error;
  }
};

export const findSign = (degree) => {
  const normalizedDegree = ((+degree % 360) + 360) % 360; // degree should be between 0-359
  const index = Math.floor(normalizedDegree / 30);
  return Object.keys(zodiac)[index];
};

export const findPlanetHouses = (cusps, planets) => {
  const houseAssignments = {};

  for (const [planet, [position]] of Object.entries(planets)) {

    // AC und MC sind Sonderfälle
    if (planet === "As") {
      houseAssignments.As = 1;
      continue;
    }

    if (planet === "Mc") {
      houseAssignments.Mc = 10;
      continue;
    }

    for (let i = 0; i < cusps.length; i++) {
      const start = cusps[i];
      const end = cusps[(i + 1) % cusps.length];

      if (start < end) {
        if (position >= start && position < end) {
          houseAssignments[planet] = i + 1;
          break;
        }
      } else {
        if (position >= start || position < end) {
          houseAssignments[planet] = i + 1;
          break;
        }
      }
    }
  }
  return houseAssignments;
};
export function formatDateTime(date, time) {
  
  return `${date.split('-').reverse().join('.')} ${time.replace(':', '.')}`;
}

export const createPlanet = (
  planet,
  normalizedLongitude,cusps = [],
  
) => {
  const zodiacSigns = Object.keys(zodiac);

  const signIndex = Math.floor(normalizedLongitude / 30);
  const sign = zodiacSigns[signIndex];

  const degreeFloat = normalizedLongitude % 30;
  const degree = Math.trunc(degreeFloat);
  const minutes = Math.round((degreeFloat - degree) * 60);

  let house = null;

  if (planet === "As") {
    house = 1;
  } else if (planet === "Mc") {
    house = 10;
  } else {
    for (let i = 0; i < cusps.length; i++) {
      const start = cusps[i];
      const end = cusps[(i + 1) % cusps.length];

      if (start < end) {
        if (normalizedLongitude >= start && normalizedLongitude < end) {
          house = i + 1;
          break;
        }
      } else {
        if (normalizedLongitude >= start || normalizedLongitude < end) {
          house = i + 1;
          break;
        }
      }
    }
  }

  return {
    planet,
    house,
    longitude: normalizedLongitude,
    sign,
    symbol: zodiac[sign],
    position: `${degree}°${minutes.toString().padStart(2, "0")}'`,
  };
};

export const createChartData = ({ planets, cusps }) => {
  const planetDetails = Object.entries(planets).map(([planet, [longitude]]) =>
    createPlanet(
      planet,
      longitude,
      cusps,
      // retroData[planet] ?? false
    )
  );

  const cuspDetails = cusps.map((longitude, i) =>
    createPlanet(
      i === 0
        ? "H1 (AC)"
        : i === 3
        ? "H4 (IC)"
        : i === 6
        ? "H7 (DC)"
        : i === 9
        ? "H10 (MC)"
        : `H${i + 1}`,
      longitude
    )
  );

  return {
    positionData: {
      planets,
      cusps,
    },
    planetDetails,
    cuspDetails,
  };
};

// cusps & planet lists for draconic & horary
// data = positionData 
export function calcDataDetailsDerived(data) {
  if (!data || !data.planets || !data.cusps) return null;

  const houseAssignments = findPlanetHouses(data.cusps, data.planets);
  const planetList = Object.keys(data.planets).map((planet) => {
    const houseNumber = houseAssignments?.[planet]?.[0];
    const symbol = zodiac[findSign(data.planets[planet])] || findSign(data.planets[planet]);
    return { planet, symbol, house: houseNumber };
  });
  const cuspList = data.cusps.map((c, i) => {
    const label = i === 0 ? "House 1 (AC)" : i === 3 ? "House 4 (IC)" : i === 6 ? "House 7 (DC)" : i === 9 ? "House 10 (MC)" : `House ${i + 1}`;
    return { house: label, sign: findSign(c) };
  });
  
  return {
    planetList,
    cuspList
  };
}
export const calcCuspsDraconic = (data) => {
  const planets = { ...data.planets };
  const cusps = [...data.cusps];
  const nNode = planets.NNode[0];

// Calc difference between NNode and 0 degree
  const nodeToZero = (360 - nNode) % 360;
// Update planet position by adding the difference to degrees

Object.keys(planets).forEach((planet) => { 
if (planet !== "NNode") {
      planets[planet] = planets[planet].map((degree) => (degree + nodeToZero) % 360);
    }
  });
  // Update cusps
  const updatedCusps = cusps.map((cusp) => (cusp + nodeToZero) % 360);
  // set NNode to 0 degree
  planets.NNode = [0];

  return {
    planets,
    cusps: updatedCusps,
  };
};
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export function aspectToSymbol(arrAspect = []) {
  return arrAspect.map((aspect) => {
    const aspectName = aspect.split(" ")[1];
    return aspectSymbols[aspectName] ? aspect.replace(aspectName, aspectSymbols[aspectName]) : aspect;
  });
}

export function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate); // wants ISO format: "YYYY-MM-DD"

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // if birth day is not reached 
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

export function getInitialTransitData() {
  const now = new Date();
  const formatNumber = (num) => String(num).padStart(2, "0");
  
  const year = now.getFullYear();
  const month = formatNumber(now.getMonth() + 1);
  const day = formatNumber(now.getDate());
  const transitDate = `${year}-${month}-${day}`; // <-- ISO format
  const transitTime = `${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}`;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const transitPlace = timeZone.split("/").pop().replace("_", " ");
  // timeZone.includes("/") && timeZone.split("/").pop()
  return {
    transitDate,
    transitTime,
    transitPlace,
  };
}

// AiChat question limit functions:
function getLimitKey(chart) {
  return `lia_limit_${chart}_${new Date().toISOString().split("T")[0]}`;
}

export function getCurrentCount(chart) {
  const key = getLimitKey(chart);
  const value = localStorage.getItem(key);
  return value ? Number(value) : 0;
}

export function incrementCount(chart) {
  const key = getLimitKey(chart);
  const current = getCurrentCount(chart);

  localStorage.setItem(key, String(current + 1));

  return current + 1;
}

export function hasReachedLimit(chart) {
  return getCurrentCount(chart) >= MAX_PER_DAY;
}
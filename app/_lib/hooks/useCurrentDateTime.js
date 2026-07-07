'use client'
import { useMemo } from "react";
import { formatDateTime, getInitialTransitData } from "../helper";
import { useAutofillPlace } from "./useAutofillPlace";

export default function useCurrentDateTime () {
       const initial = getInitialTransitData(); 
       const {data}= useAutofillPlace("placeTransit", initial.transitPlace);
       const currentDate = formatDateTime(initial.transitDate, initial.transitTime)

      const currentPlace = useMemo(() => {
       if (!data?.length) return null;
     
       return {
         city: data[0]?.address?.city || "",
         country: data[0]?.address?.country || "",
         lat: +data[0]?.lat,
         lon: +data[0]?.lon,
       };
     }, [data]);
return {currentPlace, currentDate}
}
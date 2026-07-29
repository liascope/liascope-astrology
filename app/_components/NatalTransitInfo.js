'use client'
import SaveProfileButton from "./SaveProfileButton"
import { useAstroForm } from "../_lib/context/AstroContext"
import { formatDate } from "@/app/_lib/helper"
import Button from "./Button"
import Loader from "./Loader";
import Edit from "./navicons/Edit";
import { houseSystem } from "../_lib/config";

export default function NatalTransitInfo() {
 const {formState, chartData, selected} = useAstroForm()

 if (!formState) {return ( <Loader size='w-[6rem]'></Loader> );}

const infoData = [{type: 'Natal', name:formState?.user || "...", btn: true, 
   date: formatDate(formState?.birthDate) || "...", time:formState?.birthTimeUnknown ? "-- : --" : `${formState?.birthTime || "..."} ${chartData?.natalData?.localTime || ""}`,
   utc:!formState?.birthTimeUnknown && chartData?.natalData?.utcTime || "", 
   place: formState?.birthPlaceData?.city.split(",")[0] + ', ' + formState?.birthPlaceData?.country.split(",")[0] || "...", 
   houseSystem:houseSystem[formState?.natalHouseSystem]},
 {type: selected === "birth" ? "Transit" : "Natal", name:formState?.moment || "...", btn:false,
  date: formatDate(formState?.transitDate) || "...", 
  time: formState?.transitTimeUnknown ? "-- : --" : `${formState?.transitTime || "..."} ${chartData?.transitData?.localTime || ""}`, 
  utc: !formState?.transitTimeUnknown && chartData?.transitData?.utcTime || "", 
  place:formState?.transitPlaceData?.city.split(",")[0] + ', ' + formState?.transitPlaceData?.country.split(",")[0] || "...", 
  houseSystem:  houseSystem[formState?.transitHouseSystem]}]

return (
<div className="w-full h-fit rounded-3xl backdrop-blur-lg shadow-lg p-6 flex flex-col gap-2 md:gap-6">
{/* Actions */}
<div className="flex justify-between items-center gap-3">
<Button type="savedCharts"/>

<div className="h-6w-px bg-[#e89b53]/30"/>

<Button type="openForm"><Edit/></Button>
</div>

{infoData?.map((d,i) => (
<div key={i} className="space-y-4 py-3 border-b border-black/10">
<div className="flex flex-row items-center justify-between">
<h2  className={`font-[Dancing_Script] text-xl md:text-2xl ${d?.type === "Natal" ? "text-[#607f6a]" : "text-[#3f638d]"}`}>
  {d?.type === 'Natal' ? '☀' : '⏾'} {d?.type} Dates for {d?.name}</h2> {d?.btn && <SaveProfileButton/>}</div>

<div className="space-y-3 text-sm">

<div className="infoRow">
<span>{d?.type} Date</span>
<strong> {d?.date}</strong>
</div>

<div className="infoRow">
<span> {d?.type} Time </span>
<strong className="text-right">{d?.time}
<p className="text-xs opacity-60">{d?.utc}</p>
</strong>
</div>

<div className="infoRow">
<span>{d?.type} Place</span>
<strong>{d?.place}</strong>
</div>
</div>
<div className="text-xs tracking-widest text-right text-neutral-500 uppercase">{d?.houseSystem} Chart</div>

</div>))}

</div> )}


























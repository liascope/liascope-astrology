'use client'

import { items } from "@/app/_lib/data";
import Button from "./Button";
import Sun from "./navicons/Sun";
import { useState } from "react";

 export default function Homepage() {

const [openCard, setOpenCard] = useState("Natal Chart");

  const orderedGroups = [
    ["Natal Chart", "Synastry Chart"],
    ["Transit or Horary Chart", "Draconic Chart"],
    ["Progressed Chart", "Perfection Chart"]
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4">

      {/* Hero Text */}
   <section className="flex flex-col items-center text-center max-w-3xl pt-3 md:pt-16 lg:mb-40">
        <p className="-mt-4 max-w-xl text-base md:text-lg leading-relaxed text-[#e89b53] mb-2 md:mb-0">
          A quick & precise way to get an insight of the most important astrological charts of your scope.
        </p>
      </section>

      {/* Desktop Orbit */}
      <div className="hidden lg:flex relative items-center justify-center h-[820px] w-[820px] mb-80">

        {/* Center Button */}
    <Button type="openForm"><div className="btnEffect"><span>Your</span><Sun /><span>Scope</span></div></Button>

     {items.map((item, i) => {
  const angle = (360 / items.length) * i;
  const radius = 360;

  return (
    <div key={i} className="absolute w-64 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-md
        text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
         style={{transform: ` rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`}}>
      <h3 className="text-lg font-medium text-[#40584a] mb-2">{item.title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
      </div>);})}
      </div>

      {/* Mobile Layout */}
     <div className="lg:hidden grid gap-4">
  {orderedGroups.flat().map((title) => {
    const item = items.find(i => i.title === title);
    const open = openCard === item.title;

    return (<div key={item.title} className="rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-sm overflow-hidden">

        <button type="button" onClick={() =>setOpenCard(open ? null : item.title)} className="w-full flex items-center justify-between p-5 text-left">
          <h3 className="text-[#40584a] font-medium">{item.title} </h3>
        <span className={`transition-all duration-300 text-[#947936cc] ${open ? "scale-110" : "scale-75 opacity-60"}`}> {open ? <Sun /> : "⋆.˚ ☾ .⭒˚"} </span>
        </button>

        <div className={`grid transition-all duration-300 ${  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]" }`} >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600"> {item.description}</p>
          </div>
        </div>
        
      </div>);})} 

  <div className="w-full text-center"> <Button type="openForm"> <div className="btnEffect"> <span>Your</span><Sun />
 <span>Scope</span></div></Button></div>
   </div>
    </main>
  );
}
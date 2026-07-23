import { items } from "@/app/_lib/data";
import Button from "./Button";
import Sun from "./navicons/Sun";

 export default function Homepage (){
  
  const orderedGroups = [
  ["Natal Chart", "Synastry Chart"],
  ["Transit or Horary Chart", "Draconic Chart"],
  ["Progressed Chart", "Perfection Chart"]
];
  return  <main className="flex flex-col items-center justify-center">  <h2 className="text-[#e89b53] lg:text-xl text-md text-center md:mt-5"> A quick & precise way to get an insight of the most important astrological charts of your scope.
      </h2> 
      
      <div className="lg:flex hidden items-center justify-center tracking-wider relative mb-28 min-h-[750px] min-w-screen">  

        <Button type="openForm">
        <div className="btnEffect flex flex-row items-center">Your<Sun/>Scope</div> </Button>

        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={i}
              className="absolute text-center md:w-60 lg:w-72 circle-wrapper p-5"
              style={{transform: `rotate(${angle}deg) translate(var(--radius)) rotate(-${angle}deg)`,}}
            >
              <h3 className="text-[#607f6a]">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </div>
          );
        }
        )}</div>

          {/* small screen: */}
       <div className="px-2 flex lg:hidden md:text-base flex-col items-center mt-6 min-h-screen w-full sm:text-sm text-xs gap-6">
 <div className="grid grid-rows-3 gap-4 w-full">
      {orderedGroups.map((group, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-2 gap-4 md:text-center"
        >
          {group.map((title) => {
            const item = items.find((i) => i.title === title);
            return (
              <div key={item.title}>
                <h3 className="text-[#607f6a]">{item.title}</h3>
                <p className=" md:text-base text-xs">{item.description}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  <Button type="openForm"><div className="btnEffect flex flex-row items-center">Your<Sun/>Scope</div> </Button>
</div>
</main>
}
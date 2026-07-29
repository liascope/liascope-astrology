import NatalTransitInfo from "@/app/_components/NatalTransitInfo";
import Navigation from "@/app/_components/Navigation";
import ChartsWrapper from "../_components/ChartsWrapper";


export default function ChartsLayout({ children }) {
  return (
  <div className="overflow-x-hidden flex flex-col-reverse min-[125px]:flex min-[1625px]:flex-row relative w-screen px-1 md:px-5">
      <div className="md:flex-1 transition-all duration-500 ease-in-out relative pb-40">
        <ChartsWrapper>{children}</ChartsWrapper>
      </div>

      <div className="flex flex-col min-[1625px]:w-[20%] min-[700px]:flex-row
    min-[1625px]:flex-col z-10 min-[700px]:gap-3">
        <NatalTransitInfo />
        <Navigation />
      </div>
    </div>
  );
}

          

import { items, intro } from "@/app/_lib/data";
import { actualYear } from "../_lib/config";

export default function ModalInfoContent() {
  return (
    <div className="px-12 space-y-4 text-sm">
      <h2 className="text-4xl text-center font-light tracking-wider text-[rgba(230,193,85,0.8)] font-[Dancing_Script]">
        Liascope
      </h2>
      <h2 className="text-2xl text-center -mt-3 font-light tracking-widest text-[rgba(230,193,85,0.8)] font-[Dancing_Script]">
        your sun your scope
      </h2>
      <p>
       {intro}
      </p>
   {items
  .slice(3)
  .concat(items.slice(0, 3))
  .map(({ title, description }, index) => (
    <div key={`${title}-${index}`}>
      <h3 className="font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  ))}
    <h3>Other Features</h3>
       <div>
        <h3>AI Assistant - Lia</h3>
        <p>
Lia provides personalized interpretations based on your chart data. Chats are not stored, but responses can be copied manually.
Each chart is limited to 2 questions per day.
        </p>
      </div>
        <div>
        <h3>Save Profile</h3>
        <p>
Up to 5 profiles can be saved
        </p>
      </div>
      <p className="text-xs text-gray-600 py-5">
       Astrology content is provided for informational and entertainment purposes only and should not be considered medical, financial, legal, or psychological advice. <br  />
        © {actualYear} Liascope | Developed & Created with ✨ All rights reserved.
      </p>
    </div>
  );
}

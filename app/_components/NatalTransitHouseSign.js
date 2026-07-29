export default function NatalTransitHouseSign ({comparison, selected}) {

return (<div className="grid w-full h-fit my-9 text-center text-[10px] xs:text-xs sm:text-sm overflow-hidden rounded-2xl backdrop-blur-sm"

      style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", }}>

      {/* Header */}
      <div className="font-bold pb-1 border-b border-r border-gray-400/20"> Planet</div>

      <div className="font-bold  text-[#4fa091] border-b border-gray-400/20"> Natal</div>

      <div className="font-bold text-[#4fa091] border-b border-gray-400/20"> NH</div>

      <div className="font-bold text-[#3f638d] border-b border-gray-400/20">{selected === "birth" ? "TH" : "PH"}</div>

      <div className="font-bold text-[#3f638d] border-b border-gray-400/20"> {selected === "birth" ? "Transit" : "Partner"}</div>

      <div className=" font-bold text-[#3f638d] border-b border-gray-400/20">{selected === "birth" ? "TH" : "PH"}</div>

      <div className="font-bold text-[#4fa091] border-b border-gray-400/20">NH </div>

      {/* Rows */}
      {comparison.map((row, idx) => [<div key={`${idx}-Planet`}
          className="font-semibold flex items-center justify-center border-r border-gray-400/20">{row.Planet}</div>,

        <div key={`${idx}-Natal`}className="p-0.5 flex flex-col items-center justify-center">
          <span> {row.Natal}</span>
          <span className="text-[10px] opacity-60">{row.NatalPosition}</span> </div>,

        <div key={`${idx}-NH`}className=" py-0.5">{row.NH}</div>,

        <div key={`${idx}-TH`} className=" py-0.5">{row.TH}</div>,

        <div key={`${idx}-Transit`}
          className=" py-0.5 flex flex-col items-center justify-center ">
          <span>{row.Transit}</span>
          <span className=" text-[10px]opacity-60"> {row.TransitPosition}</span> </div>,

        <div key={`${idx}-TH2`} className=" py-0.5">{row.TH2}  </div>,

        <div key={`${idx}-NH2`} className="py-0.5">{row.NH2}</div>])}
    </div>
);
}
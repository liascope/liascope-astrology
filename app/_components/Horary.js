export default function Horary ({mode, setMode}) {

return (

  <div className="flex rounded-full border border-white/20 bg-white/20 backdrop-blur-md p-1">
    <button
      onClick={() => setMode(()=>"transit")}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
        mode === "transit"
          ? "bg-gradient-to-r from-[#ebc155] to-[#e89b53] text-white shadow-md"
          : "text-black/60 hover:text-black"
      }`}
    >
      Transit
    </button>

    <button
      onClick={() => setMode(()=>"horary")}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
        mode === "horary"
          ? "bg-gradient-to-r from-[#ebc155] to-[#e89b53] text-white shadow-md"
          : "text-black/60 hover:text-black"
      }`}
    >
      Horary
    </button>

</div>)}





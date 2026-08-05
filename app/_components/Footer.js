export const dynamic = "force-dynamic";
import { actualYear } from "../_lib/config";
export default function Footer() {

return (<footer className="w-full py-6 text-center text-xs tracking-widest text-stone-500/70 bg-transparent"> Liascope Astrology | © {actualYear} Liascope </footer>
);}
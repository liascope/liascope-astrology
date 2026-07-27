export const dynamic = "force-dynamic";
import { actualYear } from "../_lib/config";

export default function Footer() {
  return (
    <footer className="my-5 sm:my-10 overflow-hidden text-center w-full text-xs tracking-widest drop-shadow-xl text-stone-500/70 absolute bottom-0 right-0">
     Liascope Astrology | © {actualYear} Liascope
    </footer>
  );
}

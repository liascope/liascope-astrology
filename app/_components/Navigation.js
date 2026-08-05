'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAstroForm } from "../_lib/context/AstroContext"
import Sun from "./navicons/Sun"

export default function Navigation() {

  const pathname = usePathname();
  const { unknownTime, selected } = useAstroForm();


  const links = [
    { href: "/charts/natal", label: "Natal" },
    { href: "/charts/external", label: `${selected === 'birth' ? 'Transit & Horary' : 'Partner Natal'}`},
    { href: "/charts/comparison", label: `${selected === 'birth' ? 'Natal & Transit' : 'Synastry'}`},
    { href: "/charts/progression", label: "Progression" },
    { href: "/charts/draconic", label: "Draconic" }, ...(unknownTime?.birth ? [] : [{ href: "/charts/perfection", label: "Ann. Perfection" }]
    ),
  ];

  return ( <nav className="w-full my-2 flex justify-center  px-2 flex-1">
      <ul className="flex flex-col gap-1 md:gap-2 w-full">
      {links.map(({href,label})=>{
        const isActive = pathname === href;
        return ( <li  key={href} className="list-none">
          <Link href={href} scroll={false} aria-current={isActive ? "page" : undefined}
        className={`flex items-center justify-between rounded-xl px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-xl tracking-widest text-white transition-all duration-300
         ${isActive ? `bg-[#e89b53]/90 text-white/90 shadow-lg scale-[1.05]` : `bg-[#ebc155cc]/80 shadow-sm hover:bg-[#607f6a]/80 hover:-translate-x-2`}`}>
            {label}
            { isActive && (<span
                className="absolute right-4 text-white/80">
                 <Sun /> 
              </span>)}
          </Link>
        </li>
        )
      })}
      </ul>
    </nav>
  )
}
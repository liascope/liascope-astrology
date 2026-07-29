'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react';
import Modal from "./Modal";
import Info from "./navicons/Info";

export default function Header(){

 const [open, setOpen] = useState(false);


 return (

<header className="w-full flex flex-col items-center pt-4">


<Link href="/">

<div
className="
relative
w-64
h-32
md:w-80
md:h-40
"
>

<Image

src="/logo.png"

alt="Liascope Logo"

fill

priority

sizes="(max-width: 768px) 256px, 320px"

className="
object-contain
brightness-100
saturate-50
"

 />

</div>

</Link>



<div
className="
flex
items-center
justify-center
gap-3
text-3xl
md:text-5xl
tracking-widest
font-light mb-5
"
>
     <h1 className="
          text-3xl
          md:text-5xl
          font-light
          tracking-tight
          text-[#ebc155cc]
        ">
         your sun
          <span className="text-[#947936cc]">
            {" "}your scope
          </span>
        </h1>

<Info

className="
cursor-pointer
hover:scale-110
transition
"

onClick={()=>setOpen(true)}

/>


</div>



<Modal
isOpen={open}
onClose={()=>setOpen(false)}
/>


</header>

 );

}
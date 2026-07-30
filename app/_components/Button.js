'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";

import ArrowLeft from "./navicons/ArrowLeft";
import Saved from "./navicons/Saved";

import { useAstroForm } from "../_lib/context/AstroContext";

export default function Button({ type, children }) {
  const router = useRouter();
  const { formState } = useAstroForm();

  if (type === "btnBack") {
    return (
      <button
        type="button"
        className="btnGreen px-3 py-1 w-fit h-fit flex flex-row gap-3 items-center relative top-0"
        onClick={() => router.push(formState ? "/charts/natal" : "/form")}
      >
       <ArrowLeft></ArrowLeft>
        <span>Go Back</span>
      </button>
    );
  }

  if (type === "savedCharts" || type === "openForm") {
    const href = type === "savedCharts" ? "/profiles" : "/form";
    const className =
      "text-[#e89b53]/80 text-sm cursor-pointer transition-colors md:text-base lg:text-xl whitespace-nowrap px-2 py-1 duration-300 hover:text-[#40584a] z-10";

    const defaultContent =
      type === "savedCharts" ? (
        <span className="flex flex-row items-center">
          <span>Saved Charts</span> <Saved></Saved>
        </span>
      ) : (
        "Open Form"
      );

    return (
      <Link href={href} className={className}>
        {children || defaultContent}
      </Link>
    );
  }

  return null; 
}

 
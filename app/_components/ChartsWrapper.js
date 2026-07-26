'use client';

import Loader from "./Loader";
import Button from "./Button";

import { useAstroForm } from "../_lib/context/AstroContext";

export default function ChartsWrapper({ children}) {
  const { natalData } = useAstroForm();

  if (!natalData) {
    return <Loader size="w-[9rem]" />;
  }

  if (!children) {
    return (
      <div className="flex justify-center items-center my-40">
        No Chart found. <Button type="btnBack" />
      </div>
    );
  }

  return <>{children}</>;
}


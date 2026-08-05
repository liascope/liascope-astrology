'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAstroForm } from '../_lib/context/AstroContext';
import Button from './Button';
import Loader from './Loader';
import Trash from './navicons/Trash';
import useSavedProfiles from '../_lib/hooks/useSavedProfiles';

export function Profiles() {

  const {loading, profiles, error, deleteProfile} = useSavedProfiles();
  const { setFormState } = useAstroForm();
  const router = useRouter();

  const loadProfile = useCallback( (profile) => {
      if (!profile) return;
      setFormState(profile.formState);
      router.push('/charts/natal'); }, [setFormState, router]);

  if (loading) return <Loader />;
  if (error) return (<div className="text-center text-red-500 mt-10"> {error}<Button type="btnBack" /></div>);

  return (
    <div className="flex flex-col w-full min-h-screen px-4 pt-10">
      <h2 className="text-center text-xl sm:text-2xl tracking-wide text-[#40584a]"> Saved Charts </h2>
      <p className="text-center text-sm text-neutral-500 mt-2"> Save up to 5 charts.</p>
      <div className="mt-8 flex justify-center"><Button type="btnBack"/></div>
      <div className="flex flex-col items-center gap-5 mt-10">
      {profiles.length === 0 && (<p className="text-neutral-500 mt-10"> No charts saved.</p>)}
      {profiles.map((profile)=>{
        const { user, birthDate, birthTime, birthPlaceData, moment, transitDate, transitTime, transitPlaceData, type } = profile.formState || {};

        return ( <div key={profile.id} onClick={()=>loadProfile(profile)}
          className="group relative w-full sm:w-[75%] lg:w-[60%] cursor-pointer rounded-3xl bg-white/35 backdrop-blur-md border border-white/50 shadow-md p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col gap-4 pr-8">
            <div>
              <h3 className="text-[#607f6a] font-medium mb-1">Natal</h3>
              <p className="text-sm text-neutral-600"> {user || "Unknown"}, {" "} {birthDate}, {" "} {birthTime || "Unknown time"}, {" "} {birthPlaceData?.city?.split(",")[0]}
              </p>
            </div>

            <div className="border-t border-black/10 pt-3">
              <h3 className="text-[#607f6a] font-medium mb-1"> {type === "birth" ? "Transit" : "Synastry"}
              </h3>
              <p className="text-sm text-neutral-600">
                {moment}, {" "} {transitDate},  {" "} {transitTime || "Unknown time"}, {" "} {transitPlaceData?.city?.split(",")[0]}
              </p>
            </div>
          </div>
          <button type="button" onClick={(e)=>{ e.stopPropagation(); deleteProfile(profile.id);}}
            className="absolute top-4 right-4 opacity-60 transition-all duration-200 hover:opacity-100 hover:scale-110">
            <Trash />
          </button>
        </div>)})}
      </div>
    </div>
  );
}
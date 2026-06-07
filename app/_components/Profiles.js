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

  // Load profile and navigate
  const loadProfile = useCallback(
    (profile) => {
      if (!profile) return;
      setFormState(profile.formState);
      router.push('/charts/natal');
    },
    [setFormState, router]
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <Button type="btnBack" />
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen mt-7">
      <h2 className="sm:tracking-wide text-md sm:text-2xl sm:mx-[4rem] text-center text-[#e89b53]">
        Saved Charts | save up to 5 charts.
      </h2>
  <div className="left-[25%] w-fit relative mt-10">
  <p>{profiles.length === 0 ? "No charts saved." : ""} <Button type="btnBack" /></p>
</div>
      <div className="flex w-full h-fit items-center flex-col">
        {profiles.map((profile) => {
  const { user, birthDate, birthTime, birthPlaceData, moment, transitDate, transitTime, transitPlaceData, type } = profile.formState || {};
  return (
    <div
      key={profile.id}
      onClick={() => loadProfile(profile)}
      className="relative p-4 flex sm:items-center items-end justify-between w-[90%] sm:w-[70%] bg-[rgb(230,193,85,0.8)] btnGreen cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:gap-7 gap-1 w-full">
        <span><strong>Natal:</strong></span>
        <span className="flex-1 border-e border-gray-300">
          {user}, {birthDate}, {birthTime}, {birthPlaceData?.city?.split(',')[0]}
        </span>
        <span><strong>{type === 'birth' ? 'Transit' : 'Synastry'}:</strong></span>
        <span className="flex-1">
         {moment}, {transitDate}, {transitTime}, {transitPlaceData?.city?.split(',')[0]}
        </span>
      </div>
      <Trash onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }} />
    </div> ); })}
      </div>
    </div>
  );
}

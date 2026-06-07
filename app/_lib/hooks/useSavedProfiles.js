'use client'
import { useState, useEffect } from "react"

export default function useSavedProfiles () {
const [profiles, setProfiles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

  // Load profiles from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('liascope-profiles');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfiles(parsed);
      }
    } catch (err) {
      console.error('Failed to load profiles', err);
      setError('Could not load profiles');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete profile
  const deleteProfile = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    localStorage.setItem('liascope-profiles', JSON.stringify(updated));
  };

  return {profiles, loading, error, deleteProfile}
}
import { useCallback, useEffect, useState } from 'react';
import type { UserProfile } from '../core/types';
import {
  clearUserProfile,
  loadUserProfile,
  saveUserProfile,
} from '../core/storage/userProfile';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => loadUserProfile());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const updateProfile = useCallback((nextProfile: UserProfile) => {
    saveUserProfile(nextProfile);
    setProfile(nextProfile);
  }, []);

  const resetProfile = useCallback(() => {
    clearUserProfile();
    setProfile(null);
  }, []);

  return {
    profile,
    isReady,
    updateProfile,
    resetProfile,
  };
}

import { STORAGE_KEY } from '../constants/rota';
import type { UserProfile } from '../types';

export function loadUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    if (!parsed.startDate || !parsed.startStatus) return null;
    if (parsed.startStatus !== 'duty' && parsed.startStatus !== 'off') return null;
    if (!parsed.name?.trim()) return null;

    return {
      name: parsed.name.trim(),
      startDate: parsed.startDate,
      startStatus: parsed.startStatus,
    };
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearUserProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}

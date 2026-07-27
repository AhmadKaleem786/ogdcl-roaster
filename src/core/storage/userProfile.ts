import { STORAGE_KEY } from '../constants/rota';
import type { RotaPeriod, UserProfile } from '../types';

function isValidCustomPeriod(period: unknown): period is RotaPeriod {
  if (!period || typeof period !== 'object') return false;
  const candidate = period as Partial<RotaPeriod>;
  return (
    (candidate.status === 'duty' || candidate.status === 'off') &&
    typeof candidate.duration === 'number' &&
    Number.isInteger(candidate.duration) &&
    candidate.duration >= 1 &&
    candidate.duration <= 365
  );
}

export function loadUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    if (!parsed.startDate || !parsed.startStatus) return null;
    if (parsed.startStatus !== 'duty' && parsed.startStatus !== 'off') return null;
    if (!parsed.name?.trim()) return null;

    const customPeriods = Array.isArray(parsed.customPeriods)
      ? parsed.customPeriods.filter(isValidCustomPeriod)
      : undefined;

    return {
      name: parsed.name.trim(),
      startDate: parsed.startDate,
      startStatus: parsed.startStatus,
      ...(customPeriods?.length ? { customPeriods } : {}),
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

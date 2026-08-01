import type { ComponentType, ReactNode } from 'react';
import type { Dayjs } from 'dayjs';

export type RotaStatus = 'duty' | 'off';

export interface RotaPeriod {
  status: RotaStatus;
  duration: number;
}

export interface UserProfile {
  name: string;
  startDate: string;
  startStatus: RotaStatus;
  /** One-off periods beginning on startDate, before the normal 21/21 rota resumes. */
  customPeriods?: RotaPeriod[];
}

export interface RotaDayInfo {
  status: RotaStatus;
  dayNumber: number;
  totalDaysInPeriod: number;
  daysUntilSwitch: number;
}

export interface ModuleProps {
  profile: UserProfile;
  onProfileUpdate?: (profile: UserProfile) => void;
}

export interface AppModule {
  id: string;
  path: string;
  title: string;
  description: string;
  icon: ReactNode;
  component: ComponentType<ModuleProps>;
}

export type DateInput = Dayjs | string | Date;

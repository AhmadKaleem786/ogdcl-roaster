import type { ComponentType, ReactNode } from 'react';
import type { Dayjs } from 'dayjs';

export type RotaStatus = 'duty' | 'off';

export interface UserProfile {
  name: string;
  startDate: string;
  startStatus: RotaStatus;
}

export interface RotaDayInfo {
  status: RotaStatus;
  dayNumber: number;
  totalDaysInPeriod: number;
  daysUntilSwitch: number;
}

export interface ModuleProps {
  profile: UserProfile;
}

export interface AppModule {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  component: ComponentType<ModuleProps>;
}

export type DateInput = Dayjs | string | Date;

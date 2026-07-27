import dayjs, { type Dayjs } from 'dayjs';
import { CYCLE_LENGTH, DUTY_DAYS, OFF_DAYS } from '../constants/rota';
import type { DateInput, RotaDayInfo, RotaStatus, UserProfile } from '../types';

function normalizeDate(date: DateInput): Dayjs {
  return dayjs(date).startOf('day');
}

function getCyclePosition(daysDiff: number): number {
  return ((daysDiff % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
}

function buildDayInfo(status: RotaStatus, dayNumber: number): RotaDayInfo {
  const totalDaysInPeriod = status === 'duty' ? DUTY_DAYS : OFF_DAYS;
  return {
    status,
    dayNumber,
    totalDaysInPeriod,
    daysUntilSwitch: totalDaysInPeriod - dayNumber + 1,
  };
}

export function getRotaStatus(profile: UserProfile, date: DateInput): RotaDayInfo {
  const start = normalizeDate(profile.startDate);
  const target = normalizeDate(date);
  const daysDiff = target.diff(start, 'day');
  const position = getCyclePosition(daysDiff);

  if (profile.startStatus === 'duty') {
    if (position < DUTY_DAYS) {
      return buildDayInfo('duty', position + 1);
    }
    return buildDayInfo('off', position - DUTY_DAYS + 1);
  }

  if (position < OFF_DAYS) {
    return buildDayInfo('off', position + 1);
  }
  return buildDayInfo('duty', position - OFF_DAYS + 1);
}

export function getTodayStatus(profile: UserProfile): RotaDayInfo {
  return getRotaStatus(profile, dayjs());
}

export function formatStatusLabel(info: RotaDayInfo): string {
  const period = info.status === 'duty' ? 'Duty' : 'Days Off';
  return `${period} — Day ${info.dayNumber} of ${info.totalDaysInPeriod}`;
}

import { CalendarOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import type { AppModule } from '../core/types';
import { CalendarModule } from './calendar/CalendarModule';
import { FutureDateModule } from './futureDate/FutureDateModule';
import { RosterSettingsModule } from './rosterSettings/RosterSettingsModule';

export const appModules: AppModule[] = [
  {
    id: 'calendar',
    path: '/calendar',
    title: 'Duty Calendar',
    description: 'View your duty and off periods on the calendar.',
    icon: <CalendarOutlined />,
    component: CalendarModule,
  },
  {
    id: 'future-date',
    path: '/future-date',
    title: 'Future Date Lookup',
    description: 'Check whether you will be on duty or off on any date.',
    icon: <SearchOutlined />,
    component: FutureDateModule,
  },
  {
    id: 'roster-settings',
    path: '/roster-settings',
    title: 'Reschedule Roster',
    description: 'Replan your roster and adjust your duty/off schedule.',
    icon: <RedoOutlined />,
    component: RosterSettingsModule,
  },
];

export function getModuleById(id: string): AppModule | undefined {
  return appModules.find((module) => module.id === id);
}

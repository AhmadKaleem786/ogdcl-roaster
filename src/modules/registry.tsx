import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import type { AppModule } from '../core/types';
import { CalendarModule } from './calendar/CalendarModule';
import { FutureDateModule } from './futureDate/FutureDateModule';

export const appModules: AppModule[] = [
  {
    id: 'calendar',
    title: 'Duty Calendar',
    description: 'View your 21-day duty and off cycle on the calendar.',
    icon: <CalendarOutlined />,
    component: CalendarModule,
  },
  {
    id: 'future-date',
    title: 'Future Date Lookup',
    description: 'Check whether you will be on duty or off on any date.',
    icon: <SearchOutlined />,
    component: FutureDateModule,
  },
];

export function getModuleById(id: string): AppModule | undefined {
  return appModules.find((module) => module.id === id);
}

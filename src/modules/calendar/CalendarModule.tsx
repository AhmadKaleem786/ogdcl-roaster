import { Calendar, Card, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { getRotaStatus } from '../../core/rota/calculator';
import type { ModuleProps } from '../../core/types';
import { rotaColors } from '../../theme/ogdclTheme';
import './CalendarModule.css';

const { Text } = Typography;

export function CalendarModule({ profile }: ModuleProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card bordered={false} className="module-card">
        <Space wrap>
          <Tag color={rotaColors.duty} className="legend-tag">
            Duty (21 days)
          </Tag>
          <Tag color={rotaColors.off} className="legend-tag">
            Days Off (21 days)
          </Tag>
        </Space>
        <Text type="secondary" className="calendar-hint">
          Your rota repeats every 42 days — 21 on duty, then 21 off — based on your
          start date.
        </Text>
      </Card>

      <Card bordered={false} className="module-card calendar-card">
        <Calendar
          fullscreen={false}
          fullCellRender={(date) => {
            const info = getRotaStatus(profile, date);
            const isToday = date.isSame(dayjs(), 'day');
            const isDuty = info.status === 'duty';

            return (
              <div
                className={[
                  'calendar-full-cell',
                  isDuty ? 'calendar-full-cell--duty' : 'calendar-full-cell--off',
                  isToday ? 'calendar-full-cell--today' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="calendar-full-cell__date">{date.date()}</span>
                <span className="calendar-full-cell__status">
                  {isDuty ? 'Duty' : 'Off'}
                </span>
                <span className="calendar-full-cell__day">D{info.dayNumber}</span>
              </div>
            );
          }}
        />
      </Card>
    </Space>
  );
}

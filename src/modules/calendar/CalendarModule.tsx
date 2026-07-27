import { Calendar, Card, Progress, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { getRotaStatus, getTodayStatus } from "../../core/rota/calculator";
import type { ModuleProps } from "../../core/types";
import { rotaColors } from "../../theme/ogdclTheme";
import { useLanguage } from '../../context/LanguageContext';
import "./CalendarModule.css";

const { Text } = Typography;

export function CalendarModule({ profile }: ModuleProps) {
  const { isUrdu } = useLanguage();
  const todayInfo = getTodayStatus(profile);
  const isDutyToday = todayInfo.status === "duty";
  const completionPercent = Math.round(
    (todayInfo.dayNumber / todayInfo.totalDaysInPeriod) * 100,
  );
  const switchDate = dayjs().add(todayInfo.daysUntilSwitch, "day");
  const nextStatus = isDutyToday ? "Days Off" : "Duty";
  const rosterDescription = profile.customPeriods?.length
    ? `Custom periods: ${profile.customPeriods
        .map((period) => `${period.duration} days ${period.status}`)
        .join(
          ", then ",
        )}. The standard 21-day duty / 21-day off rota resumes afterward.`
    : "Your standard rota repeats as 21 days on duty followed by 21 days off.";

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card bordered={false} className="module-card">
        <Space wrap>
          <Tag color={rotaColors.duty} className="legend-tag">
            {isUrdu ? 'ڈیوٹی' : 'Duty'}
          </Tag>
          <Tag color={rotaColors.off} className="legend-tag">
            {isUrdu ? 'چھٹی' : 'Days Off'}
          </Tag>
        </Space>
        <Text type="secondary" className="calendar-hint">
          {rosterDescription}
        </Text>
      </Card>

      <Card bordered={false} className="module-card">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Text type="secondary">{isUrdu ? 'موجودہ روسٹر کی صورتحال' : 'Current Rota status'}</Text>
            <div style={{ marginTop: 6 }}>
              <Space>
                <Tag
                  color={isDutyToday ? rotaColors.duty : rotaColors.off}
                  className="legend-tag"
                >
                  {isUrdu ? (isDutyToday ? 'ڈیوٹی پر' : 'چھٹی پر') : (isDutyToday ? 'On Duty' : 'On Days Off')}
                </Tag>
                <Text strong>
                  {isUrdu ? `دن ${todayInfo.dayNumber} از ${todayInfo.totalDaysInPeriod}` : `Day ${todayInfo.dayNumber} of ${todayInfo.totalDaysInPeriod}`}
                </Text>
              </Space>
            </div>
          </div>
          <Progress
            percent={completionPercent}
            strokeColor={isDutyToday ? rotaColors.duty : rotaColors.off}
            trailColor="rgba(128, 128, 128, 0.18)"
            format={(percent) => isUrdu ? `${percent}% مکمل` : `${percent}% complete`}
          />
          <Text type="secondary">
            {isUrdu ? <>تبدیلی <Text strong>{nextStatus === 'Duty' ? 'ڈیوٹی' : 'چھٹی'}</Text> پر {switchDate.format('DD MMM YYYY')} کو ہوگی ({todayInfo.daysUntilSwitch} دن باقی)۔</> : <>Switches to <Text strong>{nextStatus}</Text> on {switchDate.format('dddd, DD MMM YYYY')} ({todayInfo.daysUntilSwitch} day{todayInfo.daysUntilSwitch === 1 ? '' : 's'} remaining).</>}
          </Text>
        </Space>
      </Card>

      <Card bordered={false} className="module-card calendar-card">
        <Calendar
          fullscreen={false}
          fullCellRender={(date) => {
            const info = getRotaStatus(profile, date);
            const isToday = date.isSame(dayjs(), "day");
            const isDuty = info.status === "duty";

            return (
              <div
                className={[
                  "calendar-full-cell",
                  isDuty
                    ? "calendar-full-cell--duty"
                    : "calendar-full-cell--off",
                  isToday ? "calendar-full-cell--today" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="calendar-full-cell__date">{date.date()}</span>
                <span className="calendar-full-cell__status">
                  {isUrdu ? (isDuty ? 'ڈیوٹی' : 'چھٹی') : (isDuty ? 'Duty' : 'Off')}
                </span>
                <span className="calendar-full-cell__day">
                  D{info.dayNumber}
                </span>
              </div>
            );
          }}
        />
      </Card>
    </Space>
  );
}

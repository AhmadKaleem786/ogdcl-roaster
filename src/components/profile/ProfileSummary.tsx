import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import { formatStatusLabel, getTodayStatus } from "../../core/rota/calculator";
import type { UserProfile } from "../../core/types";
import { rotaColors } from "../../theme/ogdclTheme";
import { useLanguage } from "../../context/LanguageContext";

const { Text, Title } = Typography;

interface ProfileSummaryProps {
  profile: UserProfile;
  collapsed?: boolean;
  onOpenSettings: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

export function ProfileSummary({
  profile,
  collapsed = false,
  onOpenSettings,
}: ProfileSummaryProps) {
  const { isUrdu } = useLanguage();
  const todayInfo = getTodayStatus(profile);
  const isDuty = todayInfo.status === "duty";

  if (collapsed) {
    return (
      <Card
        bordered={false}
        className="profile-summary profile-summary--collapsed"
      >
        <Tooltip
          title={
            <div>
              <div>{profile.name}</div>
              <div>{formatStatusLabel(todayInfo)}</div>
            </div>
          }
        >
          <button
            type="button"
            className="profile-avatar-btn"
            onClick={onOpenSettings}
            aria-label={`Reschedule roster for ${profile.name}`}
          >
            {getInitials(profile.name)}
          </button>
        </Tooltip>
      </Card>
    );
  }

  return (
    <Card bordered={false} className="profile-summary">
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <div style={{ minWidth: 0 }}>
            <Title level={5} style={{ margin: 0 }} ellipsis>
              {profile.name}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {isUrdu ? "آپ کا روسٹر" : "Your Rota"}
            </Text>
          </div>
        </Space>

        <Tag color={isDuty ? rotaColors.duty : rotaColors.off}>
          {isUrdu ? "آج:" : "Today:"}{" "}
          {isUrdu
            ? `دن ${todayInfo.dayNumber} از ${todayInfo.totalDaysInPeriod}`
            : formatStatusLabel(todayInfo)}
        </Tag>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {isUrdu
            ? "شروع ہونے کی تاریخ:"
            : `${profile.startStatus === "duty" ? "Duty" : "Days off"} started`}{" "}
          {dayjs(profile.startDate).format("DD MMM YYYY")}
        </Text>
        {profile.customPeriods?.length ? (
          <Text type="secondary" style={{ fontSize: 12 }}>
            {profile.customPeriods.length} custom period
            {profile.customPeriods.length === 1 ? "" : "s"} configured
          </Text>
        ) : null}
        <Button type="primary" size="small" onClick={onOpenSettings}>
          {isUrdu ? "روسٹر دوبارہ ترتیب دیں" : "Reschedule roster"}
        </Button>
      </Space>
    </Card>
  );
}

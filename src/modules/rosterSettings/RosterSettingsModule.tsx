import { Alert, Card, Space, Typography } from 'antd';
import { ProfileForm } from '../../components/onboarding/OnboardingScreen';
import type { ModuleProps, UserProfile } from '../../core/types';

const { Title, Paragraph } = Typography;

export function RosterSettingsModule({ profile, onProfileUpdate }: ModuleProps) {
  return (
    <Card bordered={false} className="module-card" style={{ maxWidth: 720 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>Update your roster</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Change your joining date, starting status, or custom roster periods. Your calendar and future-date results update when you save.
          </Paragraph>
        </div>
        <Alert type="info" showIcon message="Your existing roster remains active until you save changes." />
        <ProfileForm
          initialValues={profile}
          submitLabel="Save roster changes"
          onSubmit={(nextProfile: UserProfile) => onProfileUpdate?.(nextProfile)}
        />
      </Space>
    </Card>
  );
}

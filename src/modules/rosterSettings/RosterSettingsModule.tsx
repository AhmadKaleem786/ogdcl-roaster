import { Alert, Card, Space, Typography } from 'antd';
import { ProfileForm } from '../../components/onboarding/OnboardingScreen';
import type { ModuleProps, UserProfile } from '../../core/types';
import { useLanguage } from '../../context/LanguageContext';

const { Title, Paragraph } = Typography;

export function RosterSettingsModule({ profile, onProfileUpdate }: ModuleProps) {
  const { isUrdu } = useLanguage();
  return (
    <Card bordered={false} className="module-card" style={{ maxWidth: 720 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>{isUrdu ? 'اپنا روسٹر اپ ڈیٹ کریں' : 'Update your roster'}</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {isUrdu ? 'اپنی جوائننگ تاریخ، ابتدائی حیثیت یا کسٹم روسٹر پیریڈز تبدیل کریں۔ محفوظ کرنے پر کیلنڈر اور آئندہ تاریخوں کے نتائج اپ ڈیٹ ہو جائیں گے۔' : 'Change your joining date, starting status, or custom roster periods. Your calendar and future-date results update when you save.'}
          </Paragraph>
        </div>
        <Alert type="info" showIcon message={isUrdu ? 'تبدیلیاں محفوظ کرنے تک موجودہ روسٹر فعال رہے گا۔' : 'Your existing roster remains active until you save changes.'} />
        <ProfileForm
          initialValues={profile}
          submitLabel={isUrdu ? 'روسٹر تبدیلیاں محفوظ کریں' : 'Save roster changes'}
          onSubmit={(nextProfile: UserProfile) => onProfileUpdate?.(nextProfile)}
        />
      </Space>
    </Card>
  );
}

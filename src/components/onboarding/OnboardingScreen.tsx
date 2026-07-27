import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Radio,
  Space,
  Typography,
} from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import type { RotaStatus, UserProfile } from '../../core/types';

const { Title, Paragraph } = Typography;

interface ProfileFormValues {
  name: string;
  startDate: Dayjs;
  startStatus: RotaStatus;
}

interface ProfileFormProps {
  initialValues?: UserProfile;
  submitLabel?: string;
  onSubmit: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export function ProfileForm({
  initialValues,
  submitLabel = 'Save & Continue',
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const [form] = Form.useForm<ProfileFormValues>();

  const handleFinish = (values: ProfileFormValues) => {
    onSubmit({
      name: values.name.trim(),
      startDate: values.startDate.format('YYYY-MM-DD'),
      startStatus: values.startStatus,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: initialValues?.name ?? '',
        startDate: initialValues ? dayjs(initialValues.startDate) : dayjs(),
        startStatus: initialValues?.startStatus ?? 'duty',
      }}
    >
      <Form.Item
        label="Your name"
        name="name"
        rules={[
          { required: true, message: 'Please enter your name' },
          { whitespace: true, message: 'Name cannot be empty' },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <Input placeholder="Enter your full name" maxLength={80} />
      </Form.Item>

      <Form.Item
        label="What is your current status?"
        name="startStatus"
        rules={[{ required: true, message: 'Please select your current status' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="duty">
              I am currently on <strong>Duty</strong> — enter when this duty period started
            </Radio>
            <Radio value="off">
              I am currently on <strong>Days Off</strong> — enter when this off period started
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.startStatus !== curr.startStatus}
      >
        {({ getFieldValue }) => {
          const status = getFieldValue('startStatus') as RotaStatus;
          return (
            <Form.Item
              label={
                status === 'duty'
                  ? 'When did your current duty period start?'
                  : 'When did your current days off start?'
              }
              name="startDate"
              rules={[{ required: true, message: 'Please select a start date' }]}
            >
              <DatePicker
                style={{ width: '100%', maxWidth: 320 }}
                format="DD MMM YYYY"
                disabledDate={(current) => current && current.isAfter(dayjs(), 'day')}
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item>
        <Space wrap>
          <Button type="primary" htmlType="submit">
            {submitLabel}
          </Button>
          {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
}

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="onboarding-screen">
        <Card bordered={false} className="onboarding-card">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="onboarding-header">
              <img src="/ogdcl-logo.png" alt="OGDCL" className="onboarding-logo" />
              <Title level={2} style={{ margin: 0 }}>
                Duty Roster Tracker
              </Title>
              <Paragraph type="secondary">
                OGDCL follows a 21-day duty and 21-day off rotation. Enter your details
                below to track your schedule on the calendar and look up future dates.
              </Paragraph>
            </div>

            <ProfileForm onSubmit={onComplete} />
          </Space>
        </Card>
    </div>
  );
}

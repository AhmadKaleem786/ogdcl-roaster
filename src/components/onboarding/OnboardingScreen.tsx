import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from "dayjs";
import type { RotaPeriod, RotaStatus, UserProfile } from "../../core/types";

const { Title, Paragraph } = Typography;

interface ProfileFormValues {
  name: string;
  startDate: Dayjs;
  startStatus: RotaStatus;
  useCustomPeriods: boolean;
  customPeriods: RotaPeriod[];
}

interface ProfileFormProps {
  initialValues?: UserProfile;
  submitLabel?: string;
  onSubmit: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export function ProfileForm({
  initialValues,
  submitLabel = "Save & Continue",
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const [form] = Form.useForm<ProfileFormValues>();

  const handleFinish = (values: ProfileFormValues) => {
    const customPeriods = values.useCustomPeriods
      ? values.customPeriods.map((period) => ({
          status: period.status,
          duration: Number(period.duration),
        }))
      : undefined;

    onSubmit({
      name: values.name.trim(),
      startDate: values.startDate.format("YYYY-MM-DD"),
      startStatus: customPeriods?.[0]?.status ?? values.startStatus,
      ...(customPeriods?.length ? { customPeriods } : {}),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: initialValues?.name ?? "",
        startDate: initialValues ? dayjs(initialValues.startDate) : dayjs(),
        startStatus: initialValues?.startStatus ?? "duty",
        useCustomPeriods: Boolean(initialValues?.customPeriods?.length),
        customPeriods: initialValues?.customPeriods ?? [
          { status: initialValues?.startStatus ?? 'duty', duration: 21 },
        ],
      }}
    >
      <Form.Item
        label="Your name"
        name="name"
        rules={[
          { required: true, message: "Please enter your name" },
          { whitespace: true, message: "Name cannot be empty" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter your full name" maxLength={80} />
      </Form.Item>

      <Form.Item name="useCustomPeriods" valuePropName="checked">
        <Checkbox>
          Use custom roster periods from this date
        </Checkbox>
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, curr) => prev.useCustomPeriods !== curr.useCustomPeriods}>
        {({ getFieldValue }) =>
          getFieldValue('useCustomPeriods') ? (
            <Card size="small" style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Alert
                  type="info"
                  showIcon
                  message="Custom periods start on the date above"
                  description="Choose whether each period is duty or off, and its length. When the listed periods end, the normal 21-day duty / 21-day off rotation resumes."
                />
                <Form.List
                  name="customPeriods"
                  rules={[
                    {
                      validator: async (_, periods) => {
                        if (!periods?.length) throw new Error('Add at least one custom period');
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      {fields.map((field, index) => (
                        <Space key={field.key} align="start" wrap>
                          <Form.Item
                            label={index === 0 ? 'First period status' : `Period ${index + 1} status`}
                            name={[field.name, 'status']}
                            rules={[{ required: true, message: 'Select a status' }]}
                          >
                            <Radio.Group>
                              <Radio.Button value="duty">Duty</Radio.Button>
                              <Radio.Button value="off">Off</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item
                            label="Days"
                            name={[field.name, 'duration']}
                            rules={[{ required: true, message: 'Enter days' }]}
                          >
                            <InputNumber min={1} max={365} precision={0} addonAfter="days" />
                          </Form.Item>
                          {fields.length > 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => remove(field.name)}
                              aria-label={`Remove period ${index + 1}`}
                              style={{ marginTop: 30 }}
                            />
                          )}
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => add({ status: 'off', duration: 21 })}
                        style={{ width: 'fit-content' }}
                      >
                        Add period
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Space>
                  )}
                </Form.List>
              </Space>
            </Card>
          ) : null
        }
      </Form.Item>

      <Form.Item
        label="What is your current status?"
        name="startStatus"
        rules={[
          { required: true, message: "Please select your current status" },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="duty">
              I am currently on <strong>Duty</strong> — enter when this duty
              period started
            </Radio>
            <Radio value="off">
              I am currently on <strong>Days Off</strong> — enter when this off
              period started
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.startStatus !== curr.startStatus}
      >
        {({ getFieldValue }) => {
          const status = getFieldValue("startStatus") as RotaStatus;
          return (
            <Form.Item
              label={
                status === "duty"
                  ? "Joining date: when did your current duty period start?"
                  : "Joining date: when did your current days off start?"
              }
              name="startDate"
              rules={[
                { required: true, message: "Please select a start date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%", maxWidth: 320 }}
                format="DD MMM YYYY"
                disabledDate={(current) =>
                  current && current.isAfter(dayjs(), "day")
                }
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
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className="onboarding-header">
            <img
              src="/ogdcl-logo.png"
              alt="OGDCL"
              className="onboarding-logo"
            />
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={2} style={{ margin: 0 }}>
                Duty Roster Tracker
              </Title>
              <Paragraph type="secondary">
                Enter your joining date and current status to track your schedule.
                Custom duty and off periods can be configured whenever needed.
              </Paragraph>
            </Space>
            <Paragraph type="secondary" style={{ marginTop: "-12px" }}>
              (By Ahmad Kaleem)
            </Paragraph>
          </div>

          <ProfileForm onSubmit={onComplete} />
        </Space>
      </Card>
    </div>
  );
}

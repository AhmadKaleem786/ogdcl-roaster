import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Result,
  Space,
  Statistic,
  Typography,
} from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';
import {
  formatStatusLabel,
  getRotaStatus,
} from '../../core/rota/calculator';
import type { ModuleProps, RotaDayInfo } from '../../core/types';
import { rotaColors } from '../../theme/ogdclTheme';
import './FutureDateModule.css';

const { Title, Text, Paragraph } = Typography;

interface LookupFormValues {
  targetDate: Dayjs;
}

export function FutureDateModule({ profile }: ModuleProps) {
  const [result, setResult] = useState<RotaDayInfo | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm<LookupFormValues>();

  const handleLookup = (values: LookupFormValues) => {
    const info = getRotaStatus(profile, values.targetDate);
    setSelectedDate(values.targetDate);
    setResult(info);
  };

  const isDuty = result?.status === 'duty';

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card bordered={false} className="module-card">
        <Title level={4} style={{ marginTop: 0 }}>
          Check a Future Date
        </Title>
        <Paragraph type="secondary">
          Pick any date to see whether you will be on duty or on days off, and how
          many days into that period you will be.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLookup}
          initialValues={{ targetDate: dayjs().add(1, 'month') }}
        >
          <Form.Item
            label="Select date"
            name="targetDate"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker
              style={{ width: '100%', maxWidth: 320 }}
              format="DD MMM YYYY"
              disabledDate={(current) => current && current.isBefore(dayjs(), 'day')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Look Up Date
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {result && selectedDate && (
        <Card bordered={false} className="module-card">
          <Result
            className={`future-result ${isDuty ? 'future-result--duty' : 'future-result--off'}`}
            status="info"
            title={
              <span style={{ color: isDuty ? rotaColors.duty : rotaColors.off }}>
                {isDuty ? 'On Duty' : 'On Days Off'}
              </span>
            }
            subTitle={selectedDate.format('dddd, DD MMMM YYYY')}
            extra={
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div className="future-stats">
                  <Statistic
                    title="Day in current period"
                    value={result.dayNumber}
                    suffix={`/ ${result.totalDaysInPeriod}`}
                    valueStyle={{
                      color: isDuty ? rotaColors.duty : rotaColors.off,
                    }}
                  />
                  <Statistic
                    title="Days until switch"
                    value={result.daysUntilSwitch}
                    suffix="days"
                  />
                </div>

                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Status">
                    {formatStatusLabel(result)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Period">
                    {isDuty ? '21-day Duty Block' : '21-day Off Block'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Progress">
                    {Math.round((result.dayNumber / result.totalDaysInPeriod) * 100)}%
                    complete
                  </Descriptions.Item>
                </Descriptions>

                <Text type="secondary">
                  {isDuty
                    ? `You will be on day ${result.dayNumber} of your duty rotation. ${result.daysUntilSwitch} day(s) remain before your days off begin.`
                    : `You will be on day ${result.dayNumber} of your days off. ${result.daysUntilSwitch} day(s) remain before duty starts again.`}
                </Text>
              </Space>
            }
          />
        </Card>
      )}
    </Space>
  );
}

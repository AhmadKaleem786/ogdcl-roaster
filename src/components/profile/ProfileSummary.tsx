import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Space, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  formatStatusLabel,
  getTodayStatus,
} from '../../core/rota/calculator';
import type { UserProfile } from '../../core/types';
import { rotaColors } from '../../theme/ogdclTheme';
import { ProfileForm } from '../onboarding/OnboardingScreen';

const { Text, Title } = Typography;

interface ProfileSummaryProps {
  profile: UserProfile;
  collapsed?: boolean;
  onUpdate: (profile: UserProfile) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

export function ProfileSummary({ profile, collapsed = false, onUpdate }: ProfileSummaryProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const todayInfo = getTodayStatus(profile);
  const isDuty = todayInfo.status === 'duty';

  const handleUpdate = (nextProfile: UserProfile) => {
    onUpdate(nextProfile);
    setIsEditOpen(false);
  };

  if (collapsed) {
    return (
      <>
        <Card bordered={false} className="profile-summary profile-summary--collapsed">
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
              onClick={() => setIsEditOpen(true)}
              aria-label={`Edit profile for ${profile.name}`}
            >
              {getInitials(profile.name)}
            </button>
          </Tooltip>
        </Card>

        <Modal
          title="Update Your Details"
          open={isEditOpen}
          onCancel={() => setIsEditOpen(false)}
          footer={null}
          destroyOnClose
        >
          <ProfileForm
            initialValues={profile}
            submitLabel="Update Details"
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
          />
        </Modal>
      </>
    );
  }

  return (
    <>
      <Card bordered={false} className="profile-summary">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <Title level={5} style={{ margin: 0 }} ellipsis>
                {profile.name}
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Your Rota
              </Text>
            </div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setIsEditOpen(true)}
              aria-label="Edit profile"
            />
          </Space>

          <Tag color={isDuty ? rotaColors.duty : rotaColors.off}>
            Today: {formatStatusLabel(todayInfo)}
          </Tag>

          <Text type="secondary" style={{ fontSize: 12 }}>
            {profile.startStatus === 'duty' ? 'Duty' : 'Days off'} started{' '}
            {dayjs(profile.startDate).format('DD MMM YYYY')}
          </Text>
        </Space>
      </Card>

      <Modal
        title="Update Your Details"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
        destroyOnClose
      >
        <ProfileForm
          initialValues={profile}
          submitLabel="Update Details"
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>
    </>
  );
}

import { Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import type { UserProfile } from '../../core/types';
import { appModules } from '../../modules/registry';
import { useTheme } from '../../context/ThemeContext';
import { ProfileSummary } from '../profile/ProfileSummary';
import { useLanguage } from '../../context/LanguageContext';

const { Text } = Typography;

interface SidebarContentProps {
  profile: UserProfile;
  activeModuleId: string;
  collapsed: boolean;
  onModuleSelect: (moduleId: string) => void;
  onOpenSettings: () => void;
  onNavigate?: () => void;
}

export function SidebarContent({
  profile,
  activeModuleId,
  collapsed,
  onModuleSelect,
  onOpenSettings,
  onNavigate,
}: SidebarContentProps) {
  const { mode } = useTheme();
  const { isUrdu } = useLanguage();

  const menuItems: MenuProps['items'] = appModules.map((module) => ({
    key: module.id,
    icon: module.icon,
    label: isUrdu ? ({ calendar: 'ڈیوٹی کیلنڈر', 'future-date': 'آئندہ تاریخ دیکھیں', 'roster-settings': 'روسٹر سیٹنگز' }[module.id] ?? module.title) : module.title,
  }));

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onModuleSelect(key);
    onNavigate?.();
  };

  return (
    <div className="sidebar-content">
      <div className={`app-brand ${collapsed ? 'app-brand--collapsed' : ''}`}>
        <img
          src="/ogdcl-logo.png"
          alt="OGDCL"
          className={`app-brand__logo ${collapsed ? 'app-brand__logo--collapsed' : ''}`}
        />
        {!collapsed && <Text className="app-brand__title">{isUrdu ? 'ڈیوٹی روسٹر' : 'Duty Roster'}</Text>}
      </div>

      <ProfileSummary
        profile={profile}
        collapsed={collapsed}
        onOpenSettings={onOpenSettings}
      />

      <Menu
        theme={mode === 'dark' ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[activeModuleId]}
        items={menuItems}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />
    </div>
  );
}

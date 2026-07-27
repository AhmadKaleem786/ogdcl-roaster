import { Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import type { UserProfile } from '../../core/types';
import { appModules } from '../../modules/registry';
import { useTheme } from '../../context/ThemeContext';
import { ProfileSummary } from '../profile/ProfileSummary';

const { Text } = Typography;

interface SidebarContentProps {
  profile: UserProfile;
  activeModuleId: string;
  collapsed: boolean;
  onModuleSelect: (moduleId: string) => void;
  onProfileUpdate: (profile: UserProfile) => void;
  onNavigate?: () => void;
}

export function SidebarContent({
  profile,
  activeModuleId,
  collapsed,
  onModuleSelect,
  onProfileUpdate,
  onNavigate,
}: SidebarContentProps) {
  const { mode } = useTheme();

  const menuItems: MenuProps['items'] = appModules.map((module) => ({
    key: module.id,
    icon: module.icon,
    label: module.title,
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
        {!collapsed && <Text className="app-brand__title">Duty Roster</Text>}
      </div>

      <ProfileSummary
        profile={profile}
        collapsed={collapsed}
        onUpdate={onProfileUpdate}
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

import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Grid, Layout, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import type { UserProfile } from '../../core/types';
import { appModules } from '../../modules/registry';
import { SidebarContent } from './SidebarContent';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import './AppLayout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface AppLayoutProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function AppLayout({ profile, onProfileUpdate }: AppLayoutProps) {
  const { isUrdu } = useLanguage();
  const [activeModuleId, setActiveModuleId] = useState(appModules[0]?.id ?? '');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMobileDrawerOpen(false);
    }
  }, [isMobile]);

  const activeModule = useMemo(
    () => appModules.find((module) => module.id === activeModuleId) ?? appModules[0],
    [activeModuleId],
  );

  const ModuleComponent = activeModule.component;

  const sidebarProps = {
    profile,
    activeModuleId,
    collapsed: isMobile ? false : collapsed,
    onModuleSelect: setActiveModuleId,
    onOpenSettings: () => setActiveModuleId('roster-settings'),
    onNavigate: () => setMobileDrawerOpen(false),
  };

  return (
    <Layout className="app-layout">
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="app-sider"
          width={260}
          collapsedWidth={72}
          trigger={null}
        >
          <SidebarContent {...sidebarProps} />
          <button
            type="button"
            className="sider-collapse-trigger"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </Sider>
      )}

      <Layout className="app-main">
        <Header className="app-header">
          <div className="app-header__left">
            {isMobile && (
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open menu"
              >
                <MenuOutlined />
              </button>
            )}
            <div className="app-header__titles">
              <Text className="app-header__title">{isUrdu ? ({ calendar: 'ڈیوٹی کیلنڈر', 'future-date': 'آئندہ تاریخ دیکھیں', 'roster-settings': 'روسٹر سیٹنگز' }[activeModule.id] ?? activeModule.title) : activeModule.title}</Text>
              <Text type="secondary" className="app-header__subtitle">
                {isUrdu ? ({ calendar: 'اپنے ڈیوٹی اور آف دن کیلنڈر پر دیکھیں۔', 'future-date': 'کسی بھی تاریخ کے لیے اپنی ڈیوٹی کی صورتحال دیکھیں۔', 'roster-settings': 'جوائننگ تاریخ اور روسٹر پیریڈز اپ ڈیٹ کریں۔' }[activeModule.id] ?? activeModule.description) : activeModule.description}
              </Text>
            </div>
          </div>

          <div className="app-header__actions">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </Header>

        <Content className="app-content">
          <ModuleComponent profile={profile} onProfileUpdate={onProfileUpdate} />
        </Content>
      </Layout>

      {isMobile && (
        <Drawer
          title={
            <div className="drawer-brand">
              <img src="/ogdcl-logo.png" alt="OGDCL" className="drawer-brand__logo" />
              <span>Duty Roster</span>
            </div>
          }
          placement="left"
          onClose={() => setMobileDrawerOpen(false)}
          open={mobileDrawerOpen}
          width={280}
          className="mobile-drawer"
          destroyOnClose={false}
        >
          <SidebarContent {...sidebarProps} />
        </Drawer>
      )}
    </Layout>
  );
}

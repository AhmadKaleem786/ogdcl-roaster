import { theme, type ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark';

const sharedTokens: ThemeConfig['token'] = {
  colorPrimary: '#00a884',
  colorInfo: '#1677ff',
  colorSuccess: '#00a884',
  borderRadius: 8,
  fontFamily:
    "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

export function getOgdclTheme(mode: ThemeMode): ThemeConfig {
  const isDark = mode === 'dark';

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      ...sharedTokens,
      ...(isDark
        ? {
            colorBgContainer: '#141414',
            colorBgElevated: '#1f1f1f',
          }
        : {
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
          }),
    },
    components: {
      Layout: isDark
        ? {
            siderBg: '#0a0a0a',
            headerBg: '#0a0a0a',
            bodyBg: '#000000',
          }
        : {
            siderBg: '#ffffff',
            headerBg: '#ffffff',
            bodyBg: '#f5f5f5',
          },
      Menu: isDark
        ? {
            darkItemBg: '#0a0a0a',
            darkSubMenuItemBg: '#0a0a0a',
          }
        : {},
    },
  };
}

export const rotaColors = {
  duty: '#00a884',
  off: '#1677ff',
  dutyBg: 'rgba(0, 168, 132, 0.24)',
  offBg: 'rgba(22, 119, 255, 0.24)',
};

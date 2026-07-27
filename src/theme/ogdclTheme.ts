import { theme, type ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark';

const sharedTokens: ThemeConfig['token'] = {
  colorPrimary: '#13d9b4',
  colorInfo: '#0072bc',
  colorSuccess: '#13d9b4',
  borderRadius: 8,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
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
  duty: '#13d9b4',
  off: '#0072bc',
  dutyBg: 'rgba(19, 217, 180, 0.18)',
  offBg: 'rgba(0, 114, 188, 0.22)',
};

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
      <Button
        type="text"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className="theme-toggle"
      />
    </Tooltip>
  );
}

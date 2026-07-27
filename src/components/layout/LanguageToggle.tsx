import { Button, Tooltip } from 'antd';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isUrdu = language === 'ur';
  const label = isUrdu ? 'Switch to English' : 'اردو میں تبدیل کریں';

  return (
    <Tooltip title={label}>
      <Button type="text" onClick={toggleLanguage} className="language-toggle" aria-label={label}>
        {isUrdu ? 'EN' : 'اردو'}
      </Button>
    </Tooltip>
  );
}

import { Spin } from 'antd';
import { AppLayout } from './components/layout/AppLayout';
import { ThemeToggle } from './components/layout/ThemeToggle';
import { LanguageToggle } from './components/layout/LanguageToggle';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { useUserProfile } from './hooks/useUserProfile';
import './App.css';
import { trackScreen } from './core/analytics/googleAnalytics';
import { useEffect } from 'react';

function App() {
  const { profile, isReady, updateProfile } = useUserProfile();

  useEffect(() => {
    if (isReady && !profile) trackScreen('onboarding');
  }, [isReady, profile]);

  if (!isReady) {
    return (
      <div className="app-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="onboarding-screen-wrap">
        <div className="onboarding-theme-toggle">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <OnboardingScreen onComplete={updateProfile} />
      </div>
    );
  }

  return <AppLayout profile={profile} onProfileUpdate={updateProfile} />;
}

export default App;

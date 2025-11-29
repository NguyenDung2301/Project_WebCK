import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { PrivacyPage } from './PrivacyPage';
import { TermsPage } from './TermsPage';

type ViewState = 'home' | 'admin' | 'login' | 'register' | 'forgot-password' | 'privacy' | 'terms';

export default function App() {
  // Use a history stack to manage navigation
  // TIP: Change 'admin' back to 'home' when you want to start from the Landing Page
  const [history, setHistory] = useState<ViewState[]>(['home']);
  
  // The current view is the last item in the history stack
  const view = history[history.length - 1];

  // Navigate to a new view (push to stack)
  const navigate = (newView: ViewState) => {
    setHistory(prev => [...prev, newView]);
  };

  // Go back to previous view (pop from stack)
  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    } else {
      // If nothing in history, go home
      setHistory(['home']);
    }
  };

  // Reset navigation to home (clear stack)
  const goHome = () => {
    setHistory(['home']);
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      {view === 'home' && (
        <HomePage 
          onLogin={() => navigate('login')} 
          onRegister={() => navigate('register')}
          onPrivacy={() => navigate('privacy')}
          onTerms={() => navigate('terms')}
        />
      )}
      
      {view === 'admin' && (
        <AdminDashboard onLogout={goHome} />
      )}

      {view === 'login' && (
        <LoginPage 
          onLoginSuccess={() => navigate('admin')}
          onRegister={() => navigate('register')}
          onForgotPassword={() => navigate('forgot-password')}
          onBack={goBack}
          onHome={goHome}
        />
      )}

      {view === 'register' && (
        <RegisterPage 
          onLogin={() => navigate('login')}
          onRegisterSuccess={() => navigate('login')}
          onTerms={() => navigate('terms')}
          onPrivacy={() => navigate('privacy')}
          onHome={goHome}
          onBack={goBack}
        />
      )}

      {view === 'forgot-password' && (
        <ForgotPasswordPage 
          onBackToLogin={goBack}
          onRegister={() => navigate('register')}
          onHome={goHome}
        />
      )}

      {view === 'privacy' && (
        <PrivacyPage 
          onBack={goBack} 
          onHome={goHome}
        />
      )}

      {view === 'terms' && (
        <TermsPage 
          onBack={goBack} 
          onHome={goHome}
        />
      )}
    </>
  );
}
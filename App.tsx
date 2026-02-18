
import React, { useState, useEffect, useCallback } from 'react';
import { User, Role, View } from './types';
import { getCurrentUser, logout } from './services/authService';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import BillingPage from './components/settings/BillingPage';
import Header from './components/core/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>(View.LOGIN);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if(user){
      if(user.role === Role.SUPERADMIN) {
        setView(View.ADMIN_DASHBOARD);
      } else {
        setView(View.USER_DASHBOARD);
      }
    } else {
      setView(View.LOGIN);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, [refreshUser]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setView(View.LOGIN);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-primary">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
        </div>
      );
    }

    if (!currentUser) {
      switch (view) {
        case View.LOGIN:
          return <LoginPage onLoginSuccess={refreshUser} onNavigate={() => setView(View.REGISTER)} />;
        case View.REGISTER:
          return <RegisterPage onRegisterSuccess={refreshUser} onNavigate={() => setView(View.LOGIN)} />;
        default:
          return <LoginPage onLoginSuccess={refreshUser} onNavigate={() => setView(View.REGISTER)} />;
      }
    }

    switch (view) {
      case View.USER_DASHBOARD:
        return <UserDashboard user={currentUser} onUserUpdate={refreshUser} />;
      case View.ADMIN_DASHBOARD:
        return <AdminDashboard />;
      case View.BILLING:
        return <BillingPage onCreditsUpdated={refreshUser} />;
      default:
        return <UserDashboard user={currentUser} onUserUpdate={refreshUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {currentUser && <Header user={currentUser} onLogout={handleLogout} setView={setView} />}
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

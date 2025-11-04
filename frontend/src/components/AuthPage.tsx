// AuthPage.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Login from '../pages/Login';
import Register from '../pages/Register';

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const router = useRouter();

  // Cambia entre login y registro
  const handleSwitch = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  // Llamado cuando el usuario inicia sesión correctamente
  const handleLogin = (userData: any) => {
    onLogin(userData);
  };

  // Llamado cuando el usuario se registra correctamente
  const handleRegister = (newUser: any) => {
    console.log('Usuario registrado:', newUser);
    setAuthMode('login'); // después de registrar → mostrar login
  };

  // Volver al inicio con navegación real
  const handleBackHome = () => {
    router.push('/'); // navega a la página principal con Layout
  };

  return (
    <>
      {authMode === 'login' && (
        <Login onLogin={handleLogin} onSwitch={handleSwitch} onBackHome={handleBackHome} />
      )}
      {authMode === 'register' && (
        <Register onRegister={handleRegister} onSwitch={handleSwitch} onBackHome={handleBackHome} />
      )}
    </>
  );
};

export default AuthPage;


//dfdsfgsdfswdfs 10:48am


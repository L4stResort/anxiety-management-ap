// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AuthPage from '../components/AuthPage';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Guardar usuario en localStorage cada vez que cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Confirmación al retroceder solo si el usuario está logueado
  useEffect(() => {
    if (!user) return;

    router.beforePopState(({ url }) => {
      const confirmExit = window.confirm('¿Desea cerrar sesión?');
      if (confirmExit) {
        setUser(null);
        setShowAuth(false);
        router.push('/'); // Redirige a Home
        return true;
      }
      return false;
    });

    return () => router.beforePopState(() => true);
  }, [user, router]);

  // Logout
  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
    router.push('/');
  };

  // Mostrar AuthPage
  const handleStartLogin = () => {
    setShowAuth(true);
  };

  // Renderizar AuthPage como overlay
  if (!user && showAuth) {
    return (
      <AuthPage
        onLogin={(userData) => {
          setUser(userData);
          setShowAuth(false);
          router.push('/Test'); // Redirige a TestPage tras login
        }}
      />
    );
  }

  return (
    <Layout onLoginClick={handleStartLogin} user={user}>
      {/* Siempre renderizamos la página actual */}
      <Component {...pageProps} user={user} onLogout={handleLogout} />
    </Layout>
  );
};

export default MyApp;










//version mejorada con localstorage 2-11-2025  7:24am


/* antigua version sin localstorage  7:00am

// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AuthPage from '../components/AuthPage';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();

  // Confirmación al retroceder solo si el usuario está logueado
  useEffect(() => {
    if (!user) return;

    router.beforePopState(({ url }) => {
      const confirmExit = window.confirm('¿Desea cerrar sesión?');
      if (confirmExit) {
        setUser(null);
        setShowAuth(false);
        router.push('/'); // Redirige a Home
        return true;
      }
      return false;
    });

    return () => router.beforePopState(() => true);
  }, [user, router]);

  // Logout
  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
    router.push('/');
  };

  // Mostrar AuthPage
  const handleStartLogin = () => {
    setShowAuth(true);
  };

  // Renderizar AuthPage como overlay
  if (!user && showAuth) {
    return (
      <AuthPage
        onLogin={(userData) => {
          setUser(userData);
          setShowAuth(false);
          router.push('/Test'); // Redirige a TestPage tras login
        }}
      />
    );
  }

  return (
    <Layout onLoginClick={handleStartLogin} user={user}>
      
      <Component {...pageProps} user={user} onLogout={handleLogout} />
    </Layout>
  );
};

export default MyApp;

*/
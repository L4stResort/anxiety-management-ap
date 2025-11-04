import React, { useState } from 'react';
import { loginUser } from '../services/api';
import styles from '../styles/login.module.css';
import { Brain, Heart, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: any) => void;
  onSwitch: () => void;
  onBackHome: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitch, onBackHome }) => {
  const [loginField, setLoginField] = useState<'username' | 'email'>('username');
  const [form, setForm] = useState({ loginValue: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const loggedUser = await loginUser({
        loginValue: form.loginValue,
        password: form.password
      });

      const userData = {
        _id: loggedUser.user._id,
        username: loggedUser.user.username,
        email: loggedUser.user.email
      };

      onLogin(userData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const features = [
    { icon: Brain, title: 'Contenido Experto', description: 'Recursos desarrollados por profesionales de la salud mental' },
    { icon: Heart, title: 'Apoyo Personalizado', description: 'Herramientas adaptadas a tus necesidades específicas' },
    { icon: Shield, title: '100% Seguro', description: 'Tu información está protegida con encriptación avanzada' },
  ];

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        {/* CUADRO IZQUIERDO */}
        <div className={styles.loginLeft}>
          <div className={styles.leftBox}>
            <div className={styles.logoBox}>
              <div className={styles.iconCircle}>
                <Brain className={styles.icon} />
              </div>
              <div>
                <h1 className={styles.leftTitle}>Mindup</h1>
                <p className={styles.leftSubtitle}>Tu bienestar mental es nuestra prioridad</p>
              </div>
            </div>

            <h2 className={styles.leftHeading}>Bienvenido a Mindup</h2>
            <p className={styles.leftText}>
              Accede a tu cuenta para continuar tu viaje hacia el bienestar mental y emocional.
            </p>

            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <feature.icon className={styles.featureIconSvg} />
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORMULARIO DERECHO */}
        <div className={styles.loginRight}>
          {/* BOTÓN VOLVER AL INICIO */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => {
                window.location.href = '/'; // fuerza recarga de la raíz
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#0078be',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: 0
              }}
            >
              &larr; Volver al inicio
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
            <div className={styles.loginSwitch}>
              <button
                type="button"
                onClick={() => setLoginField('username')}
                className={loginField === 'username' ? styles.activeBtn : styles.switchBtn}
              >
                Usuario
              </button>
              <button
                type="button"
                onClick={() => setLoginField('email')}
                className={loginField === 'email' ? styles.activeBtn : styles.switchBtn}
              >
                Email
              </button>
            </div>

            <input
              type={loginField === 'email' ? 'email' : 'text'}
              placeholder={loginField === 'email' ? 'Email' : 'Usuario'}
              value={form.loginValue}
              onChange={e => setForm({ ...form, loginValue: e.target.value })}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              className={styles.input}
            />

            <button type="submit" className={styles.submitBtn}>Entrar</button>
          </form>

          <button onClick={onSwitch} className={styles.toggleBtn}>
            ¿No tienes cuenta? Regístrate
          </button>

          {error && <div className={styles.errorMsg}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;



// 10:51am
//fdsfsdfsfwerw234

//ddddd

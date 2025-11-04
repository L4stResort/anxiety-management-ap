import React, { useState } from 'react';
import { registerUser } from '../services/api';
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import { Brain, Heart, Shield } from 'lucide-react';

interface RegisterProps {
  onRegister: (userData: any) => void;
  onSwitch: () => void;
  onBackHome: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitch,onBackHome  }) => {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const newUser = await registerUser(form);
      onRegister(newUser);
      onSwitch(); // volver a login después de registrar
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

            <h2 className={styles.leftHeading}>Únete a Mindup</h2>
            <p className={styles.leftText}>
              Crea tu cuenta gratuita y obtén acceso inmediato a recursos para manejar la ansiedad y el estrés.
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

          <div className={styles.rightFormBox}>
            <h1 className={styles.loginTitle}>Registrarse</h1>

            <form onSubmit={handleRegisterSubmit} className={styles.loginForm}>
              <input
                type="text"
                placeholder="Usuario"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
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
              <button type="submit" className={styles.submitBtn}>Registrarse</button>
            </form>

            <button onClick={onSwitch} className={styles.toggleBtn}>
              ¿Ya tienes cuenta? Inicia sesión
            </button>

            {error && <div className={styles.errorMsg}>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


//fdfgdf000000000000
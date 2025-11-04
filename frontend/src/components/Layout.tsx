// components/Layout.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  onLoginClick?: () => void;
  user?: any; // usuario recibido desde _app.tsx
}

const Layout: React.FC<LayoutProps> = ({ children, onLoginClick, user }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Recursos", href: "/Resources" },
    { name: "Productos", href: "/Products" },
    { name: "Acerca de", href: "/About" },
    { name: "Contacto", href: "/Contact" },
  ];

  const navigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false); // cerrar menú al hacer clic
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <motion.header
        className={styles.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            {/* LOGO */}
            <motion.div
              className={styles.logoContainer}
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.logoIcon}>
                <Brain className={styles.brainIcon} />
              </div>
              <span className={styles.logoText}>MindUp</span>
            </motion.div>

            {/* MENÚ ESCRITORIO */}
            <div className={styles.desktopMenu}>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={styles.navItem}
                >
                  {item.name}
                </button>
              ))}
              {/* PESTAÑA CARRITO */}
              {user && (
                <button
                  onClick={() => navigate("/Carts")}
                  className={styles.navItem}
                >
                  Carrito
                </button>
              )}
            </div>

            {/* BOTÓN LOGIN o HOLA [NOMBRE] */}
            <div className={styles.loginContainer}>
              {!user ? (
                <button
                  onClick={() => onLoginClick && onLoginClick()}
                  className={styles.loginButton}
                >
                  Iniciar Sesión
                </button>
              ) : (
                <button
                  onClick={() => navigate("/Test")}
                  className={styles.userButton}
                >
                  Hola, {user.username || "Usuario"}
                </button>
              )}
            </div>

            {/* BOTÓN MÓVIL */}
            <motion.button
              className={styles.mobileButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={styles.icon} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={styles.icon} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* MENÚ DESPLEGABLE MÓVIL */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className={styles.mobileMenu}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={styles.mobileNavItem}
                  >
                    {item.name}
                  </button>
                ))}

                {/* PESTAÑA CARRITO MÓVIL */}
                {user && (
                  <button
                    onClick={() => {
                      navigate("/Carts");
                      setMobileMenuOpen(false);
                    }}
                    className={styles.mobileNavItem}
                  >
                    Carrito
                  </button>
                )}

                {/* Muestra "Iniciar sesión" o "Hola, nombre" también en móvil */}
                {!user ? (
                  <button
                    onClick={() => {
                      onLoginClick && onLoginClick();
                      setMobileMenuOpen(false);
                    }}
                    className={styles.mobileLoginButton}
                  >
                    Iniciar Sesión
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/Test");
                      setMobileMenuOpen(false);
                    }}
                    className={styles.mobileUserButton}
                  >
                    Hola, {user.username || "Usuario"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Contenido principal */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;




// 12:38pm domingo 2 -11-2025 ultima actualización
//6:41am domingo 2-11-2025
//1:39am

//layout sin modificar
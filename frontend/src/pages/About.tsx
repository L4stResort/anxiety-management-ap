// pages/About.tsx
import React from "react";

import styles from "../styles/about.module.css";
import { motion } from "framer-motion";
import { Heart, Users, Lightbulb } from "lucide-react";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    
      <section className={styles.aboutSection}>
        <motion.div
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
            Sobre <span className={styles.highlight}>MindUp</span>
          </motion.h1>

          <motion.p className={styles.description} variants={itemVariants}>
            En MindUp creemos que el bienestar emocional es fundamental para una vida plena.
            Nuestra plataforma combina recursos psicológicos, herramientas interactivas y el
            acompañamiento de profesionales para ayudarte a manejar la ansiedad y el estrés.
          </motion.p>

          <motion.div className={styles.features} variants={itemVariants}>
            <div className={styles.featureCard}>
              <Heart className={styles.icon} />
              <h3>Bienestar emocional</h3>
              <p>Promovemos hábitos mentales saludables a través de la educación emocional.</p>
            </div>

            <div className={styles.featureCard}>
              <Users className={styles.icon} />
              <h3>Comunidad</h3>
              <p>Conecta con otras personas que comparten tus experiencias y desafíos.</p>
            </div>

            <div className={styles.featureCard}>
              <Lightbulb className={styles.icon} />
              <h3>Aprendizaje constante</h3>
              <p>Recursos y ejercicios actualizados para mejorar tu salud mental cada día.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    
  );
};

export default About;

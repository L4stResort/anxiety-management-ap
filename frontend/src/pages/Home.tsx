// pages/Home.tsx
import React from "react";

import styles from "../styles/home.module.css";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    
      
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className={styles.badge} variants={itemVariants}>
              <Sparkles className={styles.badgeIcon} />
              <span>Tu bienestar mental es nuestra prioridad</span>
            </motion.div>

            <motion.h1 className={styles.heroTitle} variants={itemVariants}>
              Encuentra la{" "}
              <span className={styles.highlight}>calma interior</span> y transforma tu vida
            </motion.h1>

            <motion.p className={styles.heroText} variants={itemVariants}>
              Aprende a manejar la ansiedad y el estrés con recursos profesionales,
              ejercicios prácticos y apoyo emocional cuando más lo necesites.
            </motion.p>

            <motion.div className={styles.heroButtons} variants={itemVariants}>
              <button
                onClick={() => router.push("/Resources")}
                className={styles.primaryButton}
              >
                <span>Explorar Recursos</span>
                <ArrowRight className={styles.buttonIcon} />
              </button>

              <button
                onClick={() => router.push("/About")}
                className={styles.secondaryButton}
              >
                <span>Conocer Más</span>
                <ChevronRight className={styles.buttonIcon} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    
  );
};

export default Home;






//v555555555555555555555555555555555

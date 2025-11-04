// pages/Contact.tsx
import React, { useState } from "react";

import styles from "../styles/contact.module.css";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    
      <section className={styles.contactSection}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            <MessageSquare className={styles.icon} /> Contáctanos
          </h1>

          <p className={styles.subtitle}>
            Si tienes alguna consulta o deseas colaborar con nosotros, completa el siguiente
            formulario y te responderemos pronto.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <textarea
              name="message"
              placeholder="Escribe tu mensaje..."
              value={form.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitBtn}>
              <Send className={styles.btnIcon} /> Enviar mensaje
            </button>
          </form>

          {submitted && <p className={styles.successMsg}>¡Mensaje enviado con éxito!</p>}

          <div className={styles.contactInfo}>
            <Mail className={styles.mailIcon} />
            <span>contacto@mindup.com</span>
          </div>
        </motion.div>
      </section>
    
  );
};

export default Contact;

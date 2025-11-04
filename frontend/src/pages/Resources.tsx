import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Play,
  BookOpen,
  ChevronRight,
  Heart,
  Sparkles,
  X
} from 'lucide-react';
import styles from '../styles/resources.module.css';


const Resources: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const resources = [
    {
      id: 1,
      title: 'Entendiendo la Ansiedad',
      description: 'Aprende sobre las causas...',
      type: 'article',
      category: 'Ansiedad',
      readTime: '8 min',
      author: 'Dra. María González'
    },
    {
      id: 2,
      title: 'Ejercicios de Respiración',
      description: 'Técnicas de respiración guiadas...',
      type: 'video',
      category: 'Relajación',
      duration: '12 min',
      instructor: 'Lic. Ana Martínez'
    },
    {
      id: 3,
      title: 'Mindfulness para Principiantes',
      description: 'Introducción paso a paso...',
      type: 'article',
      category: 'Mindfulness',
      readTime: '10 min',
      author: 'Dr. Carlos Rodríguez'
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'all' || r.category === selectedCategory;
      const matchType = selectedType === 'all' || r.type === selectedType;
      return matchSearch && matchCat && matchType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    
      <div className={styles.pageContainer}>
        {/* === HERO === */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.heroContent}
          >
            <button onClick={() => router.push('/')} className={styles.backBtn}>
              <ArrowLeft size={16} /> Volver al inicio
            </button>

            <div className={styles.heroTitle}>
              <Sparkles size={20} />
              <h2>Recursos para tu bienestar mental</h2>
            </div>

            <p className={styles.heroDesc}>
              Explora artículos y videos diseñados para ayudarte a manejar la ansiedad y mejorar tu salud mental.
            </p>

            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <button className={styles.filterBtn} onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} /> Filtros
              {(selectedCategory !== 'all' || selectedType !== 'all') && (
                <span className={styles.filterActive}>Activos</span>
              )}
            </button>
          </motion.div>
        </section>

        {/* === FILTROS === */}
        {showFilters && (
          <div className={styles.filterPanel}>
            <div className={styles.filterGroup}>
              <label>Categoría:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.selectBox}
              >
                <option value="all">Todas</option>
                <option value="Ansiedad">Ansiedad</option>
                <option value="Relajación">Relajación</option>
                <option value="Mindfulness">Mindfulness</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Tipo:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.selectBox}
              >
                <option value="all">Todos</option>
                <option value="article">Artículos</option>
                <option value="video">Videos</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedType('all');
                setSearchTerm('');
              }}
              className={styles.clearBtn}
            >
              <X size={14} /> Limpiar
            </button>
          </div>
        )}

        {/* === LISTA DE RECURSOS === */}
        <section className={styles.resourcesList}>
          {filteredResources.map((r) => (
            <motion.div key={r.id} className={styles.card} whileHover={{ scale: 1.02 }}>
              <div className={styles.cardIcon}>
                {r.type === 'video' ? <Play size={20} /> : <BookOpen size={20} />}
              </div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <span className={styles.meta}>
                  {r.category} • {r.type === 'video' ? r.duration : r.readTime}
                </span>
              </div>
              <ChevronRight className={styles.arrow} />
            </motion.div>
          ))}
        </section>

        {/* === CTA FINAL === */}
        <section className={styles.ctaSection}>
          <Heart size={32} />
          <h2>¿Necesitas apoyo personalizado?</h2>
          <p>
            Únete a nuestra comunidad para acceder a recursos exclusivos y apoyo profesional.
          </p>
          <div className={styles.ctaBtns}>
            <button onClick={() => router.push('/login')} className={styles.primaryBtn}>
              Crear Cuenta
            </button>
            <button onClick={() => router.push('/Contact')} className={styles.secondaryBtn}>
              Contactar
            </button>
          </div>
        </section>
      </div>
    
  );
};

export default Resources;



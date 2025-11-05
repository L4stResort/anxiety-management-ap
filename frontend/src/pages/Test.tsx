import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AnxietyTips from '../components/AnxietyTips';
import styles from '../styles/test.module.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface TestPageProps {
  user: {
    _id: string;
    username: string;
    email: string;
  };
  onLogout: () => void;
}

const gad7Questions = [
  "1. Sentirse nervioso, ansioso o al borde.",
  "2. No ser capaz de dejar de preocuparse o controlar la preocupación.",
  "3. Preocuparse demasiado por diferentes cosas.",
  "4. Tener dificultad para relajarse.",
  "5. Estar tan inquieto que es difícil permanecer quieto.",
  "6. Irritarse o enojarse fácilmente.",
  "7. Sentir miedo como si algo terrible pudiera pasar."
];

const responseOptions = [
  { value: 0, label: "Nunca (0)" },
  { value: 1, label: "Varios días (1)" },
  { value: 2, label: "Más de la mitad de los días (2)" },
  { value: 3, label: "Casi todos los días (3)" }
];

const TestPage: React.FC<TestPageProps> = ({ user, onLogout }) => {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [responses, setResponses] = useState<number[]>(Array(gad7Questions.length).fill(-1));
  const [results, setResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState<boolean>(true);

  useEffect(() => {
    if (!user?._id) return;
    const fetchResults = async () => {
      try {
        //const res = await fetch(`http://localhost:5000/api/users/${user._id}`);
        const res = await fetch(`https://104448d8-d9fb-4d59-8d73-1b73546c0858-00-x58pe8pm1m1p.kirk.replit.dev/api/users/${user._id}`);
        if (!res.ok) throw new Error('Error al obtener resultados');
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error cargando resultados:', error);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchResults();
  }, [user]);

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleTestSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (responses.includes(-1)) {
      alert("Por favor responde todas las preguntas antes de enviar.");
      return;
    }

    const totalScore = responses.reduce((acc, curr) => acc + curr, 0);
    setScore(totalScore);
  };

  const getAnxietyLevel = (score: number) => {
    if (score <= 4) return "Mínima";
    if (score <= 9) return "Leve";
    if (score <= 14) return "Moderada";
    return "Severa";
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  if (!user) return null;

  const chartData = results.map((r, index) => ({
    name: `Test ${index + 1}`,
    Puntaje: r.gad7Score,
  }));

  return (
    <div className={styles.testContainer}>
      {/* Sidebar izquierda */}
      <aside className={styles.sidebar}>
        <h3>Bienvenido, {user.username}</h3>
        <p>Email: {user.email}</p>
        <button onClick={handleLogoutClick} className={styles.logoutBtn}>
          Cerrar sesión
        </button>
      </aside>

      {/* Contenedor vertical para test y grafico */}
      <div className={styles.contentWrapper}>

        {/* Test GAD-7 */}
        <main className={styles.testMain}>
          <h1 className={styles.testTitle}>Evaluación de Ansiedad (GAD-7)</h1>

          <form onSubmit={handleTestSubmit} className={styles.testForm}>
            {gad7Questions.map((question, index) => (
              <div key={index} className={styles.questionBlock}>
                <p>{question}</p>
                {responseOptions.map(option => (
                  <label key={option.value} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={option.value}
                      onChange={() => handleChange(index, option.value)}
                      required
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit" className={styles.submitBtn}>Enviar</button>
          </form>

          {score !== null && (
            <div className={styles.resultBox}>
              <h3>Tu puntaje: {score} ({getAnxietyLevel(score)})</h3>
              <AnxietyTips userScore={score} userId={user._id} />
            </div>
          )}
        </main>


        {/* Historial de resultados */}
        <aside className={styles.chartBox}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Historial de Resultados</h3>
          {loadingResults ? (
            <p>Cargando...</p>
          ) : results.length === 0 ? (
            <p>No hay resultados previos.</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Puntaje" fill="#1e88e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </aside>


      </div>
    </div>
  );
};

export default TestPage;







//5:07 am




// 2:06am 
//fdsfsdf1111111111111111

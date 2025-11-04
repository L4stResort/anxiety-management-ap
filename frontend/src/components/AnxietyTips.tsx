import React, { useEffect, useState } from "react";

interface AnxietyTipsProps {
  userScore: number;
  userId: string;
}

const AnxietyTips: React.FC<AnxietyTipsProps> = ({ userScore,userId }) => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTips = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/recommendations", {
        //const response = await fetch("https://minduback.loca.lt/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: userScore, userId }),
        });

        const data = await response.json();
        setTips(data.recommendations || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setTips(["No se pudieron cargar recomendaciones en este momento."]);
      } finally {
        setLoading(false);
      }
    };

    if (userScore !== null) {
      fetchTips();
    }
  }, [userScore, userId]);

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Recomendaciones Personalizadas
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando recomendaciones...</p>
      ) : (
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md shadow-sm hover:bg-blue-100 transition duration-200"
            >
              <span className="font-medium text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnxietyTips;

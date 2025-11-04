// src/pages/Products.tsx
import React from "react";
import styles from "../styles/products.module.css";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  priceSoles: number;
  imageUrl: string;
}

interface ProductsPageProps {
  user: any; // usuario logeado
}

const products: Product[] = [
  {
    id: 1,
    name: "Kit Antiestrés MindUp",
    description:
      "Incluye pelota antiestrés, aceite esencial de lavanda, guía de respiración y diario de calma.",
    priceSoles: 79.9,
    imageUrl: "/images/kit-antiestres.jpg",
  },
  {
    id: 2,
    name: "Pack Relajación Profunda",
    description:
      "Velas aromáticas, máscara de ojos para dormir, infusión relajante y guía de meditación.",
    priceSoles: 119.9,
    imageUrl: "/images/pack-relajacion.jpeg",
  },
  {
    id: 3,
    name: "Wearable Wellness Tracker",
    description:
      "Pulsera inteligente que monitorea estrés, sueño y actividad física. Compatible con iOS y Android.",
    priceSoles: 109.5,
    imageUrl: "/images/wearable-tracker.jpg",
  },
  {
    id: 4,
    name: "Pelota Relajante Premium",
    description:
      "Pelota antiestrés ergonómica con textura suave y aroma relajante. Ideal para aliviar ansiedad en minutos.",
    priceSoles: 29.9,
    imageUrl: "/images/pelota-antiestres.jpg",
  },
  {
    id: 5,
    name: "Reloj Calm Tracker",
    description:
      "Reloj inteligente con sensor de ritmo cardíaco, alertas de respiración y monitoreo del nivel de estrés diario.",
    priceSoles: 89.9,
    imageUrl: "/images/reloj-calm-tracker.png",
  },
  {
    id: 6,
    name: "Guía Digital de Relajación y Mindfulness",
    description:
      "Guía interactiva en formato PDF con ejercicios prácticos de respiración, meditación y hábitos saludables.",
    priceSoles: 39.9,
    imageUrl: "/images/guia-mindfulness.jpg",
  },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ user }) => {

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/carts/${user._id}/add`, {
        productId: product.id,
        name: product.name,
        priceSoles: product.priceSoles,
      });
      alert(`"${product.name}" añadido al carrito`);
    } catch (err) {
      console.error("Error al añadir al carrito:", err);
      alert("No se pudo añadir el producto al carrito");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestros Productos</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
            />
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>S/ {product.priceSoles.toFixed(2)}</p>
            <button
              className={styles.button}
              onClick={() => handleAddToCart(product)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;



//version sin carrito aun
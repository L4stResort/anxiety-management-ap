// src/pages/Carts.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/carts.module.css";
import axios from "axios";

interface CartItem {
  productId: number;
  name: string;
  priceSoles: number;
  quantity: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
}

interface CartsPageProps {
  user: {
    _id: string;
    username: string;
  } | null;
}

const CartsPage: React.FC<CartsPageProps> = ({ user }) => {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [user, router]);

  // Obtener carrito desde backend
  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/carts/${user._id}`);
      setCart(res.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setCart({ userId: user._id, items: [] });
      } else {
        setError("Error al obtener el carrito");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Eliminar producto del carrito
  const handleRemove = async (productId: number) => {
    if (!user) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/carts/${user._id}/remove/${productId}`
      );
      setCart(res.data);
    } catch {
      setError("Error al eliminar producto");
    }
  };

  // Comprar productos (simulación)
  const handleBuy = async () => {
    if (!user) return;
    try {
      await axios.delete(`http://localhost:5000/api/carts/${user._id}/clear`);
      alert("Compra realizada con éxito!");
      setCart({ userId: user._id, items: [] });
      router.push("/");
    } catch {
      setError("Error al procesar la compra");
    }
  };

  if (!user) return null;
  //if (loading) return <p className={styles.textCenter}>Cargando carrito...</p>;
  if (loading) return <p className={styles.textCenter}> </p>;
  if (error) return <p className={styles.textCenter}>{error}</p>;

  const total = cart?.items.reduce(
    (sum, item) => sum + item.priceSoles * (item.quantity || 1),
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi Carrito</h1>
      {cart?.items.length === 0 ? (
        <p className={styles.textCenter}>Tu carrito está vacío</p>
      ) : (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio (S/)</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>{item.priceSoles.toFixed(2)}</td>
                  <td>{item.quantity || 1}</td>
                  <td>{(item.priceSoles * (item.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.productId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className={styles.total}>Total: S/ {total?.toFixed(2)}</h2>
          <button className={styles.buyBtn} onClick={handleBuy}>
            Comprar productos
          </button>
        </>
      )}
    </div>
  );
};

export default CartsPage;



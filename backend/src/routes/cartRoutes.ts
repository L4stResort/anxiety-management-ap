// routes/cartRoutes.ts
import express from 'express';
import Cart from '../models/cartModel';

const router = express.Router();

// Obtener carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito vacío' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: err });
  }
});

// Añadir producto al carrito
router.post('/:userId/add', async (req, res) => {
  const { productId, name, priceSoles, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, priceSoles, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error al añadir producto', error: err });
  }
});

// Eliminar producto del carrito
router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito vacío' });

    cart.items = cart.items.filter(item => item.productId !== Number(req.params.productId));
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err });
  }
});

// Vaciar carrito (después de comprar)
router.delete('/:userId/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Carrito vacío' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Carrito vacío' });
  } catch (err) {
    res.status(500).json({ message: 'Error al vaciar carrito', error: err });
  }
});

export default router;

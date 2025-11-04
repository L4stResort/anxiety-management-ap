// models/cartModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  productId: number;
  name: string;
  priceSoles: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  priceSoles: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true, unique: true },
  items: { type: [CartItemSchema], default: [] },
});

export default mongoose.model<ICart>('Cart', CartSchema);

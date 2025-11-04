import mongoose, { Document, Schema } from 'mongoose';

export interface ITestResult {
  gad7Score: number;
  anxietyLevel: string;
  createdAt: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  results: ITestResult[]; // historial de tests
  createdAt: Date;
  updatedAt: Date;
}

const TestResultSchema = new Schema<ITestResult>({
  gad7Score: { type: Number, required: true },
  anxietyLevel: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    results: [TestResultSchema] // array de resultados
  },
  { timestamps: true } // añade createdAt y updatedAt al user
);

export const User = mongoose.model<IUser>('User', UserSchema);

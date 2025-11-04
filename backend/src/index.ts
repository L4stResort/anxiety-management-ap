import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import cors from 'cors'; // <--- Agrega esta línea
import recommendationRoutes from './routes/recommendationRoutes';
import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
app.use(cors()); // <--- Y esta línea
/*app.use(cors({
  origin: [
    'http://localhost:3000',      // tu frontend local
    'https://mindup.loca.lt'      // túnel público LocalTunnel
  ],
  credentials: true,              // si usas cookies o auth headers
}));*/



//middleware para parsear JSON
app.use(express.json());

//puerto
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

// Ruta de prueba
app.get('/', (_req, res) => {
    res.send('MindUp backend funcionando');
});

//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use('/api/users', userRoutes);

app.use('/api/recommendations', recommendationRoutes);

app.use('/api/carts', cartRoutes);


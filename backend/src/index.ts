import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import cartRoutes from './routes/cartRoutes';

const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Puerto asignado por Render
const PORT = Number(process.env.PORT) || 5000;

// Construir URI de MongoDB usando variables de entorno de Render
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDB = process.env.MONGO_DB;

// Validar que todas las variables existan
if (!mongoUser || !mongoPass || !mongoCluster || !mongoDB) {
    console.error("Faltan variables de entorno para MongoDB");
    process.exit(1);
}

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}/${mongoDB}?retryWrites=true&w=majority&appName=Cluster2025`;

// Conexión a MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

// Ruta de prueba
app.get('/', (_req, res) => {
    res.send('MindUp backend funcionando');
});

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/carts', cartRoutes);

// Servidor escuchando
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


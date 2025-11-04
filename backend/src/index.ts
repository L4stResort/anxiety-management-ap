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

// Construir la URI de MongoDB a partir de variables separadas
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

//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use('/api/users', userRoutes);

app.use('/api/recommendations', recommendationRoutes);

app.use('/api/carts', cartRoutes);

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' }; 
import userRoutes from './routes/userRoutes';  
import productRoutes from './routes/productRoutes';  
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => res.send('API running'));
console.log("index.jas loaded");
app.use('/users', userRoutes);
app.use('/users', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose
  .connect('mongodb://localhost:27017/hackathon_ecom')
  .then(() => {
    console.log('MongoDB connected..');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

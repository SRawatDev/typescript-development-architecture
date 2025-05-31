import express from 'express';
import userRoutes from './routes/user.routes'; // ✅ Import router, not controller
const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
export default app;

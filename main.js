import express from 'express';
import { connectDB } from './database/mongo.database.js';
import authRoutes from './routes/auth_routes.js';
import documentsRoutes from './routes/documents_route.js';

const app = express();

app.use(express.json({ limit: '50mb'}));

connectDB();

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes)

const PORT = process.env.PORT || 7878;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
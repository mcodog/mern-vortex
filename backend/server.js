import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.js';
import categoryRoute from './routes/category.route.js'
import specRoute from './routes/specialization.route.js'
import UserRoute from './routes/user.route.js'
import instructorRoute from './routes/instructor.route.js'
import courseRoute from './routes/course.route.js'
import expertiseRoute from './routes/expertise.route.js'

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api/category', categoryRoute);
app.use('/api/specialization', specRoute);
app.use('/api/user', UserRoute);
app.use('/api/instructor', instructorRoute);
app.use('/api/course', courseRoute);
app.use('/api/expertise', expertiseRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running. Connected to port: ${process.env.PORT}`);
    console.log(`Attempting to connect to database: ${process.env.MONGODB_URI}`)
    connectDB(process.env.MONGODB_URI);
})
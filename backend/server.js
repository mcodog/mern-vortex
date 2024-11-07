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

import cloudinary from 'cloudinary'
import Multer from 'multer'

const app = express();
app.use(express.json({limit:'50mb'}));
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


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLODUINARY_API_SECRET,
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
        message: error.message,
        });
    }
});
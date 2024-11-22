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
import loginRoute from './routes/Auth/login.route.js'

import User from './models/User.model.js';

import cloudinary from 'cloudinary'
import Multer from 'multer'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import { corsOptions } from './config/corsOptions.js'

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config()

app.use('/api/category', categoryRoute);
app.use('/api/specialization', specRoute);
app.use('/api/user', UserRoute);
app.use('/api/instructor', instructorRoute);
app.use('/api/course', courseRoute);
app.use('/api/expertise', expertiseRoute);

app.get('/api/sales', async (req, res) => {
    const { startDate, endDate } = req.query;

    const salesData = await Sales.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.json(salesData);
});

app.use('/auth', loginRoute)

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

app.get('/sales-chart', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Validate dates
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start and end dates are required." });
        }

        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Filter checkouts based on the date range
        const salesData = await User.aggregate([
            { $unwind: "$checkout" },
            {
                $match: {
                    "checkout.order.datePlaced": { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$checkout.order.datePlaced" },
                        month: { $month: "$checkout.order.datePlaced" },
                        day: { $dayOfMonth: "$checkout.order.datePlaced" }
                    },
                    totalSales: { $sum: "$checkout.order.total_cost" }
                }
            },
            {
                $sort: { "_id": 1 } // Sort by date
            }
        ]);

        res.status(200).json(salesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';


connectDB();

const app = express();

// Allow requests from your deployed frontend domain
const allowedOrigins = 'https://mernn-frontend.vercel.app';

app.use(
  cors({ //cross origin resource sharing 
    origin: allowedOrigins, // ✅ Your frontend URL
    credentials: true, // ✅ Allow cookies
    methods: 'GET,POST,PUT,DELETE',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //allow send form data

app.use(cookieParser());

app.use('/api/users', userRoutes);

/*if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  }  */

    {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server is ready'));

app.listen(port, () => console.log(`Server started on port ${port}`));

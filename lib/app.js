import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

import authController from './controllers/auth.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

import express from 'express';
import cors from 'cors';
import authrouter from './routes/auth.routes.js';
import chatrouter from './routes/chat.routes.js';
import whatsapprouter from './routes/whatsapp.routes.js';
import requestLogger from './middlewares/requestLogger.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import healthrouter from './routes/health.routes.js';

const app = express();

app.use(cors('*'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/health",healthrouter);

app.use('/api/auth', authrouter)

app.use('/api/chat', chatrouter)

app.use("/api/whatsapp",whatsapprouter);

app.use(errorMiddleware);

export default app;
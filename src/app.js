import express from 'express';
import cors from 'cors';
import authrouter from './routes/auth.routes.js';
import chatrouter from './routes/chat.routes.js';
import whatsapprouter from './routes/whatsapp.routes.js';
import requestLogger from './middlewares/requestLogger.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import healthrouter from './routes/health.routes.js';
import userrouter from './routes/user.routes.js';
import organizationrouter from "./routes/organization.routes.js";
import departmentrouter
  from "./routes/department.routes.js";


const app = express();

app.use(cors('*'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/health",healthrouter);

app.use('/api/auth', authrouter)

app.use('/api/chat', chatrouter)

app.use("/api/whatsapp",whatsapprouter);

app.use('/api/user', userrouter)

app.use('/api/org', organizationrouter)

app.use('/api/dep', departmentrouter)

app.use(errorMiddleware);

export default app;
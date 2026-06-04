import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

const PORT  = process.env.PORT || 5000;
await connectRedis();
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
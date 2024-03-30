import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import setupSocket from './socketController.js';
import cors from 'cors'
import router from './routes.js';


const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());
 app.use(cors())
 app.use('/',router)

const server = http.createServer(app);
setupSocket(server);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log("disconnected mongodb", error));

server.listen(PORT, () => console.log(`server running... ${PORT}`));


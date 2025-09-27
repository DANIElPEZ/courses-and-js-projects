import express from 'express';
import routes from './routes/index.js';
import { logger } from './middlewares/logger.js';
import {errorHandler} from './middlewares/errorHandler.js';
const app = express();

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use('/api', routes); //enpoint base para las rutas de la API
app.get('/', (req, res)=>{
     res.send('Welcome to the Express API!');
});

export default app;
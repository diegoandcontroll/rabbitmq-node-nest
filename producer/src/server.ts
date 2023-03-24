import express, { Request, Response } from 'express'
import RabbimqServer from './rabbitmq-server';
import router from './router';

const app = express()
app.use(express.json())
app.use(router);
app.listen(3333, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});






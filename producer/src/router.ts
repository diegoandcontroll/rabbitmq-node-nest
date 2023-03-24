import RabbimqServer from "./rabbitmq-server";
import express, { Request, Response } from 'express';
const router = express.Router();
router.get('/',async function (req: Request, res: Response) {
  res.send({messge: 'Connected to rabbitmq'})
});
router.post('/', async function (req: Request, res: Response) {
  const server = new RabbimqServer('amqp://admin:admin@localhost:5672');
  await server.start();
  await server.publishQueue('test', JSON.stringify(req.body))
  res.send(req.body)
});
export default router;
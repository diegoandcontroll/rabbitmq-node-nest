import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbimqServer from './rabbitmq-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const server = new RabbimqServer('amqp://admin:admin@localhost:5672');
  await server.start();
  await server.consume('test', (message) =>
    console.log(message.content.toString()),
  );
}
bootstrap();

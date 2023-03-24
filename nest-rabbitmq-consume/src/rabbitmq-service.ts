import { Connection, Channel, connect, Message } from 'amqplib';
export default class RabbimqServer {
  private conn: Connection | undefined;
  private channel: Channel | undefined;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishQueue(queue: string, message: string) {
    return (
      this.channel && this.channel.sendToQueue(queue, Buffer.from(message))
    );
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return (
      this.channel &&
      this.channel.consume(queue, (message) => {
        callback(message), this.channel.ack(message);
      })
    );
  }
}

import {Connection, Channel, connect} from 'amqplib'
export default class RabbimqServer{
  private conn: Connection | undefined;
  private channel: Channel | undefined;

  constructor(private uri: string){}


  async start(): Promise<void>{
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishQueue(queue: string, message: string){
    return this.channel && this.channel.sendToQueue(queue, Buffer.from(message))
  }
}
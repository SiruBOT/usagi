import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";

const subChannelName = "sub";
const pubChannelName = "pub";

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

const pub = sub.duplicate();

function testPublish() {
  pub.publish(pubChannelName, JSON.stringify({ id: uuidv4() }));
}

export { testPublish };

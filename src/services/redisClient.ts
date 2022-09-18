import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT!,
  },
  password: process.env.REDIS_PASSWORD,
});

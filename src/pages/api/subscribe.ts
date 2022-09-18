import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { redisClient } from "../../services/redisClient";

export default function subscribeHandler(req: any, res: any) {
  const socket = res.socket.server.io;

  if (!socket) {
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      const redisSubscriber = redisClient.duplicate();

      const redisResponseChannel = process.env.REDIS_RESPONSE_CHANNEL!;

      redisSubscriber.connect().then(() => {
        redisSubscriber.subscribe(redisResponseChannel, (message) => {
          socket.emit("response", message);
        });
      });
    });

    res.socket.server.io = io;

    res.status(200).json({
      message: 'The socket has been opened'
    });
  } else {
    res.status(200).json({
      message: 'The socket is already open'
    });
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

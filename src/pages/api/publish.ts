// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import { redisClient } from "../../services/redisClient";

interface IPublishData {
  channel: "message" | "file" | "function";
  content: string;
}

export default async function publishHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { channel, content } = req.body as IPublishData;

      const publishContent = {
        message: JSON.stringify({
          type: "get",
          message: content,
        }),
        file: JSON.stringify({
          text: content,
        }),
        function: JSON.stringify({ operation: content }),
      } as const;

      const channelName = {
        message: process.env.REDIS_MESSAGE_CHANNEL,
        file: process.env.REDIS_FILE_CHANNEL,
        function: process.env.REDIS_FUNCTION_CHANNEL,
      }

      const redisPublisher = redisClient.duplicate();

      redisPublisher.connect().then(() => {
        redisPublisher.publish(channel, publishContent[channel]);
      });

      res.status(200);
    } catch (error) {
      console.log(error);

      res.status(400).json({
        message: error,
      });
    }
  } else {
    res.status(500);
    res.end();
  }
}

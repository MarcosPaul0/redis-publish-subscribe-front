import { Message } from "./Message";

type ChannelType = "message" | "file" | "function";

interface ChatContentResponseData {
  type: "success" | "error";
  position: "right" | "left";
  result: string;
}

export interface ChatProps {
  messages: ChatContentResponseData[];
}

export function Chat({ messages }: ChatProps) {
  return (
    <div
      className={`
    bg-neutral-800 rounded-xl
      h-5/6 w-full px-3 py-2
      flex flex-col gap-2
    `}
    >
      {messages.map((message) => {
          return (
            <Message
              key={message.result}
              text={message.result}
              position={message.position}
            />
          );
      })}
    </div>
  );
}

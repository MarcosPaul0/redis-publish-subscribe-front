import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { apiClient } from "../services/apiClient";
import { io } from "socket.io-client";

import { MessageTextarea } from "../components/MessageTextarea";
import { Chat } from "../components/Chat";
import { MainContainer } from "../components/MainContainer";
import { SendMessageButton } from "../components/SendMessageButton";
import { ChannelSelect } from "../components/ChannelSelect";

type ChannelType = "message" | "file" | "function";

type PositionType = "right" | "left";

interface MessageData {
  type: "success" | "error";
  result: string;
  channel: ChannelType;
}

interface ContentData {
  type: "success" | "error";
  result: string;
  position: PositionType;
}

interface ChatContentData {
  message: ContentData[];
  file: ContentData[];
  function: ContentData[];
}

export default function App() {
  const [channelActive, setChannelActive] = useState<ChannelType>("message");

  const [content, setContent] = useState("");

  const [chatContent, setChatContent] = useState<ChatContentData>({
    file: [],
    function: [],
    message: [],
  });

  function addChatContent(newContent: MessageData, position: PositionType) {
    setChatContent((state) => ({
      ...state,
      [newContent.channel]: [
        ...state[newContent.channel],
        {
          type: newContent.type,
          result: newContent.result,
          position: position,
        },
      ],
    }));
  }

  function changeChannel(option: ChannelType) {
    setChannelActive(option);
  }

  function changeContent(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    setInitialize((state) => {
      if (!state) {
        const socket = io();

        apiClient.get("/subscribe").then(() => {
          socket.on("response", (message) => {
            const newContent = JSON.parse(message) as MessageData;

            addChatContent(newContent, "left");
          });
        });
      }

      return true;
    });
  }, [initialize]);

  async function handlePublishMessage(event: FormEvent) {
    event.preventDefault();

    addChatContent(
      {
        channel: channelActive,
        result: content,
        type: "success",
      },
      "right"
    );

    try {
      await apiClient.post("/publish", {
        channel: channelActive,
        content,
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      console.log(axiosError.response);
    }

    setContent("");
  }

  return (
    <MainContainer>
      <Chat messages={chatContent[channelActive]} />

      <form
        className={`
          flex flex-col items-center
          gap-4 w-full
        `}
        onSubmit={handlePublishMessage}
      >
        <MessageTextarea value={content} onChange={changeContent} />

        <div
          className={`
            flex items-center justify-between
            w-full
          `}
        >
          <ChannelSelect
            channelActive={channelActive}
            changeChannel={changeChannel}
          />

          <SendMessageButton />
        </div>
      </form>
    </MainContainer>
  );
}

import { Calculator, EnvelopeSimple, FilePlus } from "phosphor-react";
import { Action } from "./Action";

type ChannelType = "message" | "file" | "function";

interface ChannelSelectProps {
  channelActive: ChannelType;
  changeChannel: (channel: ChannelType) => void;
}

export function ChannelSelect({
  channelActive,
  changeChannel,
}: ChannelSelectProps) {
  return (
    <fieldset
      className={`
    flex items-center
  `}
    >
      <Action
        id="send-message"
        onChange={() => changeChannel("message")}
        checked={channelActive === "message"}
      >
        <EnvelopeSimple size={32} />
        Enviar Mensagem
      </Action>
      <Action
        id="file"
        onChange={() => changeChannel("file")}
        checked={channelActive === "file"}
      >
        <FilePlus size={32} />
        Escrever Arquivo
      </Action>
      <Action
        id="function"
        onChange={() => changeChannel("function")}
        checked={channelActive === "function"}
      >
        <Calculator size={32} />
        Calcular
      </Action>
    </fieldset>
  );
}

import { PaperPlaneRight } from "phosphor-react";

export function SendMessageButton() {
  return (
    <button
      className={`
        bg-cyan-700 p-3 rounded-full
        flex items-center justify-center
        hover:bg-cyan-800
      `}
      type="submit"
    >
      <PaperPlaneRight size={32} />
    </button>
  );
}

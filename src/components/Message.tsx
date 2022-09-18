interface MessageProps {
  text: string;
  position: "left" | "right";
}

export function Message({ text, position }: MessageProps) {
  return (
    <div
      className={`
        flex items-center  w-full  max-w-lg
        ${position === 'right' && 'self-end justify-end'}
      `}
    >
      {position === "left" && (
        <div
          className={`
            w-0 h-0 border-t-4 border-b-4 border-r-4
            border-t-neutral-800 border-b-neutral-800
            bg-gray-200
          `}
        />
      )}
      <div
        className={`
          bg-gray-200 text-neutral-900
          p-3 rounded-2xl flex items-center flex-wrap
        `}
      >
        {text}
      </div>
      {position === "right" && (
        <div
          className={`
            w-0 h-0 border-t-4 border-b-4 border-l-4
            border-t-neutral-800 border-b-neutral-800
            bg-gray-200
          `}
        />
      )}
    </div>
  );
}

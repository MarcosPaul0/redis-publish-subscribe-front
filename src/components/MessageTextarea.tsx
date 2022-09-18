import { InputHTMLAttributes } from "react";

export function MessageTextarea(
  props: InputHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      placeholder="Escreva uma mensagem"
      className={`
  bg-neutral-700 w-full
    resize-none h-24 rounded-xl
    px-3 py-2
  `}
      {...props}
    />
  );
}

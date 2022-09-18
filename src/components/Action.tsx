import { InputHTMLAttributes, ReactNode, useState } from "react";

interface ActionProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export function Action({ children, ...rest }: ActionProps) {

  const isCheckedStyle = rest.checked ? 'bg-purple-600 text-gray-100' : 'text-purple-600'

  return (
    <>
      <label
        htmlFor={rest.id}
        className={`
          px-4 py-2 rounded-xl
          cursor-pointer gap-2
          flex items-center justify-center
          hover:brightness-90 transition-all duration-100
          border-2 border-purple-600
          ${isCheckedStyle}
        `}
      >
        {children}
      </label>
      <input
        {...rest}
        type="radio"
        className={`
            invisible
          `}
      />
    </>
  );
}

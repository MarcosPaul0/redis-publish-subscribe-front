import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <main
      className={`
        h-screen bg-neutral-900 text-gray-100
        flex flex-col items-center justify-center
        w-full gap-4
        sm:text-sm md:text-base
        sm:px-10 sm:py-5
        md:px-20 md:py-10 
        lg:px-80 lg:py-20
      `}
    >
      {children}
    </main>
  );
}

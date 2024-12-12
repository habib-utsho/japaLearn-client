import React from "react";

type TContainer = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<TContainer> = ({ children, className }) => {
  return (
    <div
      className={`max-w-[1168] xl:max-w-[1200px] 2xl:max-w-[1350px] mx-2 sm:mx-8 md:mx-12 xl:mx-auto px-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;

import React, { ReactNode } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  className,
  children,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

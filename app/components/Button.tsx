"use client";
import React from "react";

interface ButtonProps {
  text: string;
  buttonType: "submit" | "reset" | "button" | undefined;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({ text, buttonType, onClick }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}
      type={buttonType}
      onClick={onClick ? onClick : undefined}
    >
      {text}
    </button>
  );
};

export default Button;

import React from "react";

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...props }: Button) {
  return (
    <button className="bg-primary text-white shadow-sm py-2 rounded-md hover:bg-primary-dark">
      {children}
    </button>
  );
}

export default Button;

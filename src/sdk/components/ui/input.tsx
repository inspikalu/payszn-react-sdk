import * as React from "react";
import "./input.css";

// Simple utility to combine class names
const combineClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={combineClasses("input", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
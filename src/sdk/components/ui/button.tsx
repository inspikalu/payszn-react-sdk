import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "./button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// Helper function to combine classNames
const combineClassNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    asChild = false, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Generate class names based on variants and size
    const variantClass = `btn-${variant}`;
    const sizeClass = size === 'default' ? 'btn-default-size' : `btn-${size}`;
    
    return (
      <Comp
        className={combineClassNames('btn', variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
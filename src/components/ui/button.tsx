import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_4px_20px_-6px_rgba(100,100,100,0.3)] dark:hover:shadow-[0_4px_20px_-6px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_4px_20px_-6px_rgba(100,100,100,0.25)] dark:hover:shadow-[0_4px_20px_-6px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
        ghost: "text-foreground hover:text-primary hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "bg-foreground/5 backdrop-blur-md border border-foreground/10 text-foreground hover:bg-foreground/10 hover:shadow-[0_4px_20px_-6px_rgba(100,100,100,0.2)] dark:hover:shadow-[0_4px_20px_-6px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]",
        hero:
          "bg-primary text-primary-foreground hover:shadow-[0_12px_40px_-10px_rgba(100,100,100,0.4)] dark:hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.35)] hover:scale-[1.03] active:scale-[0.98] font-semibold",
        "hero-solid":
          "bg-white text-background hover:bg-white/95 hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.98] font-semibold",
        "hero-outline":
          "border border-white text-white hover:bg-white hover:text-background hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

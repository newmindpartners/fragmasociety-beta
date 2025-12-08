import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => (
  <span className={cn(
    "inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full",
    "bg-primary/10 text-primary border border-primary/20",
    className
  )}>
    {children}
  </span>
);

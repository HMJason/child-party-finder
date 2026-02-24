interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/30 text-yellow-700",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

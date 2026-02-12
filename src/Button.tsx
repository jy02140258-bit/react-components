import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) => {
  const baseClass = "btn";
  const classes = [baseClass, `btn-${variant}`, `btn-${size}`].join(" ");

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "#3b82f6",
}) => {
  return (
    <div className={`spinner spinner-${size}`} style={{ borderColor: color }}>
      <div></div>
    </div>
  );
};

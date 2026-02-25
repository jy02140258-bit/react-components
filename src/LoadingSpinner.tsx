import React from "react";
interface Props { size?: "small"|"medium"|"large"; color?: string; }
export const LoadingSpinner: React.FC<Props> = ({ size="medium", color="#3b82f6" }) => (
  <div className={`spinner spinner-${size}`} style={{ borderColor: color }}><div></div></div>
);

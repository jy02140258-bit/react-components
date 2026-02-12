// Tooltip Component - Added 2026-02-13
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && <div className={	ooltip tooltip-+position}>{content}</div>}
    </div>
  );
};
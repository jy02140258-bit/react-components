// Modal Component - Added 2026-02-14
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = { sm: '400px', md: '600px', lg: '800px' };

  return (
    <div ref={overlayRef} className='modal-overlay' onClick={(e) => {
      if (e.target === overlayRef.current) onClose();
    }}>
      <div className='modal-content' style={{ maxWidth: sizeClasses[size] }}>
        <div className='modal-header'>
          <h2>{title}</h2>
          <button onClick={onClose} aria-label='Close'>&times;</button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};
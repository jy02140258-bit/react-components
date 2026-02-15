import React, { useState, useRef, useEffect, useCallback } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  onChange?: (expandedIds: string[]) => void;
  className?: string;
}

/**
 * Accessible accordion component with smooth animations.
 * Supports single/multiple expansion modes, keyboard navigation,
 * and ARIA attributes for screen readers.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  onChange,
  className = '',
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        onChange?.(Array.from(next));
        return next;
      });
    },
    [allowMultiple, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(id);
      }
    },
    [toggle]
  );

  return (
    <div className={ccordion +className} role="presentation">
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isExpanded={expanded.has(item.id)}
          onToggle={() => toggle(item.id)}
          onKeyDown={(e) => handleKeyDown(e, item.id)}
        />
      ))}
    </div>
  );
};

const AccordionPanel: React.FC<{
  item: AccordionItem;
  isExpanded: boolean;
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}> = ({ item, isExpanded, onToggle, onKeyDown }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    if (isExpanded) {
      const h = el.scrollHeight;
      setHeight(h);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(el.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isExpanded]);

  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        aria-expanded={isExpanded}
        aria-controls={panel-+item.id}
        id={	rigger-+item.id}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        disabled={item.disabled}
      >
        <span>{item.title}</span>
        <span
          className="accordion-icon"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          ▼
        </span>
      </button>
      <div
        id={panel-+item.id}
        role="region"
        aria-labelledby={	rigger-+item.id}
        ref={contentRef}
        style={{
          height: height !== undefined ? height + 'px' : 'auto',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        <div className="accordion-content">{item.content}</div>
      </div>
    </div>
  );
};

export default Accordion;
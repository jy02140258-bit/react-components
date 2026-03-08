/** Badge component - daily task 2026-03-09 */
import React from 'react';

export function Badge(props: { children: React.ReactNode; variant?: 'default' | 'success' }) {
  const v = props.variant ?? 'default';
  return <span data-badge data-variant={v}>{props.children}</span>;
}
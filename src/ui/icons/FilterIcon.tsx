import React from 'react';

interface IconProps {
  className?: string;
}

export const FilterIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
    <path d="M15 1H1L6.6 8.095V13H9.4V8.095L15 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);
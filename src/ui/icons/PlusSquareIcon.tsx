import React from 'react';

interface IconProps {
  className?: string;
}

export const PlusSquareIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6V18" strokeWidth="2" strokeLinecap="round" stroke="currentColor" />
    <path d="M6 12H18" strokeWidth="2" strokeLinecap="round" stroke="currentColor" />
  </svg>

);
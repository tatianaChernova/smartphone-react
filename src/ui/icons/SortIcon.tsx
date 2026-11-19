import React from 'react';

interface IconProps {
  className?: string;
}

export const SortIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 13.8349V1.8349M4 13.8349L1 9.21952M4 13.8349L7 9.21952" stroke="#454545" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 1.8349V13.8349M14 1.8349L11 6.45028M14 1.8349L17 6.45028" stroke="#454545" strokeWidth="2" strokeLinecap="round" />
  </svg>


);
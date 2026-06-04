import React from 'react';

interface IconProps {
  className?: string;
}

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
    <path d="M1 8.00006L5.1847 12.1848C5.61501 12.6151 6.32668 12.5645 6.69181 12.0777L15 1.00006" stroke="#091D9E" stroke-width="2" stroke-linecap="round" />
  </svg>

);
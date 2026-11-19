import React from 'react';

interface IconProps {
  className?: string;
}

export const InfoCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="11.5" stroke="currentColor"/>
  <circle cx="12" cy="18" r="1" fill="currentColor"/>
  <rect x="11" y="4" width="2" height="11" rx="1" fill="currentColor"/>
</svg>

);
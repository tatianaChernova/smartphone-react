import React from 'react';

interface IconProps {
  className?: string;
}

export const BackIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 28" fill="none">
    <path d="M13.5854 1L1.31136 12.6604C0.910596 13.0411 0.894744 13.6748 1.27597 14.075L13.5854 27" stroke="#0C0C0C" stroke-width="2" stroke-linecap="round" />
  </svg>

);
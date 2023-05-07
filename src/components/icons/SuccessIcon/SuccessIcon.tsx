import React from 'react';

import { IconProps } from 'shared/types';

const SuccessIcon: React.FC<IconProps> = ({ className }: IconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.00001 0.333313C3.32001 0.333313 0.333344 3.31998 0.333344 6.99998C0.333344 10.68 3.32001 13.6666 7.00001 13.6666C10.68 13.6666 13.6667 10.68 13.6667 6.99998C13.6667 3.31998 10.68 0.333313 7.00001 0.333313ZM5.66668 10.3333L2.33334 6.99998L3.27334 6.05998L5.66668 8.44665L10.7267 3.38665L11.6667 4.33331L5.66668 10.3333Z"
        fill="#3CC13B"
      />
    </svg>
  );
};

export default SuccessIcon;

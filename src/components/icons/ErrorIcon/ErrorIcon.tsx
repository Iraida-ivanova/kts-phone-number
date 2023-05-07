import React from 'react';

import { IconProps } from 'shared/types';

const ErrorIcon: React.FC<IconProps> = ({ className }: IconProps) => {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.666656 13H15.3333L7.99999 0.333313L0.666656 13ZM8.66666 11H7.33332V9.66665H8.66666V11ZM8.66666 8.33331H7.33332V5.66665H8.66666V8.33331Z"
        fill="#F03738"
      />
    </svg>
  );
};

export default ErrorIcon;

import React from 'react';

import { IconProps } from 'shared/types';

const DownIcon: React.FC<IconProps> = ({ onClick, className }: IconProps) => {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M1.175 0.533325L5 4.34999L8.825 0.533325L10 1.70833L5 6.70833L0 1.70833L1.175 0.533325Z"
        fill="#C2C9D1"
      />
      <path
        d="M1.175 0.533325L5 4.34999L8.825 0.533325L10 1.70833L5 6.70833L0 1.70833L1.175 0.533325Z"
        fill="black"
        fillOpacity="0.25"
      />
    </svg>
  );
};

export default React.memo(DownIcon);

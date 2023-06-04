import React from 'react';

type TooltipProps = {
  name: string;
};

export default function Tooltip({ name }: TooltipProps) {
  return (
    <span
      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
    >
      {name}
    </span>
  );
}

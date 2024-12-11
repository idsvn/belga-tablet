import React from 'react';

interface IconProps {
  Icon: any;
  width: number | string;
  height: number | string;
}

export const IconSvg = (props: IconProps) => {
  return <props.Icon width={props.width} height={props.height} />;
};

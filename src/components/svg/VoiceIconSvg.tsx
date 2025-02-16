import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

import colors from 'src/themes/colors';

function VoiceIconSvg({ color = colors.gray100, ...props }: SvgProps) {
  return (
    <Svg width={17} height={21} viewBox="0 0 17 21" fill="none" {...props}>
      <Path
        d="M11.961 9.77a3.653 3.653 0 11-7.307 0V4.653a3.654 3.654 0 117.307 0v5.115z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.615 10.5a6.563 6.563 0 01-6.577 6.577H7.577A6.563 6.563 0 011 10.5m7.308 6.577V20"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default VoiceIconSvg;

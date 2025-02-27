import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

import colors from 'src/themes/colors';

function TrashIconSvg({ color = colors.primary, ...props }: SvgProps) {
  return (
    <Svg width={14} height={16} viewBox="0 0 14 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.714 4.571a.617.617 0 01.572.652v7.84a.571.571 0 11-1.143 0v-7.84a.617.617 0 01.571-.652zm-3.428 0a.617.617 0 01.571.652v7.84a.571.571 0 11-1.143 0v-7.84a.617.617 0 01.572-.652zM3 14.857h8a.572.572 0 00.572-.571V5.143a.571.571 0 111.143 0v9.714A1.143 1.143 0 0111.571 16H2.429a1.143 1.143 0 01-1.143-1.143V5.143a.571.571 0 011.143 0v9.143a.571.571 0 00.571.571zM10.43 1.143v1.143h2.857a.572.572 0 010 1.143H.714a.571.571 0 110-1.143h2.858V1.143A1.143 1.143 0 014.715 0h4.57a1.143 1.143 0 011.144 1.143zm-5.715 0v1.143h4.572V1.143H4.715z"
        fill={color}
      />
    </Svg>
  );
}

export default TrashIconSvg;

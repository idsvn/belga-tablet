import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowRightIconSvg(props: SvgProps) {
  return (
    <Svg width={7} height={13} viewBox="0 0 7 13" fill="none" {...props}>
      <Path
        d="M.205 1.233a.739.739 0 010-1.021.685.685 0 01.99 0l5.6 5.777a.739.739 0 010 1.022l-5.6 5.778a.685.685 0 01-.99 0 .739.739 0 010-1.022L5.31 6.5.205 1.233z"
        fill="#3349E8"
      />
    </Svg>
  );
}

export default ArrowRightIconSvg;

import React from 'react';

import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

function BelgaIconSvg(props: SvgProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
      <G clipPath="url(#clip0_888_2052)">
        <Rect width={149} height={149} rx={10} fill="#3349E8" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.63 29.649c-2.573 0-5.085.483-7.46 1.434-1.795.72-2.676 2.782-1.97 4.606.705 1.83 2.73 2.728 4.527 2.009a13.094 13.094 0 014.903-.938c7.378 0 13.387 6.105 13.387 13.62 0 7.511-6.01 13.622-13.387 13.622-7.383 0-13.388-6.11-13.388-13.622V14.667c0-1.97-1.561-3.556-3.491-3.556-1.924 0-3.492 1.586-3.492 3.556V50.38c0 11.43 9.133 20.731 20.37 20.731C50.862 71.111 60 61.81 60 50.38c0-11.435-9.139-20.731-20.37-20.731z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_888_2052">
          <Rect width={80} height={80} rx={10} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default BelgaIconSvg;

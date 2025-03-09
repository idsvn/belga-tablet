import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function DownloadIconSvg({ color, ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M1.429 12.6v3.571A1.429 1.429 0 002.857 17.6h14.286a1.429 1.429 0 001.428-1.429V12.6a.715.715 0 011.429 0v3.571a2.857 2.857 0 01-2.857 2.858H2.857A2.857 2.857 0 010 16.17V12.6a.714.714 0 011.429 0zm7.857-.457l1.214 1.214a.715.715 0 010 1.014.728.728 0 01-1.014 0L4.443 9.314a.686.686 0 010-1 .714.714 0 011.014 0l3.829 3.829zm0 0V.714A.714.714 0 0110 0a.728.728 0 01.714.714v11.429l3.829-3.829a.715.715 0 011.014 0 .714.714 0 010 1L10.5 14.371a.728.728 0 01-1.014 0 .771.771 0 01-.2-.5v-1.728z"
        fill={color ?? '#3349E8'}
      />
    </Svg>
  );
}

export default DownloadIconSvg;

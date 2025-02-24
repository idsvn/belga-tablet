import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function ChevronDownIconSvg(props: SvgProps) {
  return (
    <Svg width={13} height={8} viewBox="0 0 13 8" fill="none" {...props}>
      <Path
        d="M11.047 1.074a.622.622 0 11.88.88L6.952 6.925a.622.622 0 01-.879 0L1.101 1.953a.622.622 0 01.88-.879l4.533 4.533 4.533-4.533z"
        fill="#3349E8"
      />
    </Svg>
  );
}

export default ChevronDownIconSvg;

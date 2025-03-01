import React from 'react';

import Svg, { Path } from 'react-native-svg';

function ReloadIconSvg(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.932 10.044a8 8 0 11-9.925-8.788c3.9-1 7.935 1.007 9.425 4.747"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.999 1.003v5h-5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ReloadIconSvg;

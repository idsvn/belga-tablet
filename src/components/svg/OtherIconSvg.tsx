import React from 'react';

import Svg, { Path } from 'react-native-svg';

function OtherIconSvg(props) {
  return (
    <Svg
      width={16}
      height={4}
      viewBox="0 0 16 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z"
        fill="#666875"
      />
    </Svg>
  );
}

export default OtherIconSvg;

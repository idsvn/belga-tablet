import React from 'react';

import Svg, { Path } from 'react-native-svg';

function XIcon(props) {
  return (
    <Svg
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.063 0h2.147L8.497 5.367l5.506 7.28h-4.32L6.299 8.223l-3.874 4.424H.28l4.993-5.74L0 0h4.428l3.057 4.041L11.063 0zm-.75 11.387h1.19l-7.7-10.174h-1.28l7.79 10.174z"
        fill="#666875"
      />
    </Svg>
  );
}

export default XIcon;

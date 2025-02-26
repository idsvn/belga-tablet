import React from 'react';

import Svg, { Path } from 'react-native-svg';

function LinkedinSvg(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.8 0H1.2A1.2 1.2 0 000 1.2v9.6A1.2 1.2 0 001.2 12h9.6a1.2 1.2 0 001.2-1.2V1.2A1.2 1.2 0 0010.8 0zM3.6 10.2H1.8V4.8h1.8v5.4zm-.9-6.42a1.08 1.08 0 110-2.16 1.08 1.08 0 010 2.16zm7.5 6.42H8.4V7a.9.9 0 00-1.8 0v3.2H4.8V4.8h1.8v.72a1.94 1.94 0 011.5-.84 2.13 2.13 0 012.1 2.1v3.42z"
        fill="#666875"
      />
    </Svg>
  );
}

export default LinkedinSvg;

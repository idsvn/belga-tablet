import React from 'react';

import Svg, { Path } from 'react-native-svg';

function MediaIconSvg(props) {
  return (
    <Svg
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 4v4l3-2-3-2zM6 2.93a.54.54 0 01.08-.28.51.51 0 01.7-.14l4.6 3.07a.4.4 0 01.13.13.498.498 0 01-.13.7l-4.6 3.07a.54.54 0 01-.28.08.5.5 0 01-.5-.5V2.93zM2 1a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H2zM0 2a2 2 0 012-2l12 .06a2 2 0 012 2V10a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
        fill="#666875"
      />
    </Svg>
  );
}

export default MediaIconSvg;

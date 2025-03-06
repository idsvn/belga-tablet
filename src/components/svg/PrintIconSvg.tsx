import React from 'react';

import Svg, { Path } from 'react-native-svg';

function PrintIconSvg(props) {
  return (
    <Svg
      width={17}
      height={11}
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.5 2h5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5zM5 3v3h4V3H5zm6.5 5h3a.5.5 0 010 1h-3a.5.5 0 010-1zm0-2h3a.5.5 0 010 1h-3a.5.5 0 010-1zm0-4h3a.5.5 0 010 1h-3a.5.5 0 010-1zm0 2h3a.5.5 0 010 1h-3a.5.5 0 010-1zm-7 4h5a.5.5 0 110 1h-5a.5.5 0 110-1zM3 2v7a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1H4a1 1 0 00-1 1zm-.73 8A2 2 0 012 9V4a1 1 0 00-1 1v4a1 1 0 001 1h.27zM2 3V2a2 2 0 012-2h11a2 2 0 012 2v7a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2z"
        fill="#666875"
      />
    </Svg>
  );
}

export default PrintIconSvg;

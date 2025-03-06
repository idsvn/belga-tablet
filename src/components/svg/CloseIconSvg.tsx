import React from 'react';

import Svg, { Path } from 'react-native-svg';

function CloseIconSvg(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.464 7.429L15.75.214a.731.731 0 111.035 1.035L9.57 8.536l7.142 7.215a.729.729 0 010 1.035.732.732 0 01-1.035 0L8.464 9.498l-7.215 7.215a.729.729 0 01-1.035-.962L7.43 8.464.214 1.249A.732.732 0 111.25.214L8.464 7.43z"
        fill="#3349E8"
      />
    </Svg>
  );
}

export default CloseIconSvg;

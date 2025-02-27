import React from 'react';

import Svg, { Path } from 'react-native-svg';

import colors from 'src/themes/colors';

function PlusIconSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fillRule="evenodd"
        d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2z"
        fill={colors.primary}
      />
    </Svg>
  );
}

export default PlusIconSvg;

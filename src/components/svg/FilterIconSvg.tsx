import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function FilterIconSvg(props: SvgProps) {
  return (
    <Svg width={15} height={18} viewBox="0 0 15 18" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.18 1.346H1.66l4.943 6.842a.66.66 0 01.136.416v6.537l1.362.902V8.591a.76.76 0 01.136-.417l4.943-6.828zM5.418 8.84L.122 1.5a1.057 1.057 0 010-.986.924.924 0 01.337-.375A.9.9 0 01.939 0H14.05c.17.001.335.05.48.14.143.091.26.22.337.373a.986.986 0 010 .986L9.435 8.84v8.466a.648.648 0 01-.326.597.59.59 0 01-.327.097.632.632 0 01-.354-.111l-2.724-1.776a.661.661 0 01-.313-.583l.027-6.69z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FilterIconSvg;

import React from 'react';

import Svg, { Path } from 'react-native-svg';

function DownloadedIconSvg(props) {
  return (
    <Svg width={15} height={15} viewBox="0 0 11 11" fill="none" {...props}>
      <Path
        d="M10.786.206a.711.711 0 00-.774-.152.71.71 0 00-.23.152L3.736 6.2 1.213 3.7a.714.714 0 00-1.005 0 .7.7 0 000 .996L3.23 7.69a.715.715 0 001.005 0l6.551-6.487a.686.686 0 000-.996zM1.22 11h8.554a.712.712 0 00.713-.706.712.712 0 00-.713-.706H1.22a.711.711 0 00-.712.706c0 .388.32.706.712.706z"
        fill="#3349E8"
      />
    </Svg>
  );
}

export default DownloadedIconSvg;

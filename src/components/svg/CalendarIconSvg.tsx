import React from 'react';

import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

function CalendarIconSvg(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.973.932a.5.5 0 01.5-.5h.243a.5.5 0 01.5.5v3.973a.5.5 0 01-.5.5h-.243a.5.5 0 01-.5-.5V.932zM7.46 3.541h4.972V2.297H7.46v1.244zm6.216 1.364V.932a.5.5 0 01.5-.5h.243a.5.5 0 01.5.5v3.973a.5.5 0 01-.5.5h-.243a.5.5 0 01-.5-.5zm2.486-1.364h1.148c.74 0 1.339.513 1.339 1.147v12.624c0 .634-.6 1.147-1.34 1.147H2.583c-.74 0-1.339-.513-1.339-1.147V4.688c0-.634.6-1.147 1.34-1.147H3.73V2.297H2.652C1.187 2.297 0 3.337 0 4.618v12.764c0 1.282 1.187 2.32 2.652 2.32H17.24c1.464 0 2.652-1.038 2.652-2.32V4.618c0-1.282-1.188-2.32-2.652-2.32h-1.078V3.54zM3.108 15.85a.5.5 0 01.5-.5h12.676a.5.5 0 01.5.5v.244a.5.5 0 01-.5.5H3.608a.5.5 0 01-.5-.5v-.244zm.5-9.202a.5.5 0 00-.5.5v.243a.5.5 0 00.5.5h12.676a.5.5 0 00.5-.5v-.243a.5.5 0 00-.5-.5H3.608z"
        fill="#3349E8"
      />
      <Rect
        x={3.10815}
        y={6.64865}
        width={1.24324}
        height={9.94595}
        rx={0.621622}
        fill="#3349E8"
      />
      <Rect
        x={9.32446}
        y={6.64865}
        width={1.24324}
        height={9.94595}
        rx={0.621622}
        fill="#3349E8"
      />
      <Rect
        x={15.5405}
        y={6.64865}
        width={1.24324}
        height={9.94595}
        rx={0.621622}
        fill="#3349E8"
      />
    </Svg>
  );
}

export default CalendarIconSvg;

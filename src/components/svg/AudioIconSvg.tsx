import React from 'react';

import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

function AudioIconSvg(props: SvgProps) {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <G clipPath="url(#clip0_889_3873)">
        <Rect width={36} height={36.0001} rx={4} fill="#D9E4FF" />
      </G>
      <Path
        transform="translate(7.196 7.197)"
        fill="#D9E4FF"
        d="M0 0H21.6V21.6H0z"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.996 28.797c5.965 0 10.8-4.835 10.8-10.8 0-5.964-4.835-10.8-10.8-10.8-5.964 0-10.8 4.836-10.8 10.8 0 5.965 4.836 10.8 10.8 10.8z"
        fill="#3349E8"
      />
      <Path
        d="M17.996 29.797c6.517 0 11.8-5.283 11.8-11.8s-5.283-11.8-11.8-11.8-11.8 5.283-11.8 11.8 5.283 11.8 11.8 11.8z"
        stroke="#2E2F37"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
      <Path
        d="M12.597 16.197v3.6h2.4l3 3v-9.6l-3 3h-2.4zm8.1 1.8a2.7 2.7 0 00-1.5-2.418v4.83a2.684 2.684 0 001.5-2.412zm-1.5-5.262v1.236a4.203 4.203 0 010 8.052v1.236a5.398 5.398 0 004.2-5.262 5.398 5.398 0 00-4.2-5.262z"
        fill="#fff"
      />
      <Defs>
        <ClipPath id="clip0_889_3873">
          <Rect width={36} height={36.0001} rx={4} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AudioIconSvg;

import React from 'react';

import Svg, { Path } from 'react-native-svg';

import theme from 'src/themes';

interface VoiceSvgProps {
  width: string;
  height: string;
  checked?: boolean;
}

const VoiceSvg: React.FC<VoiceSvgProps> = ({ width, height, checked }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 21" fill="none">
      <Path
        d="M11.9614 9.76911C11.9614 10.7382 11.5765 11.6675 10.8912 12.3527C10.206 13.038 9.27665 13.4229 8.30761 13.4229C7.33856 13.4229 6.4092 13.038 5.72398 12.3527C5.03876 11.6675 4.65381 10.7382 4.65381 9.76911V4.6538C4.65381 3.68475 5.03876 2.75539 5.72398 2.07017C6.4092 1.38495 7.33856 1 8.30761 1C9.27665 1 10.206 1.38495 10.8912 2.07017C11.5765 2.75539 11.9614 3.68475 11.9614 4.6538V9.76911Z"
        stroke={checked ? theme.colors.primary : theme.colors.gray}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.6152 10.4998C15.6171 11.364 15.4483 12.2201 15.1185 13.0189C14.7887 13.8177 14.3043 14.5435 13.6932 15.1546C13.0821 15.7657 12.3563 16.25 11.5575 16.5799C10.7587 16.9097 9.90259 17.0785 9.03837 17.0766H7.57685C6.71263 17.0785 5.85654 16.9097 5.05773 16.5799C4.25892 16.25 3.53313 15.7657 2.92203 15.1546C2.31093 14.5435 1.82656 13.8177 1.49672 13.0189C1.16689 12.2201 0.998089 11.364 1.00002 10.4998M8.30761 17.0766V19.9996"
        stroke={checked ? theme.colors.primary : theme.colors.gray}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default VoiceSvg;

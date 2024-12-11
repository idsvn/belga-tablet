import React from 'react';

import Svg, { Path } from 'react-native-svg';

import theme from 'src/themes';

interface FavoritesSvgProps {
  width: string;
  height: string;
  checked?: boolean;
}

const FavoritesSvg: React.FC<FavoritesSvgProps> = ({
  width = 20,
  height = 20,
  checked,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 23" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 23V1.76972C13 1.30036 12.8287 0.850227 12.5239 0.51834C12.2191 0.186452 11.8057 0 11.3746 0H1.62544C1.19435 0 0.78091 0.186452 0.476081 0.51834C0.171251 0.850227 0 1.30036 0 1.76972V23L6.50059 15.9224L13 23ZM1.1736 19.9154L5.66968 15.019C5.77867 14.9002 5.90811 14.806 6.05058 14.7416C6.19305 14.6773 6.34577 14.6442 6.5 14.6442C6.65423 14.6442 6.80695 14.6773 6.94942 14.7416C7.09189 14.806 7.22133 14.9002 7.33032 15.019L11.8252 19.9154V1.76972C11.8252 1.63969 11.7779 1.51495 11.6937 1.42277C11.6095 1.33058 11.4952 1.27845 11.3757 1.27778H1.62544C1.50561 1.27778 1.39068 1.32961 1.30594 1.42186C1.22121 1.51412 1.1736 1.63925 1.1736 1.76972V19.9154Z"
        fill={checked ? theme.colors.primary : theme.colors.gray}
      />
    </Svg>
  );
};

export default FavoritesSvg;

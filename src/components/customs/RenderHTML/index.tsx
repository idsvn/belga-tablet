import React, { memo, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

import HTMLView from 'react-native-htmlview';

import theme from 'src/themes';

interface RenderHTMLCustomProps {
  value: string; // HTML string
  fontSize?: number;
}

const RenderHTMLCustom: React.FC<RenderHTMLCustomProps> = ({
  value,
  fontSize = 14,
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        p: {
          fontFamily: theme.fontFamily.regular,
          color: theme.colors.textPrimary,
          fontSize: fontSize + 2,
          lineHeight: fontSize * 1.4,
        },
        strong: {
          fontFamily: theme.fontFamily.semiBold,
          color: theme.colors.textPrimary,
          fontSize: fontSize,
          lineHeight: fontSize * 1.4,
        },
        h1: {
          fontFamily: theme.fontFamily.regular,
          color: theme.colors.textPrimary,
          fontSize: fontSize * 1.5,
          lineHeight: fontSize * 1.4,
        },
        h2: {
          fontFamily: theme.fontFamily.regular,
          color: theme.colors.textPrimary,
          fontSize: fontSize * 1.3,
          lineHeight: fontSize * 1.4,
        },
        a: {
          fontFamily: theme.fontFamily.regular,
          fontSize: fontSize,
          lineHeight: fontSize * 1.4,
          textDecorationLine: 'underline',
          color: 'blue',
        },
        aStrong: {
          fontFamily: theme.fontFamily.bold,
          color: theme.colors.blue1,
          fontSize: fontSize,
          lineHeight: fontSize * 1.4,
          textDecorationLine: 'underline',
        },
      }),
    [fontSize],
  );

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'strong' && parent.name === 'a') {
      return (
        <Text key={index} style={styles.aStrong}>
          {node.children[0].data}
        </Text>
      );
    }

    return undefined;
  };

  return <HTMLView value={value} stylesheet={styles} renderNode={renderNode} />;
};

export default memo(
  RenderHTMLCustom,
  (prev, current) =>
    prev.value === current.value && prev.fontSize === current.fontSize,
);

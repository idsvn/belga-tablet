import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const BelgaItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeLabel}>16:11</Text>
      <View style={styles.content}>
        <Text style={styles.title}>BELGA VIDEO</Text>
        <Text style={styles.description}>
          Centrale banken Oost-Europa verhogen goudvoorraden fors
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.lightGray,
  },
  timeLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.primary,
  },
  content: {
    paddingLeft: 20,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.gray100,
  },
  description: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.black,
  },
});

export default memo(BelgaItem);

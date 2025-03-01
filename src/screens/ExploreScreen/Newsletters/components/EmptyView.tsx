import { StyleSheet, Text, View } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

export const LetterEmptyView = () => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>No newsletters</Text>
        <Text style={styles.description}>
          Please come again later for updates.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    backgroundColor: colors.gray400,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  description: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.gray200,
  },
});

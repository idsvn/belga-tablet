import React from 'react';
import { StyleSheet, View } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import colors from 'src/themes/colors';

export const LoadingView = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.timePlaceholder} />

        <View style={styles.textContainer}>
          <View style={styles.shortText} />
          <View style={styles.mediumText} />
          <View style={styles.veryLongText} />
          <View style={styles.longText} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    position: 'relative',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: colors.gray400,
    borderWidth: 1,
    borderRadius: 6,
  },
  timePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  shortText: {
    marginLeft: 10,
    width: '20%',
    height: 16,
    borderRadius: 4,
  },
  mediumText: {
    marginLeft: 10,
    marginTop: 10,
    width: '40%',
    height: 20,
    borderRadius: 4,
  },
  veryLongText: {
    marginLeft: 10,
    marginTop: 10,
    width: '80%',
    height: 20,
    borderRadius: 4,
  },
  longText: {
    marginLeft: 10,
    marginTop: 10,
    width: '60%',
    height: 20,
    borderRadius: 4,
  },
});

export const SearchLoadingView = () => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <LoadingView />
      <LoadingView />
      <LoadingView />
      <LoadingView />
    </View>
  );
};

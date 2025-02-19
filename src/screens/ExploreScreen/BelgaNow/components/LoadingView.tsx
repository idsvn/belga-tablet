import React from 'react';
import { StyleSheet, View } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LoadingView = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.timePlaceholder} />

        <View style={styles.textContainer}>
          <View style={styles.shortText} />
          <View style={styles.mediumText} />
          <View style={styles.longText} />
          <View style={styles.lineSeparator} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  timePlaceholder: {
    width: 40,
    height: 20,
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
  longText: {
    marginLeft: 10,
    marginTop: 10,
    width: '60%',
    height: 20,
    borderRadius: 4,
  },
  lineSeparator: {
    marginLeft: 10,
    marginTop: 10,
    width: '100%',
    height: 2,
  },
});

export const BelgaLoadingView = () => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <LoadingView />
      <LoadingView />
      <LoadingView />
      <LoadingView />
    </View>
  );
};

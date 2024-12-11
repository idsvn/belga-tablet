import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { Text } from 'src/components';

import theme from 'src/themes';

interface HeaderBarProps {
  title?: string | '';
  onBack?(): void;
  option?: JSX.Element;
}

const HeaderBar = ({ title, onBack, option }: HeaderBarProps) => {
  return (
    <View style={{ overflow: 'hidden' }}>
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <EvilIcons
              name="chevron-left"
              size={40}
              color={theme.colors.textBold}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>{title}</Text>
          {option || <View style={{ width: 20 }}></View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    height: 45,
    alignItems: 'center',
    // paddingHorizontal: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.5 },
    // shadowOpacity: 0.09,
    // elevation: 2,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    marginLeft: theme.spacing.marginHorizontalContent - 35, // subtract icon  back to align center
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.textBold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  wrapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoVNImage: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },
});

export default HeaderBar;

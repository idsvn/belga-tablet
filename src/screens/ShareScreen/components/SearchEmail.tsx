import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { t } from 'i18next';

import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import theme from 'src/themes';
import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const SearchEmail = () => {
  const onSearchChanged = useCallback((text: string) => {}, []);

  return (
    <View>
      <View style={styles.searchView}>
        <SearchIconSvg />
        <TextInput
          style={styles.searchInput}
          placeholder={t('ShareScreen.search')}
          placeholderTextColor={theme.colors.gray200}
          onChangeText={onSearchChanged}
        />
        <TouchableOpacity onPress={() => {}}>
          <VoiceIconSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.recipientsContainer}>
        <View style={styles.recipientsView}>
          <Text style={styles.recipientsTitle}>
            {t('ShareScreen.noRecipientsSelected')}
          </Text>
          <Text style={styles.recipientsDescription}>
            {t('ShareScreen.noRecipientsDescription')}
          </Text>
        </View>
      </View>
      <View style={styles.selectedContainer}>
        <Text
          style={styles.selectedText}
        >{`0 ${t('ShareScreen.selected')}`}</Text>
        <TouchableOpacity>
          <Text style={styles.clearSectionText}>
            {t('ShareScreen.clearSelection')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: colors.gray400,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
    fontSize: 16,
  },
  recipientsContainer: {
    marginTop: 20,
    height: 313,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientsView: {
    alignItems: 'center',
    gap: 20,
  },
  recipientsTitle: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.black100,
  },
  recipientsDescription: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.gray100,
  },
  selectedContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray,
  },
  clearSectionText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.primary,
  },
});

export default memo(SearchEmail);

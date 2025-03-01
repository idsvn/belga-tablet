import React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import i18n, { updateLanguage } from 'src/localization';

import { Language } from 'src/models/systemModel';

import { setPaginationCount } from 'src/redux/slices/systemSlice';
import { RootState } from 'src/redux/store';

import Text from 'components/customs/Text';

import theme from 'src/themes';

import styles from './styles';

const languageData = [
  { label: 'English', value: Language.EN },
  { label: 'Français', value: Language.FR },
  { label: 'Nederlands', value: Language.NL },
];

const paginationData = [
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

const AccountSettingTab = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const paginationCount = useSelector<RootState, number>(
    (state) => state.systemStore.paginationCount,
  );

  console.log(paginationCount);

  const handleChangeLanguage = (data: { label: string; value: Language }) => {
    updateLanguage(data.value);
  };

  const handleChangePaginationData = (data: {
    label: string;
    value: string;
  }) => {
    dispatch(setPaginationCount(Number(data.value)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {t('MoreScreen.MyProfile.accountSettingTab.generalText')}
        </Text>
        <Text style={styles.sectionDescription}>
          {t('MoreScreen.MyProfile.accountSettingTab.descriptionText')}
        </Text>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingTitle}>
          {t('MoreScreen.MyProfile.accountSettingTab.generalSettingsText')}
        </Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingItemText}>
            {t('MoreScreen.MyProfile.accountSettingTab.paginationSettingsText')}
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={paginationData}
            itemTextStyle={{ color: theme.colors.primary }}
            iconStyle={{ tintColor: theme.colors.primary }}
            selectedTextStyle={{
              color: theme.colors.primary,
              textAlign: 'center',
            }}
            value={paginationCount.toString()}
            labelField={'label'}
            valueField={'value'}
            maxHeight={300}
            onChange={handleChangePaginationData}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingItemText}>
            {t('MoreScreen.MyProfile.accountSettingTab.languageSettingsText')}
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={languageData}
            itemTextStyle={{ color: theme.colors.primary }}
            selectedTextStyle={{
              color: theme.colors.primary,
              textAlign: 'center',
            }}
            iconStyle={{ tintColor: theme.colors.primary }}
            value={i18n.language}
            labelField={'label'}
            valueField={'value'}
            maxHeight={300}
            onChange={handleChangeLanguage}
          />
        </View>
      </View>
    </View>
  );
};

export default AccountSettingTab;

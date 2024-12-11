import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UserModel } from 'src/models/userModel';

import { RootState } from 'src/redux/store';

import AccountIcon from 'src/assets/svg/account-icon.svg';
import HelpIcon from 'src/assets/svg/help-icon.svg';
import InfoIcon from 'src/assets/svg/info-icon.svg';
import LogoutIcon from 'src/assets/svg/logout-icon.svg';

import Text from 'components/customs/Text';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import AccountSettingTab from './components/AccountSettingTab';

import { Menu } from './types';

import styles from './styles';

const handleOnPressMenu = (menu: Menu) => {
  if (menu?.link) {
    Linking.openURL(menu.link);
  }
};

const MoreScreen = () => {
  const { t } = useTranslation();

  const Menus: Menu[] = [
    {
      label: t('MoreScreen.MyProfile.accountSettingText'),
      icon: <AccountIcon />,
    },
    {
      label: t('MoreScreen.MyProfile.changePasswordText'),
      icon: <InfoIcon />,
      link: 'https://sso.ssl.belga.be/auth/realms/belga/account/#/security/signingin',
    },
    {
      label: t('MoreScreen.MyProfile.helpText'),
      icon: <HelpIcon />,
      link: 'https://knowledgebase.belga.be/nl/article-categories/belgapress-web/',
    },
    {
      label: t('MoreScreen.MyProfile.logoutText'),
      icon: <LogoutIcon />,
    },
  ];

  const user = useSelector<RootState, UserModel>(
    (state) => state.userStore.user,
  );

  return (
    <PrimaryLayout>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>
            {t('MoreScreen.MyProfile.myProfileText')}
          </Text>
          <Text style={styles.profileEmail}>{user?.email || ''}</Text>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuList}>
            {Menus.map((menu, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleOnPressMenu(menu)}
              >
                {menu.icon}
                <Text style={styles.menuItemText}>{menu.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.tabContainer}>
            <AccountSettingTab />
          </View>
        </View>
      </View>
    </PrimaryLayout>
  );
};

export default MoreScreen;

import React, { useCallback } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { useKeycloak } from '@react-keycloak/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import { UserModel } from 'src/models/userModel';

import { RootState } from 'src/redux/store';

import AccountIcon from 'src/assets/svg/account-icon.svg';
import HelpIcon from 'src/assets/svg/help-icon.svg';
import InfoIcon from 'src/assets/svg/info-icon.svg';
import LogoutIcon from 'src/assets/svg/logout-icon.svg';

import Text from 'components/customs/Text';
import PrimaryLayout from 'components/Layout/PrimaryLayout';
import DownloadIconSvg from 'components/svg/DownloadIconSvg';

import AccountSettingTab from './components/AccountSettingTab';

import { navigate, replace, userSessionManager } from 'App';

import { Menu } from './types';

import styles from './styles';

const MoreScreen = () => {
  const { t } = useTranslation();

  const { keycloak } = useKeycloak();

  const onLogOut = async () => {
    try {
      await keycloak?.logout();
      userSessionManager.reset();
      replace(PATH_SCREEN.INTRODUCE_SCREEN);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnPressMenu = useCallback((menu: Menu) => {
    if (menu?.link) {
      Linking.openURL(menu.link);
    }

    switch (menu.type) {
      case 'logout':
        onLogOut();
        break;
      case 'download':
        navigate(PATH_SCREEN.DOWNLOAD_SCREEN);
        break;

      default:
        break;
    }
  }, []);

  const Menus: Menu[] = [
    {
      type: 'accountSetting',
      label: t('MoreScreen.MyProfile.accountSettingText'),
      icon: <AccountIcon />,
    },
    {
      type: 'changePassword',
      label: t('MoreScreen.MyProfile.changePasswordText'),
      icon: <InfoIcon />,
      link: 'https://sso.ssl.belga.be/auth/realms/belga/account/#/security/signingin',
    },
    {
      type: 'help',
      label: t('MoreScreen.MyProfile.helpText'),
      icon: <HelpIcon />,
      link: 'https://knowledgebase.belga.be/nl/article-categories/belgapress-web/',
    },
    {
      type: 'logout',
      label: t('MoreScreen.MyProfile.logoutText'),
      icon: <LogoutIcon />,
    },
    {
      type: 'download',
      label: t('MoreScreen.MyProfile.downloadText'),
      icon: <DownloadIconSvg />,
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

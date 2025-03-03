import React, { memo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ExploreMenu } from 'src/redux/slices/exploreSlice';
import { RootState } from 'src/redux/store';

import ChevronDown from 'src/assets/svg/chevron-down.svg';
import SearchIcon from 'src/assets/svg/search-icon.svg';
import VoiceIcon from 'src/assets/svg/voice-icon.svg';

import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';

import { MenuIcon } from './MenuList/components/MenuIcon';
import BelgaNowTicker from 'src/screens/ExploreScreen/Explore/components/BelgaNowTicker';

import theme from 'src/themes';

import MenuList from './MenuList';

import styles from './styles';

const iconSize = '30';

const PrimaryHeader = () => {
  const { t } = useTranslation();
  // const [result, setResult] = useState<string>('');

  // const [isLoading, setLoading] = useState(false);

  const [visibleMenuList, setVisibleMenuList] = useState<boolean>(false);

  const currentExploreMenu = useSelector<RootState, ExploreMenu>(
    (state) => state.exploreStore.currentExploreMenu,
  );

  // useEffect(() => {
  //   Voice.onSpeechStart = speechStartHandler;
  //   Voice.onSpeechEnd = speechEndHandler;
  //   Voice.onSpeechResults = speechResultsHandler;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const speechStartHandler = (e) => {
  //   console.log('speechStart successful', e);
  // };

  // const speechEndHandler = (e) => {
  //   setLoading(false);
  //   console.log('stop handler', e);
  // };

  // const speechResultsHandler = (e) => {
  //   const text = e.value[0];

  //   setResult(text);
  // };

  // const startRecording = async () => {
  //   setLoading(true);
  //   try {
  //     await Voice.start('en-Us');
  //     Voice.onSpeechResults = (e) => {
  //       setResult(e?.value[0]);
  //     };
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const showMenuList = () => {
    setVisibleMenuList(!visibleMenuList);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <HeaderTitle
            showMenuList={showMenuList}
            currentExploreMenu={currentExploreMenu}
          />
          {currentExploreMenu === ExploreMenu.EXPLORE && (
            <View style={styles.searchView}>
              <SearchIcon width={20} height={20} />
              <TextInput
                style={styles.searchInput}
                placeholder={t('PrimaryHeader.searchPlaceholderText')}
                placeholderTextColor={theme.colors.primary}
              />
              <TouchableOpacity onPress={() => {}}>
                <VoiceIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {currentExploreMenu === ExploreMenu.EXPLORE && <BelgaNowTicker />}
      {visibleMenuList && (
        <MenuList visible={visibleMenuList} onClose={showMenuList} />
      )}
    </>
  );
};

const HeaderTitle = memo(
  ({
    showMenuList,
    currentExploreMenu,
  }: {
    showMenuList: () => void;
    currentExploreMenu: ExploreMenu;
  }) => {
    return (
      <TouchableOpacity style={styles.menuView} onPress={showMenuList}>
        <MenuIcon menu={currentExploreMenu} iconSize={iconSize} />
        <Text style={styles.menuText}>{currentExploreMenu}</Text>
        <ChevronDown width={17} height={20} />
      </TouchableOpacity>
    );
  },
);

export default PrimaryHeader;

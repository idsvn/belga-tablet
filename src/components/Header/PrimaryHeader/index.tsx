import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import ChevronDown from 'src/assets/svg/chevron-down.svg';
import SearchIcon from 'src/assets/svg/search-icon.svg';
import VoiceIcon from 'src/assets/svg/voice-icon.svg';

import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';
import ExploreSvg from 'components/svg/ExploreSvg';

import theme from 'src/themes';

import MenuList from './MenuList';

import styles from './styles';

const iconSize = '30';

const PrimaryHeader = () => {
  const { t } = useTranslation();
  // const [result, setResult] = useState<string>('');

  // const [isLoading, setLoading] = useState(false);

  const [visibleMenuList, setVisibleMenuList] = useState<boolean>(false);

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
    <View style={{ position: 'relative' }}>
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <TouchableOpacity style={styles.menuView} onPress={showMenuList}>
            <ExploreSvg width={iconSize} height={iconSize} />
            <Text style={styles.menuText}>Explore</Text>
            <ChevronDown width={17} height={20} />
          </TouchableOpacity>
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
        </View>
      </View>
      {visibleMenuList && (
        <MenuList visible={visibleMenuList} onClose={showMenuList} />
      )}
    </View>
  );
};

export default PrimaryHeader;

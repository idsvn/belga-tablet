import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from 'src/assets/svg/back-icon.svg';

import CalendarButton from 'components/CalendarButton';
import CloseIconSvg from 'components/svg/CloseIconSvg';
import DownloadIconSvg from 'components/svg/DownloadIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import Newsletters from './components/Newsletters';
import Publications from './components/Publications';

import { goBack } from 'App';

import colors from 'src/themes/colors';

import styles from './styles';

const DownloadScreen = () => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>();

  const [activeTab, setActiveTab] = useState<'publications' | 'newsletters'>(
    'publications',
  );

  const onSearchChanged = useCallback((text) => {
    setSearchText(text);
  }, []);

  const [date, setDate] = useState(() => {
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

    const today = new Date();

    const dayAgo = new Date();

    dayAgo.setDate(today.getDate() - 1);

    return {
      start: formatDate(dayAgo),
      end: formatDate(today),
    };
  });

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
  }, []);

  const { start, end } = date;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <BackIcon />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <DownloadIconSvg color="black" width={22} height={22} />
        <Text style={styles.titleText}>
          {t('MoreScreen.MyProfile.downloadText')}
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchIconSvg />
          <TextInput
            style={styles.searchInput}
            placeholder={t('ExploreScreen.search')}
            placeholderTextColor={colors.gray200}
            onChangeText={onSearchChanged}
            value={searchText}
          />
          {!!searchText && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <CloseIconSvg />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => {}}>
            <VoiceIconSvg />
          </TouchableOpacity>
        </View>
        <CalendarButton
          initStartDate={start}
          initEndDate={end}
          onSelectStartAndEnd={onSelectStartAndEnd}
          defaultLabel={t('ExploreScreen.last24Hours')}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'publications' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('publications')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'publications' && styles.activeTabText,
            ]}
          >
            Publications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'newsletters' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('newsletters')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'newsletters' && styles.activeTabText,
            ]}
          >
            Newsletters
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'publications' ? <Publications /> : <Newsletters />}
      </View>
    </SafeAreaView>
  );
};

export default memo(DownloadScreen);

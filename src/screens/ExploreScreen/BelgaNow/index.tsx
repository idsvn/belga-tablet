import React, { memo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import BelgaIconSvg from 'components/svg/BelgaIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import BelgaListItem from './components/BelgaListItem';
import DropdownSection from './components/DropdownSection';

import theme from 'src/themes';
import colors from 'src/themes/colors';

import styles from './styles';

enum BelgaNowTab {
  All = 'All',
  Domestic = 'Domestic',
  International = 'International',
  Sports = 'Sports',
}

const BelgaNowTabs = [
  BelgaNowTab.All,
  BelgaNowTab.Domestic,
  BelgaNowTab.International,
  BelgaNowTab.Sports,
];

const BelgaNow = () => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState(BelgaNowTab.All);

  const [topicIds, setTopicIds] = useState<string>();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BelgaIconSvg />
        <View style={styles.titleContainer}>
          <View style={styles.live}>
            <View style={styles.redCircle}></View>
            <Text style={styles.liveTitle}>{t('ExploreScreen.liveTitle')}</Text>
          </View>
          <Text style={styles.title}>{t('ExploreScreen.belgaNow')}</Text>
          <Text style={styles.subTitle}>
            {t('ExploreScreen.belgaNowSubTitle')}
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchIconSvg />
          <TextInput
            style={styles.searchInput}
            placeholder={t('ExploreScreen.belgaNowSearchPlaceHolder')}
            placeholderTextColor={theme.colors.gray200}
          />
          <TouchableOpacity onPress={() => {}}>
            <VoiceIconSvg />
          </TouchableOpacity>
        </View>
        <DropdownSection onSelectTopicIds={setTopicIds} />
      </View>

      <View style={styles.tabBarContainer}>
        {BelgaNowTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setSelectedTab(tab);
            }}
          >
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: tab === selectedTab ? colors.primary : colors.gray100,
                  borderColor:
                    tab === selectedTab ? colors.primary : colors.transparent,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabBarBody}>
        <View style={styles.tabBarBodyHeader}>
          <Text style={styles.allItems}>{t('ExploreScreen.allItems')}</Text>
          <Text style={styles.lastUpdateTime}>
            Update less than a minute ago
          </Text>
        </View>

        <BelgaListItem topics={topicIds} />
      </View>
    </View>
  );
};

export default memo(BelgaNow);

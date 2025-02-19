import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import useDebounce from 'src/hooks/useDebounce';

import BelgaIconSvg from 'components/svg/BelgaIconSvg';

import BelgaListItem from './components/BelgaListItem';
import FilterSection from './components/FilterSection';

import styles from './styles';

const BelgaNow = () => {
  const { t } = useTranslation();

  const [topicIds, setTopicIds] = useState<string>();

  const [languages, setLanguages] = useState<string>();

  const [search, setSearch] = useState<string>();

  const [sourceIds, setSourceIds] = useState<string>();

  const [subSourceIds, setSubSourceIds] = useState<string>();

  const searchDebounce = useDebounce(search, 500);

  const languagesDebounce = useDebounce(languages, 500);

  const topicIdsDebounce = useDebounce(topicIds, 500);

  const sourceIdsDebounce = useDebounce(sourceIds, 500);

  const subSourceIdsDebounce = useDebounce(subSourceIds, 500);

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

      <FilterSection
        onSelectTopicIds={setTopicIds}
        onSelectLanguages={setLanguages}
        onSelectSourceIds={setSourceIds}
        onSelectSubSourceIds={setSubSourceIds}
        onSearchChanged={setSearch}
      />

      <View style={styles.tabBarBody}>
        <View style={styles.tabBarBodyHeader}>
          <Text style={styles.allItems}>{t('ExploreScreen.allItems')}</Text>
          <Text style={styles.lastUpdateTime}>
            Update less than a minute ago
          </Text>
        </View>

        <BelgaListItem
          topics={topicIdsDebounce}
          search={searchDebounce}
          languages={languagesDebounce}
          sourceids={sourceIdsDebounce}
          subsourceids={subSourceIdsDebounce}
        />
      </View>
    </View>
  );
};

export default memo(BelgaNow);

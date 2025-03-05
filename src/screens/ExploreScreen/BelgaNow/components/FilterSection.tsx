import React, { memo, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from 'src/localization';

import { LANGUAGES } from 'src/constants';

import { useBelgaContentTypes } from 'src/services/belgaService';
import { useGetTopics } from 'src/services/topicService';

import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import theme from 'src/themes';
import colors from 'src/themes/colors';

import CustomDropdown from './CustomDropdown';

import styles from '../styles';

interface FilterSectionProps {
  onSelectTopicIds: (topicIds?: string) => void;
  onSelectLanguages: (languages?: string) => void;
  onSelectSourceIds: (value?: string) => void;
  onSelectSubSourceIds: (value?: string) => void;
  onSearchChanged: (search: string) => void;
}

const FilterSection = ({
  onSelectTopicIds,
  onSelectLanguages,
  onSelectSourceIds,
  onSearchChanged,
  onSelectSubSourceIds,
}: FilterSectionProps) => {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>('All');

  const { t } = useTranslation();

  const { data: topicData } = useGetTopics();

  const { data: contentTypeData } = useBelgaContentTypes();

  const topics = useMemo(
    () =>
      topicData?.data
        ?.map((it) => ({
          label: (it.content[i18n.language].title ?? '') as string,
          value: it.id.toString(),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)) ?? [],
    [topicData, t],
  );

  const contentTypes = useMemo(() => {
    if (!contentTypeData) return [];

    return Object.values(
      contentTypeData.reduce<
        Record<string, { label: string; value: string[] }>
      >((acc, { sourceType, id }) => {
        const key = sourceType;

        if (!acc[key]) {
          acc[key] = { label: key, value: [] };
        }

        acc[key].value.push(id.toString());

        return acc;
      }, {}),
    ).map(({ label, value }) => ({
      label,
      value: value.join(','),
    }));
  }, [contentTypeData]);

  const tabs = useMemo(() => {
    if (!contentTypeData) return [];

    const tabValues = Object.entries(
      contentTypeData
        .flatMap(({ subSources }) => subSources)
        .reduce(
          (acc, { id, editorialType }) => {
            const key = editorialType.toUpperCase();

            if (key === 'OTHER') return acc; // Skip 'OTHER' early

            acc[key] = acc[key] || { label: key, value: [] };
            acc[key].value.push(id.toString());

            return acc;
          },
          {} as Record<string, { label: string; value: string[] }>,
        ),
    )
      .map(([__, { label, value }]) => ({ label, value: value.join(',') }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ label: 'All', value: undefined }, ...tabValues];
  }, [contentTypeData]);

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchIconSvg />
          <TextInput
            style={styles.searchInput}
            placeholder={t('ExploreScreen.belgaNowSearchPlaceHolder')}
            placeholderTextColor={theme.colors.gray200}
            onChangeText={onSearchChanged}
          />
          <TouchableOpacity onPress={() => {}}>
            <VoiceIconSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.dropDownContainer}>
          <CustomDropdown
            data={topics}
            selectedValues={selectedTopicIds}
            onChange={(values) => {
              setSelectedTopicIds(values);
              onSelectTopicIds(values.length ? values.join(',') : undefined);
            }}
            placeholder={t('ExploreScreen.topic')}
          />
          <CustomDropdown
            data={contentTypes}
            selectedValues={selectedSourceIds}
            onChange={(values) => {
              setSelectedSourceIds(values);
              onSelectSourceIds(values.length ? values.join(',') : undefined);
            }}
            placeholder={t('ExploreScreen.contentTypes')}
          />
          <CustomDropdown
            data={LANGUAGES}
            selectedValues={selectedLanguages}
            onChange={(values) => {
              setSelectedLanguages(values);
              onSelectLanguages(values.length ? values.join(',') : undefined);
            }}
            placeholder={t('ExploreScreen.languages')}
          />
        </View>
      </View>
      <View style={styles.tabBarContainer}>
        <ScrollView horizontal>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.label}
              style={{ alignItems: 'center' }}
              onPress={() => {
                setSelectedTab(tab.label);
                onSelectSubSourceIds(tab.value);
              }}
            >
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    color:
                      tab.label === selectedTab
                        ? colors.primary
                        : colors.gray100,
                    borderColor:
                      tab.label === selectedTab
                        ? colors.primary
                        : colors.transparent,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default memo(FilterSection);

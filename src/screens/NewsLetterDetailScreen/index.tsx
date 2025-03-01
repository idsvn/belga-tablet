import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import {
  useGetNewsLetter,
  useGetOccurrences,
} from 'src/services/newsLetterService';

import { Letter } from 'src/models/newslettersModel';

import { RootState } from 'src/redux/store';

import CalendarButton from 'components/CalendarButton';
import RenderHTML from 'components/customs/RenderHTML';
import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import NewsLetterDetailItemList from './components/NewsLetterDetailItemList';
import NewsLetterSearchDetail from './components/NewsLetterSearchDetail';

import colors from 'src/themes/colors';

import styles from './style';

const dateFormat = 'YYYY-MM-DD';

const NewsLetterDetailScreen = ({
  letter,
  onBack,
}: {
  letter: Letter;
  onBack: () => void;
}) => {
  const { t } = useTranslation();

  const [searchtext, setSearchtext] = useState<string>();

  const [selectedDate, setSelectedDate] = useState(
    letter.publishDate ? moment(letter.publishDate) : moment(),
  );

  const initialLetterId = useRef(letter.id).current;

  const [letterId, setLetterId] = useState(initialLetterId);

  const scrollViewRef = useRef<any>(null);

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data } = useGetNewsLetter(letterId);

  const startDate = useMemo(
    () => selectedDate.clone().startOf('month').format(dateFormat),
    [selectedDate],
  );

  const endDate = useMemo(
    () => selectedDate.clone().endOf('month').format(dateFormat),
    [selectedDate],
  );

  const { data: occurrencesData } = useGetOccurrences({
    userid: userId,
    recurringId: data?.recurringId,
    params: {
      count: 50,
      from: startDate,
      to: endDate,
    },
  });

  useEffect(() => {
    if (!occurrencesData?.data) return;

    const matchingOccurrence = occurrencesData.data.find(
      (it) =>
        moment(it.date).format(dateFormat) === selectedDate.format(dateFormat),
    );

    const newLetterId = matchingOccurrence?.newsletterId ?? initialLetterId;

    if (newLetterId !== letterId) {
      setLetterId(newLetterId);
    }
  }, [occurrencesData, selectedDate, letterId, initialLetterId]);

  const accentColor = data?.brand?.accentColor;

  const logoUrl = data?.brand?.logo?.url;

  const coverImageUrl = data?.coverImage?.url;

  const newsLetterId = data?.items?.[0]?.newsletterId;

  const onSearchChanged = useCallback((text) => {
    setSearchtext(text);
  }, []);

  const onSelectStartAndEnd = useCallback((start: string) => {
    setSelectedDate(moment(start, dateFormat));
  }, []);

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View style={[styles.headerBackground, { backgroundColor: accentColor }]}>
        <View style={styles.headerNavigation}>
          <Text style={styles.newsLetter} onPress={onBack}>
            {t('ExploreScreen.newsLetter')}
          </Text>
          <ArrowRightIconSvg color={'white'} />
          <Text style={styles.letterName} numberOfLines={1}>
            {letter.name}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <FastImage style={styles.coverImage} source={{ uri: coverImageUrl }} />
        <View style={styles.titleContainer}>
          <FastImage style={styles.logoImage} source={{ uri: logoUrl }} />
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.title}>{letter.name}</Text>
            <Text style={styles.subTitle}>
              {`${occurrencesData?.data.length || 0} ${t('ExploreScreen.newsLetter')}` +
                '  •  ' +
                'By Belga'}
            </Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <SearchIconSvg />
            <TextInput
              style={styles.searchInput}
              placeholder={t(
                'ExploreScreen.newsLettersDetailSearchPlaceHolder',
              )}
              placeholderTextColor={colors.gray200}
              onChangeText={onSearchChanged}
            />
            <TouchableOpacity onPress={() => {}}>
              <VoiceIconSvg />
            </TouchableOpacity>
          </View>
          {!searchtext && (
            <CalendarButton
              onSelectStartAndEnd={onSelectStartAndEnd}
              singleSelect={true}
              initStartDate={selectedDate.format(dateFormat)}
              initEndDate={selectedDate.format(dateFormat)}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          {searchtext ? (
            <NewsLetterSearchDetail
              newsLetterId={newsLetterId}
              searchtext={searchtext}
              start={startDate}
              end={endDate}
            />
          ) : (
            <>
              <RenderHTML value={data?.description ?? ''} fontSize={24} />
              <NewsLetterDetailItemList
                items={data?.items ?? []}
                scrollViewRef={scrollViewRef}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(NewsLetterDetailScreen);

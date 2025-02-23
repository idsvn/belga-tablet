import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { useUpdateTags } from 'src/hooks/useUpdateTags';

import { PATH_SCREEN } from 'src/constants/pathName';
import { QUERY_KEY } from 'src/constants/queryKey';

import newsObjectService from 'src/services/newsObjectService';

import { Attachment, AttachmentType } from 'src/models/systemModel';

import { RootState } from 'src/redux/store';

import { DATE_FORMAT_DDMMYYYY, formatDate } from 'src/utils/dateUtils';

import ReportIcon from 'src/assets/svg/report-icon.svg';
import SentimentIcon from 'src/assets/svg/sentiment-icon.svg';

import RefreshControl from 'components/customs/RefreshControl';
import RenderHTML from 'components/customs/RenderHTML';
import ScrollView from 'components/customs/ScrollView';
import Text from 'components/customs/Text';
import NewspaperDetailHeader from 'components/Header/NewspaperDetailHeader';
import ImageWithSkeleton from 'components/ImageWithSkeleton';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import NewspaperDetailSkeleton from './components/NewspaperDetailSkeleton';

import { getParams, navigate } from 'App';

import styles from './styles';

const NewspaperDetailScreen = () => {
  const { t } = useTranslation();

  const { id } = getParams();

  const fontSizeDefault = useSelector<RootState, number>(
    (state) => state.systemStore.fontSize.fontSizeDefault,
  );

  const {
    data: newspaperDetail,
    isLoading,
    refetch,
  } = useQuery(
    [QUERY_KEY.NEWSPAPER_DETAIL, id],
    async () => await newsObjectService.getNewsObjectById(id),
    { enabled: Boolean(id) },
  );

  const { isFavorite, onUpdateFavorite } = useUpdateTags({
    tags: newspaperDetail?.tags || [],
    id,
  });

  const imagesPage = useMemo(() => {
    const attachments = newspaperDetail?.attachments as Attachment[];

    return attachments?.filter((item) => item.type === AttachmentType.Page);
  }, [newspaperDetail]);

  const imagesBody = useMemo(() => {
    const attachments = newspaperDetail?.attachments as Attachment[];

    return attachments?.filter((item) => item.type === AttachmentType.Image);
  }, [newspaperDetail]);

  const onPressFavorites = () => {
    if (!id) return;
    onUpdateFavorite();
  };

  return (
    <PrimaryLayout
      Header={
        <NewspaperDetailHeader
          isFavorites={isFavorite}
          onPressFavorites={onPressFavorites}
        />
      }
    >
      {!isLoading ? (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          <View style={styles.headerInfo}>
            <ImageWithSkeleton
              imageSource={newspaperDetail?.sourceLogo}
              style={styles.sourceLogo}
            />
            <Text style={[styles.titleText, { fontSize: fontSizeDefault + 6 }]}>
              {newspaperDetail?.subSource || ''}
            </Text>
            <Text
              style={[styles.subSourceText, { fontSize: fontSizeDefault + 6 }]}
            >
              {newspaperDetail?.sourceGroup || ''}
            </Text>
            {newspaperDetail?.publishDate ? (
              <Text
                style={[
                  styles.publishDateText,
                  { fontSize: fontSizeDefault + 6 },
                ]}
              >
                {formatDate(
                  new Date(newspaperDetail.publishDate),
                  DATE_FORMAT_DDMMYYYY,
                )}
              </Text>
            ) : null}
          </View>
          <View style={styles.contentContainer}>
            <ImageWithSkeleton
              imageSource={imagesPage?.[0]?.references?.[0]?.href}
              width={170}
              height={244}
              style={styles.contentImage}
            />
            <Text
              style={[styles.contentTitle, { fontSize: fontSizeDefault + 26 }]}
            >
              {newspaperDetail?.title || ''}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoTitle, { fontSize: fontSizeDefault }]}>
                {t('NewspaperDetailScreen.sentimentText')}
              </Text>
              <View style={styles.infoContent}>
                <SentimentIcon />
                <Text
                  style={[
                    styles.infoContentText,
                    { fontSize: fontSizeDefault + 2 },
                  ]}
                >
                  Positive
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoTitle, { fontSize: fontSizeDefault }]}>
                {t('NewspaperDetailScreen.mediaValueText')}
              </Text>
              <View style={styles.infoContent}>
                <Text
                  style={[
                    styles.infoContentText,
                    { fontSize: fontSizeDefault + 2 },
                  ]}
                >{`€${newspaperDetail?.mediaValue?.amount}`}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoTitle, { fontSize: fontSizeDefault }]}>
                {t('NewspaperDetailScreen.audienceReachText')}
              </Text>
              <View style={styles.infoContent}>
                <Text
                  style={[
                    styles.infoContentText,
                    { fontSize: fontSizeDefault + 2 },
                  ]}
                >{`${newspaperDetail?.audience || 0}`}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoTitle, { fontSize: fontSizeDefault }]}>
                {t('NewspaperDetailScreen.positioningText')}
              </Text>
              <View style={styles.infoContent}>
                <Text
                  style={[
                    styles.infoContentText,
                    { fontSize: fontSizeDefault + 2 },
                  ]}
                >{`${t('NewspaperDetailScreen.pageText')} ${newspaperDetail?.page || 0}, ${newspaperDetail?.wordCount} ${t('NewspaperDetailScreen.wordsText')}`}</Text>
              </View>
            </View>
          </View>
          <View>
            {imagesBody?.map((image, index) => (
              <ImageWithSkeleton
                key={index}
                imageSource={image?.references?.[0]?.href}
                height={503}
                style={styles.imageBodyView}
                imageStyle={styles.imageBodyStyle}
              />
            ))}
            <View style={styles.htmlView}>
              <RenderHTML
                source={{ html: newspaperDetail?.body || '' }}
                fontSize={fontSizeDefault}
              />
            </View>
          </View>
          <View style={styles.issueView}>
            <Text style={[styles.issueText, { fontSize: fontSizeDefault }]}>
              {t('NewspaperDetailScreen.noticedIssueText')}
            </Text>
            <TouchableOpacity
              style={styles.issueButton}
              onPress={() => navigate(PATH_SCREEN.REPORT_ISSUE_SCREEN)}
            >
              <ReportIcon />
              <Text
                style={[styles.issueTextButton, { fontSize: fontSizeDefault }]}
              >
                {t('NewspaperDetailScreen.reportIssueText')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <NewspaperDetailSkeleton />
      )}
    </PrimaryLayout>
  );
};

export default NewspaperDetailScreen;

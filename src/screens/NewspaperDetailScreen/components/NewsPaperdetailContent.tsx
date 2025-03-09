import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import { DeliverableModel } from 'src/models/publicationModel';
import { Attachment, AttachmentType } from 'src/models/systemModel';

import { RootState } from 'src/redux/store';

import { DATE_FORMAT_DDMMYYYY, formatDate } from 'src/utils/dateUtils';
import { getImageUri, isFileExist } from 'src/utils/fileUtils';

import ReportIcon from 'src/assets/svg/report-icon.svg';
import SentimentIcon from 'src/assets/svg/sentiment-icon.svg';

import RefreshControl from 'components/customs/RefreshControl';
import RenderHTML from 'components/customs/RenderHTML';
import ScrollView from 'components/customs/ScrollView';
import Text from 'components/customs/Text';
import NewspaperDetailHeader from 'components/Header/NewspaperDetailHeader';
import ImageWithSkeleton from 'components/ImageWithSkeleton';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import { getParams, navigate } from 'App';

import NewspaperDetailSkeleton from './NewspaperDetailSkeleton';

import styles from '../styles';

const NewsPaperdetailContent = ({
  newspaperDetail,
  onUpdateFavorite,
  isFavorite,
  isLoading = false,
  refetch,
  onPressDownload,
}: {
  newspaperDetail?: DeliverableModel;
  onUpdateFavorite?: () => void;
  isFavorite?: boolean;
  isLoading?: boolean;
  refetch?: () => void;
  onPressDownload?: () => void;
}) => {
  const { t } = useTranslation();

  const { id } = getParams();

  const fontSizeDefault = useSelector<RootState, number>(
    (state) => state.systemStore.fontSize.fontSizeDefault,
  );

  const [logoImageUrl, setLogoImageUrl] = useState<string>();

  const [imageUrls, setImageUrls] = useState<(string | undefined)[]>();

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
    onUpdateFavorite?.();
  };

  useEffect(() => {
    async function getLogoImage() {
      const imageUrl = imagesPage?.[0]?.references?.[0]?.href;

      const isExist = imageUrl && (await isFileExist(imageUrl));

      setLogoImageUrl(isExist ? getImageUri(imageUrl) : imageUrl);
    }

    getLogoImage();
  }, [imagesPage]);

  useEffect(() => {
    async function getImages() {
      const imageUrls = await Promise.all(
        imagesBody.map(async (image) => {
          const imageUrl = image?.references?.[0]?.href;

          const isExist = imageUrl && (await isFileExist(imageUrl));

          return isExist ? getImageUri(imageUrl) : imageUrl;
        }),
      );

      setImageUrls(imageUrls);
    }

    getImages();
  }, [imagesBody]);

  return (
    <PrimaryLayout
      Header={
        <NewspaperDetailHeader
          isFavorites={isFavorite}
          onPressFavorites={onUpdateFavorite ? onPressFavorites : undefined}
          onPressShare={() =>
            navigate(PATH_SCREEN.SHARE_SCREEN, {
              id,
              source: newspaperDetail?.source,
              title: newspaperDetail?.title,
            })
          }
          onPressDownload={onPressDownload}
        />
      }
    >
      {!isLoading ? (
        <ScrollView
          style={styles.container}
          refreshControl={
            refetch && (
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            )
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
            {!!logoImageUrl && (
              <ImageWithSkeleton
                imageSource={logoImageUrl}
                width={170}
                height={244}
                style={styles.contentImage}
              />
            )}
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
            {imageUrls?.map((image, index) => {
              if (image) {
                return (
                  <ImageWithSkeleton
                    key={index}
                    imageSource={image}
                    height={503}
                    style={styles.imageBodyView}
                    imageStyle={styles.imageBodyStyle}
                  />
                );
              }
            })}
            <View style={styles.htmlView}>
              <RenderHTML
                value={`<p>${newspaperDetail?.body || ''}</p>`}
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
              onPress={() => navigate(PATH_SCREEN.REPORT_ISSUE_SCREEN, { id })}
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

export default NewsPaperdetailContent;

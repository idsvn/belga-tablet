import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { useGetOccurrences } from 'src/services/newsObjectService';

import { PublicationsDownloadedModel } from 'src/models/publicationModel';

import { getPublicationByDeliverableId } from 'src/redux/slices/deliverablesSlice';
import {
  addPublication,
  DownloadedPublicationModel,
  getDeliverableId,
} from 'src/redux/slices/downloadSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import { GENERAL_DATE_FORMAT } from 'src/utils/dateUtils';
import { fetchImage } from 'src/utils/fileUtils';

import { globalLoading } from 'components/GlobalLoading';

import { NewsPaperContent } from './components/NewPaperContent';

import { getParams } from 'App';

const NewspaperScreen = () => {
  const { id, sourceId, deliverableModel } = getParams();

  const dispatch = useDispatch<AppDispatch>();

  const { isConnected } = useNetInfo();

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [date, setDate] = useState<string | undefined>();

  const { t } = useTranslation();

  // Fetch occurrences data
  const { data: occurrencesData } = useGetOccurrences({
    userid: userId,
    sourceid: sourceId,
    params: {
      from: '1990-01-01',
      to: moment().format(GENERAL_DATE_FORMAT),
    },
  });

  // Derive deliverableid
  const deliverableid = useMemo(() => {
    return (
      occurrencesData?.data?.find((item) => item.date === date)
        ?.deliverableId ?? id
    );
  }, [occurrencesData, date, id]);

  // Fetch and memoize publications data
  const publicationsData = useSelector<
    RootState,
    PublicationsDownloadedModel[]
  >((state) => state.deliverablesStore.publicationsDownloaded);

  useEffect(() => {
    if (deliverableid) {
      dispatch(getPublicationByDeliverableId({ deliverableid }));
    }
  }, [deliverableid, dispatch]);

  const publications = useMemo(() => {
    return (
      publicationsData?.find((item) => item.deliverableid === deliverableid)
        ?.deliverableModel || []
    );
  }, [publicationsData, deliverableid]);

  const currentDeliverableModel = useMemo(() => {
    return publicationsData.find((item) => item.deliverableid === deliverableid)
      ?.deliverableModel?.[0];
  }, [publicationsData, deliverableid]);

  // Check if publication is downloaded
  const downloadedPublications = useSelector<
    RootState,
    DownloadedPublicationModel[]
  >((state) => state.downloadStore.downloadedPublications);

  const isDownloaded = useMemo(() => {
    if (!currentDeliverableModel) return false;
    const currentId = getDeliverableId(currentDeliverableModel);

    return downloadedPublications.some((item) => {
      const downloadedId = getDeliverableId(item.deliverableModel);

      return downloadedId !== undefined && downloadedId === currentId;
    });
  }, [downloadedPublications, currentDeliverableModel, isDownloading]);

  // Handle download logic
  const onPressDownload = useCallback(async () => {
    if (!isConnected) {
      showMessage({
        message: t('noInternetMessage'),
        type: 'danger',
      });

      return;
    }

    if (!publications || publications.length === 0) {
      showMessage({
        message: t('noPublicationsMessage'),
        type: 'danger',
      });

      return;
    }

    const imageUrls = publications
      .map((item) => item?.attachments?.[0]?.references?.[0]?.href)
      .filter((url): url is string => !!url);

    if (imageUrls.length === 0) {
      showMessage({
        message: t('noImageUrlsMessage'),
        type: 'danger',
      });

      return;
    }

    setIsDownloading(true);
    globalLoading.show();

    try {
      await Promise.all(imageUrls.map(fetchImage));
      dispatch(
        addPublication({
          deliverableModel: currentDeliverableModel ?? deliverableModel,
          publication: publications,
        }),
      );
      showMessage({
        message: t('downloadSuccessMessage'),
        type: 'success',
      });
    } catch (error) {
      console.error('Download error:', error);
      showMessage({
        message: t('downloadErrorMessage'),
        type: 'danger',
      });
    } finally {
      setIsDownloading(false);
      globalLoading.hide();
    }
  }, [
    isConnected,
    publications,
    currentDeliverableModel,
    deliverableModel,
    dispatch,
  ]);

  const onSelectStartAndEnd = useCallback((start: string) => {
    setDate(start);
  }, []);

  return (
    <NewsPaperContent
      publications={publications}
      onPressDownload={isDownloaded ? undefined : onPressDownload}
      onSelectStartAndEnd={onSelectStartAndEnd}
      isDownloading={isDownloading}
    />
  );
};

export default NewspaperScreen;

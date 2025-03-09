import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { useGetOccurrences } from 'src/services/newsObjectService';

import { PublicationsDownloadedModel } from 'src/models/publicationModel';

import { getPublicationByDeliverableId } from 'src/redux/slices/deliverablesSlice';
import {
  addPublication,
  DownloadedPublicationModel,
} from 'src/redux/slices/downloadSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import { GENERAL_DATE_FORMAT } from 'src/utils/dateUtils';
import { fetchImage } from 'src/utils/fileUtils';

import { globalLoading } from 'components/GlobalLoading';

import { NewsPaperContent } from './components/NewPaperContent';

import { getParams } from 'App';

const NewspaperScreen = () => {
  const { id, sourceId, deliverableModel } = getParams();

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const publicationsDownloaded = useSelector<
    RootState,
    PublicationsDownloadedModel[]
  >((state) => state.deliverablesStore.publicationsDownloaded);

  const [date, setDate] = useState<string>();

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { isConnected } = useNetInfo();

  const downloadedPublications = useSelector<
    RootState,
    DownloadedPublicationModel[]
  >((state) => state.downloadStore.downloadedPublications);

  const { data: occurrencesData } = useGetOccurrences({
    userid: userId,
    sourceid: sourceId,
    params: {
      from: '1990-01-01',
      to: moment().format(GENERAL_DATE_FORMAT),
    },
  });

  const deliverableid = useMemo(() => {
    return (
      occurrencesData?.data?.find((it) => it.date === date)?.deliverableId ?? id
    );
  }, [occurrencesData, date]);

  useEffect(() => {
    if (deliverableid) {
      dispatch(getPublicationByDeliverableId({ deliverableid: deliverableid }));
    }
  }, [deliverableid]);

  const currentDeliverableModel = useMemo(() => {
    return (
      publicationsDownloaded.find((it) => it.deliverableid === deliverableid)
        ?.deliverableModel?.[0] ?? deliverableModel
    );
  }, [deliverableid]);

  const isDownloaded = useMemo(() => {
    return downloadedPublications.some(
      (item) =>
        item.deliverableModel.id === currentDeliverableModel.id ||
        item.deliverableModel.id === currentDeliverableModel.deliverableId,
    );
  }, [downloadedPublications, currentDeliverableModel]);

  const publications = useMemo(() => {
    const publicationsExits = publicationsDownloaded?.find(
      (item) => item.deliverableid === deliverableid,
    );

    return publicationsExits?.deliverableModel;
  }, [publicationsDownloaded, deliverableid]);

  const onPressDownload = useCallback(async () => {
    if (!isConnected) {
      showMessage({
        message: 'No Internet',
        type: 'danger',
      });

      return;
    }

    const imageUrls =
      publications?.map(
        (item) => item?.attachments?.[0]?.references?.[0]?.href,
      ) ?? [];

    setIsDownloading(true);
    globalLoading.show();

    try {
      await Promise.all(imageUrls.map(fetchImage));
      dispatch(
        addPublication({
          deliverableModel: currentDeliverableModel,
          publication: publications,
        }),
      );
    } catch (error) {
      showMessage({
        message: 'Downloaded error',
        type: 'danger',
      });
    } finally {
      showMessage({
        message: 'Downloaded successfully',
        type: 'success',
      });
      setIsDownloading(false);
      globalLoading.hide();
    }
  }, [publications, currentDeliverableModel]);

  const onSelectStartAndEnd = useCallback((start: string, __: string) => {
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

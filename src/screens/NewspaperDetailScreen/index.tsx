import { useCallback, useMemo } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateTags } from 'src/hooks/useUpdateTags';

import { QUERY_KEY } from 'src/constants/queryKey';

import newsObjectService from 'src/services/newsObjectService';

import { DeliverableModel } from 'src/models/publicationModel';
import { Attachment, AttachmentType } from 'src/models/systemModel';

import { addNewsPaperDetail } from 'src/redux/slices/downloadSlice';
import { RootState } from 'src/redux/store';

import { fetchImage } from 'src/utils/fileUtils';

import { globalLoading } from 'components/GlobalLoading';

import NewsPaperdetailContent from './components/NewsPaperdetailContent';

import { getParams } from 'App';

const NewspaperDetailScreen = () => {
  const { id } = getParams();

  const dispatch = useDispatch();

  const { isConnected } = useNetInfo();

  const { t } = useTranslation();

  const downloadedNewspaperDetails = useSelector<RootState, DeliverableModel[]>(
    (state) => state.downloadStore.newsletterDetails,
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

  const imageUrls = useMemo(() => {
    const attachments = newspaperDetail?.attachments as Attachment[];

    const iconLogo = attachments?.filter(
      (item) => item.type === AttachmentType.Page,
    )?.[0]?.references?.[0]?.href;

    return [
      iconLogo,
      ...(attachments
        ?.filter((item) => item.type === AttachmentType.Image)
        ?.map((image) => {
          return image?.references?.[0]?.href;
        }) ?? []),
    ].filter(Boolean);
  }, [newspaperDetail]);

  const isDownloaded = useMemo(() => {
    return (
      downloadedNewspaperDetails?.some((item) => item.uuid === id) ?? false
    );
  }, [downloadedNewspaperDetails]);

  const offlineNewspaperDetail = useMemo(() => {
    return downloadedNewspaperDetails?.find((item) => item.uuid === id);
  }, [downloadedNewspaperDetails]);

  const onPressDownload = useCallback(async () => {
    try {
      if (!isConnected) {
        showMessage({
          message: t('noInternetMessage'),
          type: 'danger',
        });

        return;
      }

      globalLoading.show();
      await Promise.all(imageUrls.map(fetchImage));
      dispatch(addNewsPaperDetail(newspaperDetail));
      showMessage({
        message: t('downloadSuccessMessage'),
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: t('downloadErrorMessage'),
        type: 'danger',
      });
      console.error(error);
    } finally {
      globalLoading.hide();
    }
  }, [newspaperDetail, imageUrls, isConnected]);

  return (
    <NewsPaperdetailContent
      newspaperDetail={isConnected ? newspaperDetail : offlineNewspaperDetail}
      isFavorite={isFavorite}
      onUpdateFavorite={onUpdateFavorite}
      isLoading={isLoading && (!!isConnected || !offlineNewspaperDetail)}
      refetch={refetch}
      onPressDownload={isDownloaded ? undefined : onPressDownload}
    />
  );
};

export default NewspaperDetailScreen;

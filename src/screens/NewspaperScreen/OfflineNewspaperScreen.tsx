import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { DownloadedPublicationModel } from 'src/redux/slices/downloadSlice';
import { RootState } from 'src/redux/store';

import { NewsPaperContent } from './components/NewPaperContent';

import { getParams } from 'App';

const OfflineNewspaperScreen = () => {
  const { id } = getParams();

  const downloadedPublications = useSelector<
    RootState,
    DownloadedPublicationModel[]
  >((state) => state.downloadStore.downloadedPublications);

  const offlinePublications = useMemo(() => {
    return downloadedPublications.find(
      (item) => item.deliverableModel.id === id,
    )?.publication;
  }, [downloadedPublications, id]);

  return <NewsPaperContent publications={offlinePublications} />;
};

export default OfflineNewspaperScreen;

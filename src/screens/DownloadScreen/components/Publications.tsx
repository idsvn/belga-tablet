import React, { memo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { t } from 'i18next';
import uniq from 'lodash/uniq';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import {
  DownloadedPublicationModel,
  removePublication,
} from 'src/redux/slices/downloadSlice';
import { RootState } from 'src/redux/store';

import { deleteFile, getImageUri } from 'src/utils/fileUtils';

import TrashIcon from 'src/assets/svg/trash-icon.svg';

import ArticleItem from 'components/ArticleItem';
import CheckBox from 'components/Checkbox';
import ScrollView from 'components/customs/ScrollView';
import { globalLoading } from 'components/GlobalLoading';

import { navigate } from 'App';

import colors from 'src/themes/colors';

import styles from '../styles';

const Publications = () => {
  const downloadedPublications = useSelector<
    RootState,
    DownloadedPublicationModel[]
  >((state) => state.downloadStore.downloadedPublications);

  const dispatch = useDispatch();

  const [selectedPublications, setSelectedPublications] = useState<number[]>(
    [],
  );

  const handleSelectAll = useCallback(() => {
    setSelectedPublications((prev) => {
      if (prev.length === downloadedPublications.length) {
        return [];
      }

      return downloadedPublications.map((it) => it.deliverableModel.id);
    });
  }, [downloadedPublications]);

  const deletePublication = async (
    downloadedPublication: DownloadedPublicationModel,
  ) => {
    const imageUrls =
      downloadedPublication.publication?.map(
        (item) => item?.attachments?.[0]?.references?.[0]?.href,
      ) ?? [];

    await Promise.all(imageUrls.map(deleteFile));

    dispatch(removePublication(downloadedPublication.deliverableModel.id));
  };

  const handleDelete = useCallback(async () => {
    const deletePublications = downloadedPublications.filter((it) =>
      selectedPublications.includes(it.deliverableModel.id),
    );

    try {
      globalLoading.show();

      await Promise.all(deletePublications.map(deletePublication));
      const deletedPublicationIds = deletePublications.map(
        (it) => it.deliverableModel.id,
      );

      setSelectedPublications((prev) =>
        prev.filter((it) => !deletedPublicationIds.includes(it)),
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
      globalLoading.hide();
    }
  }, [downloadedPublications, selectedPublications]);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <ScrollView>
        {selectedPublications.length > 0 && (
          <TouchableOpacity
            style={styles.checkboxView}
            onPress={handleSelectAll}
          >
            <CheckBox
              size={15}
              onPress={handleSelectAll}
              checked={
                selectedPublications.length === downloadedPublications.length
              }
            />
            <Text>{t('FavoritesScreen.allText')}</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          {downloadedPublications?.map((item, index) => {
            const data = item.deliverableModel;

            const imageUrl = getImageUri(
              data?.attachments?.[0]?.references?.[0]?.href ?? '',
            );

            const id = item.deliverableModel.id;

            const publishDate = data.publishDate ?? data.attachments?.[0].date;

            return (
              <ArticleItem
                key={index}
                title={data.source ?? data.subSource}
                imageUrl={imageUrl}
                publishDate={publishDate}
                unread={true}
                onPress={() => {
                  navigate(PATH_SCREEN.OFFLINE_NEWSPAPER_SCREEN, {
                    id: data.id,
                    sourceId: data.sourceId,
                    deliverableModel: data,
                  });
                }}
                isChecked={selectedPublications.includes(id)}
                onCheck={() => {
                  setSelectedPublications((prev) => {
                    if (prev.includes(id)) {
                      return prev.filter((it) => it !== id);
                    }

                    return uniq([...prev, id]);
                  });
                }}
                isDownloaded={true}
              />
            );
          })}
        </View>
      </ScrollView>
      {selectedPublications.length > 0 && (
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            backgroundColor: colors.primary,
            paddingVertical: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text
              style={{ color: '#ffffff', fontWeight: 'bold' }}
            >{`${selectedPublications?.length || 0} ${t('FavoritesScreen.itemSelectedText')}`}</Text>
            {selectedPublications?.length && (
              <TouchableOpacity onPress={handleSelectAll}>
                <Text style={{ color: '#ffffff', fontSize: 12 }}>
                  {t('FavoritesScreen.clearSelectionText')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            <TouchableOpacity onPress={handleDelete}>
              <TrashIcon width={25} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(Publications);

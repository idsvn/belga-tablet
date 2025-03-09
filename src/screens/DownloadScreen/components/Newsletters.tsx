import { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import uniq from 'lodash/uniq';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import { DeliverableModel } from 'src/models/publicationModel';
import { Attachment, AttachmentType } from 'src/models/systemModel';

import { removeNewsPaperDetail } from 'src/redux/slices/downloadSlice';
import { RootState } from 'src/redux/store';

import { deleteFile } from 'src/utils/fileUtils';

import TrashIcon from 'src/assets/svg/trash-icon.svg';

import CheckBox from 'components/Checkbox';
import { globalLoading } from 'components/GlobalLoading';

import FavoritesItem from 'src/screens/FavoritesScreen/components/FavoritesItem';

import { navigate } from 'App';

import colors from 'src/themes/colors';

import styles from '../styles';

const Newsletters = ({
  date,
  searchKeyword,
}: {
  date: { start?: string; end?: string };
  searchKeyword?: string;
}) => {
  const downloadedNewspaperDetails = useSelector<RootState, DeliverableModel[]>(
    (state) => state.downloadStore.newsletterDetails,
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [selectedNewspapers, setSelectedNewspapers] = useState<string[]>([]);

  // New state for filtered newspaper details
  const [filteredNewspaperDetails, setFilteredNewspaperDetails] = useState<
    DeliverableModel[]
  >([]);

  const handleSelectAll = useCallback(() => {
    setSelectedNewspapers((prev) => {
      if (prev.length === filteredNewspaperDetails.length) {
        return [];
      }

      return filteredNewspaperDetails.map((it) => it.uuid);
    });
  }, [filteredNewspaperDetails]);

  const deleteNewspaperDetail = async (
    downloadedNewspaperDetail: DeliverableModel,
  ) => {
    const attachments = downloadedNewspaperDetail?.attachments as Attachment[];

    const iconLogo = attachments?.filter(
      (item) => item.type === AttachmentType.Page,
    )?.[0]?.references?.[0]?.href;

    const imageUrls = [
      iconLogo,
      ...(attachments
        ?.filter((item) => item.type === AttachmentType.Image)
        ?.map((image) => {
          return image?.references?.[0]?.href;
        }) ?? []),
    ].filter(Boolean);

    await Promise.all(imageUrls.map(deleteFile));
    dispatch(removeNewsPaperDetail(downloadedNewspaperDetail.uuid));
  };

  const handleDelete = useCallback(async () => {
    const deletePublications = filteredNewspaperDetails.filter((it) =>
      selectedNewspapers.includes(it.uuid),
    );

    try {
      globalLoading.show();

      await Promise.all(deletePublications.map(deleteNewspaperDetail));
      const deletedPublicationIds = deletePublications.map((it) => it.uuid);

      setSelectedNewspapers((prev) =>
        prev.filter((it) => !deletedPublicationIds.includes(it)),
      );
    } catch (error) {
      showMessage({
        message: 'Delete error',
        type: 'danger',
      });
    } finally {
      showMessage({
        message: 'Delete successfully',
        type: 'success',
      });
      globalLoading.hide();
    }
  }, [filteredNewspaperDetails, selectedNewspapers]);

  const renderItem = useCallback(
    ({ item }) => {
      const id = item.uuid;

      const publishDate = item.publishDate;

      const title = item.title;

      return (
        <FavoritesItem
          {...item}
          title={title}
          publishDate={publishDate}
          body={item.lead}
          onPress={() => {
            navigate(PATH_SCREEN.OFFLINE_NEWSPAPER_DETAIL_SCREEN, {
              newspaperDetail: item,
            });
          }}
          checked={selectedNewspapers.includes(item.uuid)}
          onPressCheckBox={() => {
            setSelectedNewspapers((prev) => {
              if (prev.includes(id)) {
                return prev.filter((it) => it !== id);
              }

              return uniq([...prev, id]);
            });
          }}
        />
      );
    },
    [selectedNewspapers],
  );

  useEffect(() => {
    const filtered = downloadedNewspaperDetails.filter((item) => {
      const publishDate = new Date(item.publishDate || '');

      const isTitleMatch =
        !searchKeyword ||
        (item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ??
          false);

      if (!date.start || !date.end) {
        return isTitleMatch;
      }

      const startDate = new Date(date.start);

      const endDate = new Date(date.end);

      const isWithinDateRange =
        publishDate >= startDate && publishDate <= endDate;

      return isWithinDateRange && isTitleMatch;
    });

    setFilteredNewspaperDetails(filtered);
  }, [downloadedNewspaperDetails, date, searchKeyword]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        {filteredNewspaperDetails.length > 0 && (
          <TouchableOpacity
            style={styles.checkboxView}
            onPress={handleSelectAll}
          >
            <CheckBox
              size={15}
              checked={
                selectedNewspapers.length === filteredNewspaperDetails.length
              }
            />
            <Text>{t('FavoritesScreen.allText')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [selectedNewspapers, filteredNewspaperDetails]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={filteredNewspaperDetails} // Use filtered data
        renderItem={renderItem}
      />
      {selectedNewspapers.length > 0 && (
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
              style={{ color: 'white', fontWeight: 'bold' }}
            >{`${selectedNewspapers?.length || 0} ${t('FavoritesScreen.itemSelectedText')}`}</Text>
            {selectedNewspapers?.length && (
              <TouchableOpacity onPress={handleSelectAll}>
                <Text style={{ color: 'white', fontSize: 12 }}>
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

export default memo(Newsletters);

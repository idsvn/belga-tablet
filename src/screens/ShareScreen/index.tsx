import React, { useCallback, useState } from 'react';
import {
  Clipboard,
  Linking,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { useSendShare } from 'src/services/shareService';

import { RootState } from 'src/redux/store';

import ScrollView from 'components/customs/ScrollView';
import Text from 'components/customs/Text';
import NewspaperDetailHeader from 'components/Header/NewspaperDetailHeader';
import PrimaryLayout from 'components/Layout/PrimaryLayout';
import CopyIconSvg from 'components/svg/CopyIconSvg';
import LinkedinSvg from 'components/svg/LinkedinSvg';
import XIcon from 'components/svg/XIconSvg';

import SearchEmail from './components/SearchEmail';

import { getParams, goBack } from 'App';

import colors from 'src/themes/colors';

import styles from './styles';

const ShareScreen = () => {
  const { t } = useTranslation();

  const { id, source, title } = getParams();

  const shareLink = `https://share.belga.press/news/${id}`;

  const shareMessage = `${source + ' : ' + title} \n ${shareLink}`;

  const [contactIds, setContactIds] = useState<number[]>([]);

  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;

    Linking.openURL(url).catch((err) =>
      console.error('Error opening URL', err),
    );
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&summary=${encodeURIComponent(shareMessage)}`;

    Linking.openURL(linkedInUrl).catch((err) =>
      console.error('Error opening URL', err),
    );
  };

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const userEmail = useSelector<RootState, string>(
    (state) => state.userStore.user.email,
  );

  const [personalizedText, setPersonalizedText] = useState('');

  const { mutateAsync } = useSendShare({
    userId,
    newsObjects: [id],
    recipients: [],
    contactIds: contactIds,
    groupIds: [],
    sender: userEmail,
    personalizedText,
  });

  const onNoteSearchChanged = useCallback((text: string) => {
    setPersonalizedText(text);
  }, []);

  return (
    <PrimaryLayout
      Header={<NewspaperDetailHeader enableRightContent={false} />}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          {t('ShareScreen.shareThisArticle')}
        </Text>
        <Text style={styles.subHeaderText}>{t('ShareScreen.shareLink')}</Text>
        <View style={styles.copyContainer}>
          <View style={styles.copyField}>
            <Text style={styles.linkCopyText}>{shareLink}</Text>
          </View>

          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              Clipboard.setString(shareLink);
              showMessage({ message: 'Link copied', type: 'info' });
            }}
          >
            <CopyIconSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.mediaShareContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={shareToX}>
            <XIcon />
            <Text style={styles.shareButtonText}>
              {t('ShareScreen.shareOnX')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={shareToLinkedIn}
          >
            <LinkedinSvg />
            <Text style={styles.shareButtonText}>
              {t('ShareScreen.shareOnLinkedin')}
            </Text>
          </TouchableOpacity>
        </View>

        <SearchEmail setContactIds={setContactIds} />
        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>{t('ShareScreen.notes')}</Text>
          <TextInput
            style={styles.searchInput}
            multiline
            placeholderTextColor={colors.gray200}
            onChangeText={onNoteSearchChanged}
          />
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => {
            if (contactIds.length === 0) {
              showMessage({
                message: 'Missing information',
                type: 'danger',
              });

              return;
            }

            mutateAsync()
              .then(() => {
                showMessage({
                  message: 'Email has been sent',
                  type: 'success',
                });
                goBack();
              })
              .catch(() => {
                showMessage({
                  message: 'Error',
                  type: 'danger',
                });
              });
          }}
        >
          <Text style={styles.reportButtonText}>SEND</Text>
        </TouchableOpacity>
      </ScrollView>
    </PrimaryLayout>
  );
};

export default ShareScreen;

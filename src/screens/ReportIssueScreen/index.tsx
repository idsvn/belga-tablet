import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';

import { useSendReport } from 'src/services/issuesService';

import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';
import NewspaperDetailHeader from 'components/Header/NewspaperDetailHeader';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import { getParams, goBack } from 'App';

import styles from './styles';

const ReportIssueScreen = () => {
  const [text, setText] = React.useState('');

  const { id } = getParams();

  const { mutateAsync } = useSendReport({
    context: 'NEWSOBJECTS',
    contextId: id,
    pageUrl: `https://web.belga.press/explore/kiosk/article/shared/${id}`,
    issues: [{ issueType: 'OTHER', remarks: text }],
  });

  return (
    <PrimaryLayout
      Header={<NewspaperDetailHeader enableRightContent={false} />}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Report issue</Text>
        <Text style={styles.subHeaderText}>
          Help us improve your reading experience. Noticed an issue? Let us
          know.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} onChangeText={setText} />
          <Text style={styles.charCountText}>
            {`${255 - text.length} characters left`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => {
            mutateAsync()
              .then(() => {
                showMessage({
                  message: 'Thank you for your feedback',
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
          <Text style={styles.reportButtonText}>Report issue</Text>
          <Icon
            name="chevron-small-right"
            size={25}
            color={styles.reportButtonText.color}
            style={styles.reportButtonIcon}
          />
        </TouchableOpacity>
      </View>
    </PrimaryLayout>
  );
};

export default ReportIssueScreen;

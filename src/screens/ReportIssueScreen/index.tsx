import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';
import NewspaperDetailHeader from 'components/Header/NewspaperDetailHeader';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import styles from './styles'; // Import styles

const ReportIssueScreen = () => {
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
          <TextInput style={styles.textInput} />
          <Text style={styles.charCountText}>255 characters left</Text>
        </View>
        <TouchableOpacity style={styles.reportButton}>
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

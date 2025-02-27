import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Letter } from 'src/models/newslettersModel';

import { DATE_FORMAT_DDMMYYYYHHMM, formatDate } from 'src/utils/dateUtils';

import ClockIcon from 'src/assets/svg/clock-icon.svg';

import Text from 'components/customs/Text';

import styles from './styles';

const LetterItem = (props: {
  data: Letter;
  openLetterDetail: (letter: Letter) => void;
}) => {
  const { data, openLetterDetail } = props;

  const { t } = useTranslation();

  const { name, publishDate } = data ?? {};

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        openLetterDetail(data);
      }}
    >
      <View style={styles.titleView}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {name || ''}
          </Text>
          <Text style={styles.byBelgaText} numberOfLines={1}>
            {'By Belga'}
          </Text>
        </View>
        <View style={styles.recurringView}>
          <Text style={styles.recurringText}>
            {t('ExploreScreen.latestPressReleaseItem.recurringText')}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.dateView}>
          <ClockIcon />
          {publishDate ? (
            <Text style={styles.dateText}>
              {formatDate(new Date(publishDate), DATE_FORMAT_DDMMYYYYHHMM)}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LetterItem;

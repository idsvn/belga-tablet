import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Language } from 'src/models/systemModel';

import { DATE_FORMAT_DDMMYYYYHHMM, formatDate } from 'src/utils/dateUtils';

import ClockIcon from 'src/assets/svg/clock-icon.svg';

import Text from 'components/customs/Text';

import { LatestPressReleaseItemProps } from './types';

import styles from './styles';

const LatestPressReleaseItem = (props: LatestPressReleaseItemProps) => {
  const { pressRelease } = props;

  const { t } = useTranslation();

  const { content, publishDate } = pressRelease;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {content?.[Language.EN]?.title || ''}
        </Text>
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

export default LatestPressReleaseItem;

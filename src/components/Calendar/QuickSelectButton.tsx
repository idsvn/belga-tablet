import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useTranslation } from 'react-i18next';

import colors from 'src/themes/colors';

import { DateObject, QuickSelectOptions } from './type';

import { styles } from './styles';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});
export type OnPressQuickSelectType = ({
  startDate,
  endDate,
  label,
}: {
  startDate?: DateObject;
  endDate?: DateObject;
  label: QuickSelectOptions;
}) => void;

interface QuickSelectButtonProps {
  isSelected: boolean;
  onPress: OnPressQuickSelectType;
  option: QuickSelectOptions;
}

const QuickSelectButton: React.FC<QuickSelectButtonProps> = ({
  isSelected,
  onPress,
  option,
}) => {
  const { t } = useTranslation();

  const handlePress = () => {
    const localDate = moment().format('YYYY-MM-DD');

    const today = moment.utc(localDate).startOf('day');

    const tomorrow = moment.utc(today).add(1, 'day').startOf('day');

    const createDateObject = (date: moment.Moment): DateObject => {
      return {
        dateString: date.format('YYYY-MM-DD'), // "YYYY-MM-DD"
        day: date.date(), // Day of the month (1–31)
        month: date.month() + 1, // Month (1–12)
        timestamp: date.valueOf(), // Timestamp in milliseconds
        year: date.year(), // Full year (e.g., 2025)
      };
    };

    let startDate: DateObject = createDateObject(today);

    let endDate: DateObject = startDate;

    switch (option) {
      case QuickSelectOptions.Today:
        startDate = createDateObject(today);
        endDate = startDate;
        break;
      case QuickSelectOptions.Last24Hours:
        startDate = createDateObject(today.subtract(1, 'day'));
        endDate = createDateObject(today);
        break;
      case QuickSelectOptions.Yesterday:
        startDate = createDateObject(today.subtract(1, 'day'));
        endDate = startDate;
        break;
      case QuickSelectOptions.Tomorrow:
        startDate = createDateObject(tomorrow);
        endDate = startDate;
        break;
      case QuickSelectOptions.Last7Days:
        startDate = createDateObject(moment(today).subtract(6, 'days'));
        endDate = createDateObject(today);
        break;
      case QuickSelectOptions.ThisMonth:
        startDate = createDateObject(today.startOf('month'));
        endDate = createDateObject(today.endOf('month'));
        break;
      case QuickSelectOptions.ThisYear:
        startDate = createDateObject(today.startOf('year'));
        endDate = createDateObject(today.endOf('year'));
        break;
      case QuickSelectOptions.ThisWeek:
        startDate = createDateObject(today.startOf('week'));
        endDate = createDateObject(today.endOf('week'));
        break;
      default:
        break;
    }

    onPress({ startDate, endDate, label: option });
  };

  return (
    <TouchableOpacity
      style={[
        styles.quickButton,
        isSelected && { backgroundColor: colors.darkBlue300 },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.textButton}>{t(option)}</Text>
    </TouchableOpacity>
  );
};

export default memo(QuickSelectButton);

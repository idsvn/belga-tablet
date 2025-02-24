import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-native-calendars';

import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

interface DateRangePickerProps {
  startDate?: string; // Optional string in 'YYYY-MM-DD' format
  endDate?: string; // Optional string in 'YYYY-MM-DD' format
  onDatesChange?: ({
    startDate,
    endDate,
    label,
  }: {
    startDate: string;
    endDate: string;
    label: string;
  }) => void; // Optional callback
  onClose?: () => void; // Optional callback when the user dismisses the picker
}

enum QuickSelectOptions {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Next7Days = 'Next 7 days',
  ThisMonth = 'This month',
  ThisYear = 'This year',
}

const QuickSelectButton: React.FC<{
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.quickButton,
        isSelected && { backgroundColor: colors.darkBlue300 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: propStartDate,
  endDate: propEndDate,
  onDatesChange,
  onClose,
}) => {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState<string>(propStartDate || '');

  const [endDate, setEndDate] = useState<string>(propEndDate || '');

  const [markedDates, setMarkedDates] = useState({});

  const [selectedQuickTap, setSelectedQuickTap] =
    useState<QuickSelectOptions>();

  useEffect(() => {
    // Update local state when props change
    setStartDate(propStartDate || '');
    setEndDate(propEndDate || '');

    if (propStartDate && propEndDate) {
      // Mark the date range from props
      const newMarkedDates = {
        [propStartDate]: {
          startingDay: true,
          color: colors.primary, // Blue for selected start date
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary, // Ensure circular blue background
          selectedTextColor: 'white',
          borderRadius: 16, // Make it circular (adjust radius as needed)
        },
        [propEndDate]: {
          endingDay: true,
          color: colors.primary, // Blue for selected end date
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Make it circular (adjust radius as needed)
        },
      };

      // Mark all dates between start and end with light gray
      const currentDate = new Date(propStartDate);

      const end = new Date(propEndDate);

      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];

        if (dateString !== propStartDate && dateString !== propEndDate) {
          newMarkedDates[dateString] = {
            color: colors.lightGray, // Light gray for the range
            textColor: 'black',
            disabled: true,
          };
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setMarkedDates(newMarkedDates);
    } else if (propStartDate) {
      setMarkedDates({
        [propStartDate]: {
          startingDay: true,
          color: colors.primary, // Blue for selected start date
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Make it circular
        },
      });
    } else {
      setMarkedDates({});
    }
  }, [propStartDate, propEndDate]);

  const onDayPress = (day: any) => {
    setSelectedQuickTap(undefined);
    if (!startDate || (startDate && endDate)) {
      // Set new start date
      const newStartDate = day.dateString;

      setStartDate(newStartDate);
      setEndDate('');
      setMarkedDates({
        [newStartDate]: {
          startingDay: true,
          color: colors.primary,
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Circular styling
        },
      });
      if (onDatesChange) {
        onDatesChange(newStartDate, '');
      }
    } else if (startDate && !endDate && day.dateString >= startDate) {
      // Set end date
      const newEndDate = day.dateString;

      setEndDate(newEndDate);
      setMarkedDates({
        ...markedDates,
        [newEndDate]: {
          endingDay: true,
          color: colors.primary, // Blue for selected end date
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Circular styling
        },
        [startDate]: {
          startingDay: true,
          color: colors.primary, // Blue for start date
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Circular styling
        },
      });

      // Mark all dates between start and end with light gray
      const currentDate = new Date(startDate);

      const end = new Date(newEndDate);

      const updatedMarkedDates = {
        ...markedDates,
        [newEndDate]: {
          endingDay: true,
          color: colors.primary,
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16,
        },
      };

      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];

        if (dateString !== startDate && dateString !== newEndDate) {
          updatedMarkedDates[dateString] = {
            color: colors.lightGray,
            textColor: 'black',
            disabled: true,
          };
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setMarkedDates(updatedMarkedDates);
      if (onDatesChange) {
        onDatesChange(startDate, newEndDate);
      }
    } else {
      // Reset if selection is invalid
      const newStartDate = day.dateString;

      setStartDate(newStartDate);
      setEndDate('');
      setMarkedDates({
        [newStartDate]: {
          startingDay: true,
          color: colors.primary,
          textColor: 'white',
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: 'white',
          borderRadius: 16, // Circular styling
        },
      });
      if (onDatesChange) {
        onDatesChange(newStartDate, '');
      }
    }
  };

  useEffect(() => {
    if (selectedQuickTap) {
      setMarkedDates({});
    }
  }, [selectedQuickTap]);

  console.log({ startDate, endDate });

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>CLOSE</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {startDate && endDate && (
            <View
              style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            >
              <Text style={styles.dateText}>
                {startDate ||
                  t('Calendar.selectStartDate', 'Select start date')}
              </Text>
              <ArrowRightIconSvg />
              <Text style={styles.dateText}>
                {endDate || t('Calendar.selectEndDate', 'Select end date')}
              </Text>
            </View>
          )}
          {selectedQuickTap && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{selectedQuickTap}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={onClose}>
          <Text style={styles.apply}>APPLY</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <Calendar
          markingType={startDate === endDate ? undefined : 'period'}
          markedDates={markedDates}
          onDayPress={onDayPress}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1} // Show Monday as first day of week
          theme={{
            selectedDayBackgroundColor: colors.primary, // Blue for selected days
            todayTextColor: colors.primary, // Blue for today's date
            arrowColor: colors.primary, // Blue for navigation arrows
            selectedDayTextColor: 'white', // White text for selected days
            textDayFontSize: 16, // Adjust font size as needed
            textMonthFontSize: 16, // Adjust month font size as needed
            textDayHeaderFontSize: 12, // Adjust day header font size as needed
          }}
        />
      </View>

      <View style={styles.quickSelect}>
        <View style={styles.row}>
          <QuickSelectButton
            title={t('Calendar.todayText', QuickSelectOptions.Today)}
            isSelected={selectedQuickTap === QuickSelectOptions.Today}
            onPress={() => setSelectedQuickTap(QuickSelectOptions.Today)}
          />
          <QuickSelectButton
            title={t('Calendar.tomorrowText', QuickSelectOptions.Tomorrow)}
            isSelected={selectedQuickTap === QuickSelectOptions.Tomorrow}
            onPress={() => setSelectedQuickTap(QuickSelectOptions.Tomorrow)}
          />
          <QuickSelectButton
            title={t('Calendar.next7DaysText', QuickSelectOptions.Next7Days)}
            isSelected={selectedQuickTap === QuickSelectOptions.Next7Days}
            onPress={() => setSelectedQuickTap(QuickSelectOptions.Next7Days)}
          />
        </View>
        <View style={styles.row}>
          <QuickSelectButton
            title={t('Calendar.thisMonthText', QuickSelectOptions.ThisMonth)}
            isSelected={selectedQuickTap === QuickSelectOptions.ThisMonth}
            onPress={() => setSelectedQuickTap(QuickSelectOptions.ThisMonth)}
          />
          <View style={styles.quickButton} />
          <QuickSelectButton
            title={t('Calendar.thisYearText', QuickSelectOptions.ThisYear)}
            isSelected={selectedQuickTap === QuickSelectOptions.ThisYear}
            onPress={() => setSelectedQuickTap(QuickSelectOptions.ThisYear)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  quickSelect: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
  },
  quickButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
  },
  dateText: {
    color: colors.gray100,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  close: {
    color: colors.gray200,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  apply: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  applyButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});

export default DateRangePicker;

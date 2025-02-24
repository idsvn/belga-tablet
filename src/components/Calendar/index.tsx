import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-native-calendars';

import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import colors from 'src/themes/colors';

import QuickSelectButton, { OnPressQuickSelectType } from './QuickSelectButton';

import { DateObject, QuickSelectOptions } from './type';

import { styles } from './styles';

export interface OnDateChangeParams {
  startDate: string;
  endDate: string;
  label?: string;
}
interface DateRangePickerProps {
  startDate?: string; // Optional string in 'YYYY-MM-DD' format
  endDate?: string; // Optional string in 'YYYY-MM-DD' format
  selectedQuickTap?: QuickSelectOptions; // Optional selected quick tap
  setSelectedQuickTap: (quickTap?: QuickSelectOptions) => void; // Optional callback to set selected quick tap
  setStartDate: (date: string) => void; // Optional callback to set start date
  setEndDate: (date: string) => void; // Optional callback to set end date
  onDatesChange?: ({ startDate, endDate, label }: OnDateChangeParams) => void; // Optional callback
  onClose?: () => void; // Optional callback when the user dismisses the picker
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onDatesChange,
  onClose,
  selectedQuickTap,
  setSelectedQuickTap,
}) => {
  const { t } = useTranslation();

  // Use useMemo to calculate markedDates based on startDate and endDate
  const markedDates = useMemo(() => {
    const newMarkedDates: { [key: string]: any } = {};

    if (startDate && endDate) {
      // Mark the start and end dates
      newMarkedDates[startDate] = {
        startingDay: true,
        color: colors.primary,
        textColor: 'white',
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: 'white',
        borderRadius: 16,
      };
      newMarkedDates[endDate] = {
        endingDay: true,
        color: colors.primary,
        textColor: 'white',
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: 'white',
        borderRadius: 16,
      };

      // Mark all dates between start and end with light gray
      const currentDate = new Date(startDate);

      const end = new Date(endDate);

      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];

        if (dateString !== startDate && dateString !== endDate) {
          newMarkedDates[dateString] = {
            color: colors.lightGray,
            textColor: 'black',
            disabled: true,
          };
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (startDate) {
      // Only mark the start date
      newMarkedDates[startDate] = {
        startingDay: true,
        color: colors.primary,
        textColor: 'white',
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: 'white',
        borderRadius: 16,
      };
    }

    return newMarkedDates;
  }, [startDate, endDate]);

  const onDayPress = (day: DateObject) => {
    if (!startDate || (startDate && endDate)) {
      // Set new start date
      const newStartDate = day.dateString;

      setStartDate(newStartDate);
      setEndDate('');
    } else if (startDate && !endDate && day.dateString >= startDate) {
      // Set end date
      const newEndDate = day.dateString;

      setEndDate(newEndDate);
    } else {
      // Reset if selection is invalid
      const newStartDate = day.dateString;

      setStartDate(newStartDate);
      setEndDate('');
    }
  };

  const onQuickButtonPress: OnPressQuickSelectType = useCallback(
    ({ startDate, endDate, label }) => {
      if (startDate) {
        setStartDate(startDate.dateString);
      }

      if (endDate) {
        setEndDate(endDate.dateString);
      }

      setSelectedQuickTap(label);
    },
    [],
  );

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    onDatesChange?.({
      startDate,
      endDate,
      label: selectedQuickTap ? t(selectedQuickTap) : undefined,
    });
  }, [startDate, endDate, selectedQuickTap]);

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
          {startDate && endDate && !selectedQuickTap && (
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
              <Text style={styles.dateText}>{t(selectedQuickTap)}</Text>
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
          onDayPress={(date) => {
            setSelectedQuickTap(undefined);
            onDayPress(date);
          }}
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
            option={QuickSelectOptions.Today}
            isSelected={selectedQuickTap === QuickSelectOptions.Today}
            onPress={onQuickButtonPress}
          />
          <QuickSelectButton
            option={QuickSelectOptions.Tomorrow}
            isSelected={selectedQuickTap === QuickSelectOptions.Tomorrow}
            onPress={onQuickButtonPress}
          />
          <QuickSelectButton
            option={QuickSelectOptions.Next7Days}
            isSelected={selectedQuickTap === QuickSelectOptions.Next7Days}
            onPress={onQuickButtonPress}
          />
        </View>
        <View style={styles.row}>
          <QuickSelectButton
            option={QuickSelectOptions.ThisMonth}
            isSelected={selectedQuickTap === QuickSelectOptions.ThisMonth}
            onPress={onQuickButtonPress}
          />
          <View style={styles.quickButton} />
          <QuickSelectButton
            option={QuickSelectOptions.ThisYear}
            isSelected={selectedQuickTap === QuickSelectOptions.ThisYear}
            onPress={onQuickButtonPress}
          />
        </View>
      </View>
    </View>
  );
};

export default DateRangePicker;

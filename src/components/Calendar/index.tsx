import React, { useMemo, useState } from 'react';
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
  startDate?: string;
  endDate?: string;
  selectedQuickTap?: QuickSelectOptions;
  setSelectedQuickTap: (quickTap?: QuickSelectOptions) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  onDatesChange?: ({ startDate, endDate, label }: OnDateChangeParams) => void;
  onClose?: () => void;
  singleSelect?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  setStartDate,
  setEndDate,
  onDatesChange,
  onClose,
  selectedQuickTap,
  setSelectedQuickTap,
  singleSelect = false,
}) => {
  const { t } = useTranslation();

  const [displayStartDate, setDisplayStartDate] = useState(
    initialStartDate || '',
  );

  const [displayEndDate, setDisplayEndDate] = useState(initialEndDate || '');

  const markedDates = useMemo(() => {
    const newMarkedDates: { [key: string]: any } = {};

    if (displayStartDate && displayEndDate) {
      newMarkedDates[displayStartDate] = {
        startingDay: true,
        color: colors.primary,
        textColor: 'white',
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: 'white',
        borderRadius: 16,
      };
      newMarkedDates[displayEndDate] = {
        endingDay: true,
        color: colors.primary,
        textColor: 'white',
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: 'white',
        borderRadius: 16,
      };

      const currentDate = new Date(displayStartDate);

      const end = new Date(displayEndDate);

      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];

        if (dateString !== displayStartDate && dateString !== displayEndDate) {
          newMarkedDates[dateString] = {
            color: colors.lightGray,
            textColor: 'black',
            disabled: true,
          };
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (displayStartDate) {
      newMarkedDates[displayStartDate] = {
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
  }, [displayStartDate, displayEndDate]);

  const onDayPress = (day: DateObject) => {
    if (singleSelect) {
      setDisplayStartDate(day.dateString);
      setDisplayEndDate(day.dateString);

      return;
    }

    if (!displayStartDate || (displayStartDate && displayEndDate)) {
      const newStartDate = day.dateString;

      setDisplayStartDate(newStartDate);
      setDisplayEndDate('');
    } else if (
      displayStartDate &&
      !displayEndDate &&
      day.dateString >= displayStartDate
    ) {
      const newEndDate = day.dateString;

      setDisplayEndDate(newEndDate);
    } else {
      const newStartDate = day.dateString;

      setDisplayStartDate(newStartDate);
      setDisplayEndDate('');
    }
  };

  const onQuickButtonPress: OnPressQuickSelectType = ({
    startDate,
    endDate,
    label,
  }) => {
    if (startDate) {
      setStartDate(startDate.dateString);
    }

    if (endDate) {
      setEndDate(endDate.dateString);
    }

    setSelectedQuickTap(label);
    if (
      startDate &&
      endDate &&
      (startDate.dateString !== initialStartDate ||
        endDate.dateString !== initialEndDate)
    ) {
      onDatesChange?.({
        startDate: displayStartDate,
        endDate: displayEndDate,
        label: t(label),
      });
    }

    onClose?.();
  };

  const handleApply = () => {
    if (displayStartDate) {
      setStartDate(displayStartDate);
    }

    if (displayEndDate) {
      setEndDate(displayEndDate);
    }

    if (
      displayStartDate &&
      displayEndDate &&
      (displayStartDate !== initialStartDate ||
        displayEndDate !== initialEndDate)
    ) {
      onDatesChange?.({
        startDate: displayStartDate,
        endDate: displayEndDate,
        label: selectedQuickTap ? t(selectedQuickTap) : undefined,
      });
    }

    onClose?.();
  };

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
          {displayStartDate && displayEndDate && !selectedQuickTap && (
            <View
              style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            >
              {displayStartDate === displayEndDate ? (
                <Text style={styles.dateText}>
                  {displayStartDate ||
                    t('Calendar.selectStartDate', 'Select start date')}
                </Text>
              ) : (
                <>
                  <Text style={styles.dateText}>
                    {displayStartDate ||
                      t('Calendar.selectStartDate', 'Select start date')}
                  </Text>
                  <ArrowRightIconSvg />
                  <Text style={styles.dateText}>
                    {displayEndDate ||
                      t('Calendar.selectEndDate', 'Select end date')}
                  </Text>
                </>
              )}
            </View>
          )}
          {selectedQuickTap && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{t(selectedQuickTap)}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.apply}>APPLY</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <Calendar
          current={initialStartDate}
          markingType={
            displayStartDate === displayEndDate ? undefined : 'period'
          }
          markedDates={markedDates}
          onDayPress={(date) => {
            setSelectedQuickTap(undefined);
            onDayPress(date);
          }}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          theme={{
            selectedDayBackgroundColor: colors.primary,
            todayTextColor: colors.primary,
            arrowColor: colors.primary,
            selectedDayTextColor: 'white',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>

      {!singleSelect && (
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
      )}
    </View>
  );
};

export default DateRangePicker;

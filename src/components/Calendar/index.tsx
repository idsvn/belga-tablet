import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import colors from 'src/themes/colors';

import QuickSelectButton, { OnPressQuickSelectType } from './QuickSelectButton';

import { DateObject, QuickSelectOptions } from './type';

import { styles } from './styles';

export interface OnDateChangeParams {
  startDate?: string;
  endDate?: string;
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
  shouldShowWhenever?: boolean;
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
  shouldShowWhenever,
}) => {
  const { t } = useTranslation();

  const [displayStartDate, setDisplayStartDate] = useState(
    initialStartDate || '',
  );

  const [displayEndDate, setDisplayEndDate] = useState(initialEndDate || '');

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear().toString(),
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    setCurrentMonth(new Date().getMonth() + 1);
  }, []);

  const current = useMemo(() => {
    return `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
  }, [currentYear, currentMonth]);

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
    if (!startDate || !endDate) {
      // Clear the calendar highlights by resetting display dates
      setDisplayStartDate('');
      setDisplayEndDate('');

      // Clear the parent state
      setStartDate('');
      setEndDate('');

      // Update the selected quick tap option
      setSelectedQuickTap(label);

      // Trigger onDatesChange with undefined dates
      onDatesChange?.({
        startDate: undefined,
        endDate: undefined,
        label: t(label),
      });

      onClose?.();

      return;
    }

    const newStartDate = startDate.dateString;

    const newEndDate = endDate.dateString;

    setDisplayStartDate(newStartDate);
    setDisplayEndDate(newEndDate);

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    setSelectedQuickTap(label);

    const hasDateChanged =
      newStartDate !== initialStartDate || newEndDate !== initialEndDate;

    const hasLabelChanged = label !== selectedQuickTap;

    if (hasDateChanged || hasLabelChanged) {
      onDatesChange?.({
        startDate: newStartDate,
        endDate: newEndDate,
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

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].map((month, index) => ({
    label: month,
    value: (index + 1).toString(),
  }));

  const CustomHeader = () => {
    const years = useMemo(() => {
      return Array.from({ length: 40 }, (_, i) =>
        (new Date().getFullYear() - i).toString(),
      ).map((year) => ({ label: year, value: year }));
    }, []);

    const onChangeMonth = useCallback((item) => {
      setCurrentMonth(parseInt(item.value));
    }, []);

    const onChangeYear = useCallback((item) => {
      setCurrentYear(item.value);
    }, []);

    return (
      <View style={styles.customHeader}>
        <Dropdown
          style={styles.dropdown}
          data={months}
          labelField="label"
          valueField="value"
          placeholder="Select Month"
          value={currentMonth.toString()}
          iconColor="white"
          onChange={onChangeMonth}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          itemTextStyle={styles.dropdownItemText}
          maxHeight={200}
        />
        <Dropdown
          style={styles.dropdown}
          data={years}
          labelField="label"
          valueField="value"
          placeholder="Select Year"
          value={currentYear}
          onChange={onChangeYear}
          iconColor="white"
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          itemTextStyle={styles.dropdownItemText}
          maxHeight={200}
        />
      </View>
    );
  };

  const renderHeader = useCallback(
    () => <CustomHeader />,
    [currentMonth, currentYear],
  );

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
          key={current}
          current={current}
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
          renderHeader={renderHeader}
        />
      </View>

      {!singleSelect && (
        <View style={styles.quickSelect}>
          <View style={styles.row}>
            <QuickSelectButton
              option={QuickSelectOptions.Last24Hours}
              isSelected={selectedQuickTap === QuickSelectOptions.Last24Hours}
              onPress={onQuickButtonPress}
            />
            <QuickSelectButton
              option={QuickSelectOptions.Yesterday}
              isSelected={selectedQuickTap === QuickSelectOptions.Yesterday}
              onPress={onQuickButtonPress}
            />
            <QuickSelectButton
              option={QuickSelectOptions.Today}
              isSelected={selectedQuickTap === QuickSelectOptions.Today}
              onPress={onQuickButtonPress}
            />
            <QuickSelectButton
              option={QuickSelectOptions.Last7Days}
              isSelected={selectedQuickTap === QuickSelectOptions.Last7Days}
              onPress={onQuickButtonPress}
            />
          </View>
          <View style={styles.row}>
            <QuickSelectButton
              option={QuickSelectOptions.ThisWeek}
              isSelected={selectedQuickTap === QuickSelectOptions.ThisWeek}
              onPress={onQuickButtonPress}
            />
            <QuickSelectButton
              option={QuickSelectOptions.ThisMonth}
              isSelected={selectedQuickTap === QuickSelectOptions.ThisMonth}
              onPress={onQuickButtonPress}
            />
            <QuickSelectButton
              option={QuickSelectOptions.ThisYear}
              isSelected={selectedQuickTap === QuickSelectOptions.ThisYear}
              onPress={onQuickButtonPress}
            />
            {shouldShowWhenever ? (
              <QuickSelectButton
                option={QuickSelectOptions.Whenever}
                isSelected={selectedQuickTap === QuickSelectOptions.Whenever}
                onPress={onQuickButtonPress}
              />
            ) : (
              <View style={styles.quickButton} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DateRangePicker;

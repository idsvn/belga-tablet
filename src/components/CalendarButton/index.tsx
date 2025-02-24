import React, { memo, useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

import DateRangePicker, { OnDateChangeParams } from 'components/Calendar';
import CalendarIconSvg from 'components/svg/CalendarIconSvg';
import ChevronDownIconSvg from 'components/svg/ChevronDownIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

import { QuickSelectOptions } from 'components/Calendar/type';

interface CalendarButtonProps {
  onSelectStartAndEnd: (startDate: string, endDate: string) => void;
}
const CalendarButton = ({ onSelectStartAndEnd }: CalendarButtonProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const [title, setTitle] = useState<string>();

  const [startDate, setStartDate] = useState<string>();

  const [endDate, setEndDate] = useState<string>();

  const [selectedQuickTap, setSelectedQuickTap] =
    useState<QuickSelectOptions>();

  const onClose = useCallback(() => setIsCalendarVisible(false), []);

  const onDatesChange = useCallback(
    ({ startDate, endDate, label }: OnDateChangeParams) => {
      if (label) {
        setTitle(label);
      } else {
        setTitle(`${startDate} > ${endDate}`);
      }

      onSelectStartAndEnd(startDate, endDate);
    },
    [],
  );

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsCalendarVisible(true)}
      >
        <CalendarIconSvg />
        <Text style={styles.title}>{title}</Text>
        <ChevronDownIconSvg width="17" height="20" />
      </TouchableOpacity>
      <>
        <Modal visible={isCalendarVisible} transparent={true}>
          <TouchableOpacity style={styles.overlayStyle} onPress={onClose} />

          <DateRangePicker
            onClose={onClose}
            onDatesChange={onDatesChange}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            setSelectedQuickTap={setSelectedQuickTap}
            selectedQuickTap={selectedQuickTap}
          />
        </Modal>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  title: {
    color: colors.primary,
    fontFamily: fontFamily.bold,
  },
});

export default memo(CalendarButton);

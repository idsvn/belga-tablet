import React, { memo, useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

import DateRangePicker, { OnDateChangeParams } from 'components/Calendar';
import CalendarIconSvg from 'components/svg/CalendarIconSvg';
import ChevronDownIconSvg from 'components/svg/ChevronDownIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

import { QuickSelectOptions } from 'components/Calendar/type';

interface CalendarButtonProps {
  onSelectStartAndEnd: (startDate?: string, endDate?: string) => void;
  singleSelect?: boolean;
  defaultLabel?: string;
  initStartDate?: string;
  initEndDate?: string;
  shouldShowWhenever?: boolean;
}
const CalendarButton = ({
  onSelectStartAndEnd,
  singleSelect = false,
  defaultLabel,
  initStartDate,
  initEndDate,
  shouldShowWhenever = false,
}: CalendarButtonProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const [title, setTitle] = useState<string | undefined>(defaultLabel);

  const [startDate, setStartDate] = useState<string | undefined>(initStartDate);

  const [endDate, setEndDate] = useState<string | undefined>(initEndDate);

  const [selectedQuickTap, setSelectedQuickTap] =
    useState<QuickSelectOptions>();

  const onClose = useCallback(() => setIsCalendarVisible(false), []);

  const onDatesChange = useCallback(
    ({ startDate, endDate, label }: OnDateChangeParams) => {
      if (label) {
        setTitle(label);
      } else {
        if (startDate === endDate) {
          setTitle(startDate);
        } else {
          setTitle(`${startDate} > ${endDate}`);
        }
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
        <Modal
          visible={isCalendarVisible}
          supportedOrientations={['portrait', 'landscape']}
          transparent={true}
        >
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
            singleSelect={singleSelect}
            shouldShowWhenever={shouldShowWhenever}
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
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  title: {
    color: colors.primary,
    fontFamily: fontFamily.bold,
  },
});

export default memo(CalendarButton);

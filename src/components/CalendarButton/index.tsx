import { memo, useCallback, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';

import DateRangePicker from 'components/Calendar';
import CalendarIconSvg from 'components/svg/CalendarIconSvg';

interface CalendarButtonProps {
  onSelectStartAndEnd: (startDate: string, endDate: string) => void;
}
const CalendarButton = ({ onSelectStartAndEnd }: CalendarButtonProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onClose = useCallback(() => setIsCalendarVisible(false), []);

  return (
    <>
      <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
        <CalendarIconSvg />
      </TouchableOpacity>
      <>
        <Modal visible={isCalendarVisible} transparent={true}>
          <TouchableOpacity style={styles.overlayStyle} onPress={onClose} />

          <DateRangePicker onClose={onClose} />
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
});

export default memo(CalendarButton);

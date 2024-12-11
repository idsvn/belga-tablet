import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import { Input } from 'src/components';

import {
  DATE_FORMAT_DDMMYYYY,
  DATE_FORMAT_DDMMYYYYTHHMM,
  formatDate,
} from 'src/utils/dateUtils';
import { heightScreen } from 'src/utils/systemUtils';

import theme from 'src/themes';

interface DateTimePickerProps {
  onGetDate?(currentDate: any): void;
  title?: string;
  value?: Date | string | null;
  modeDate?: any;
  maxDate?: Date;
  minDate?: Date;
  customStyle?: StyleProp<ViewStyle>;
  reducedNumber: number;
  placeholder?: string;
}

const DateTimePicker = ({
  onGetDate,
  title,
  value,
  modeDate,
  maxDate,
  minDate,
  customStyle,
  reducedNumber,
  placeholder,
}: DateTimePickerProps) => {
  const now = new Date();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateCalender, setDateCalender] = useState(new Date());

  useEffect(() => {
    setDateCalender(
      new Date(
        value || new Date(now.setFullYear(now.getFullYear() - reducedNumber)),
      ),
    );
  }, [value]);

  const onConfirm = (date: any) => {
    setDateCalender(date);
    onGetDate?.(date);
    setShowDatePicker(false);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const getDisplay = () => {
    if (Platform.OS === 'ios') {
      if (parseFloat(Platform.Version) >= 14) {
        return 'inline';
      } else {
        return 'spinner';
      }
    } else {
      return 'compact';
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.itemBoxBtn, customStyle]}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Input
          value={
            value
              ? formatDate(
                  new Date(value),
                  modeDate === 'date'
                    ? DATE_FORMAT_DDMMYYYY
                    : DATE_FORMAT_DDMMYYYYTHHMM,
                )
              : ''
          }
          title={title}
          editable={false}
          placeholder={placeholder}
        />
        <View style={styles.itemRightView}>
          <FontistoIcon name="date" size={20} />
          <EvilIcons name="chevron-right" size={25} />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePickerModal
          isVisible={showDatePicker}
          testID="dateTimePicker"
          date={dateCalender}
          locale="vi_VN"
          mode={modeDate}
          is24Hour={true}
          minimumDate={minDate || new Date('1920-01-01 12:00')}
          display={getDisplay()}
          onConfirm={onConfirm}
          onCancel={onCancel}
          maximumDate={maxDate || new Date('2920-01-01')}
          style={{ height: heightScreen / 1.5 }}
        />
      )}
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDate: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 5,
    // paddingVertical: 14,
  },
  text: {
    // color: themes.,
  },
  dateText: {
    // color: themes.color.textBlack,
  },
  calendarIcon: {
    paddingLeft: 70,
  },
  //
  itemBoxBtn: {
    backgroundColor: theme.colors.gray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderRadius: theme.borders.medium,
    // marginTop: themes.spacing.marginVerticalContent,
    // paddingVertical: themes.spacing.marginHorizontalContent,
    // marginHorizontal: themes.spacing.marginHorizontalContent,
  },
  titleBoxText: {},
  itemRightView: {
    display: 'flex',
    flexDirection: 'row',
  },
  valueBoxText: {
    color: theme.colors.placeholderTextInput,
  },
});

import { memo } from 'react';
import { Text, View } from 'react-native';

import { MultiSelect } from 'react-native-element-dropdown';

import CheckBox from 'components/Checkbox';

import colors from 'src/themes/colors';

import styles from '../styles';

interface CustomDropdownProps {
  data: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

const CustomDropdown = ({
  data,
  selectedValues,
  onChange,
  placeholder,
}: CustomDropdownProps) => {
  return (
    <MultiSelect
      style={styles.dropdown}
      data={data}
      placeholder={
        placeholder +
        (selectedValues.length > 0 ? ` (${selectedValues.length})` : '')
      }
      itemTextStyle={styles.dropdownText}
      placeholderStyle={styles.dropdownText}
      iconColor={colors.primary}
      value={selectedValues}
      labelField="label"
      valueField="value"
      maxHeight={300}
      renderItem={(item, selected) => (
        <View style={styles.dropdownCheckbox}>
          <CheckBox checked={selected} />
          <Text style={styles.dropdownText}>{item.label}</Text>
        </View>
      )}
      onChange={onChange}
      selectedStyle={{ display: 'none' }}
    />
  );
};

export default memo(CustomDropdown);

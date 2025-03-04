import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import theme from 'src/themes';
import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

interface CustomDropdownProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const SEARCH_TYPE: { label: string; value: string }[] = [
  { label: 'One of', value: 'one_of' },
  { label: 'All of', value: 'all_of' },
  { label: 'Exact', value: 'exact' },
];

const DropdownSearchType = ({
  selectedValue,
  onChange,
}: CustomDropdownProps) => {
  return (
    <Dropdown
      style={styles.dropdown}
      data={SEARCH_TYPE}
      itemTextStyle={styles.dropdownText}
      placeholderStyle={styles.dropdownText}
      iconStyle={{ tintColor: theme.colors.primary }}
      value={selectedValue}
      labelField="label"
      valueField="value"
      maxHeight={300}
      renderItem={(item) => {
        return (
          <View style={styles.dropdownItem}>
            <Text
              style={[
                styles.dropdownText,
                {
                  color:
                    selectedValue === item.value
                      ? colors.primary
                      : colors.black,
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
        );
      }}
      onChange={(item) => onChange(item.value)}
      selectedTextStyle={styles.dropdownText}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: 100,
    backgroundColor: colors.lightBlue200,
    borderColor: colors.gray400,
  },
  dropDownContainer: {
    paddingHorizontal: 10,
    flex: 1.5,
    flexDirection: 'row',
    gap: 10,
  },
  dropdownText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primary,
    textTransform: 'capitalize',
    flex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default memo(DropdownSearchType);

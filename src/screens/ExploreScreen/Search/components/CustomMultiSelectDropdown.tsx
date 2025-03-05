// CustomMultiSelectDropdown.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CheckBox from 'components/Checkbox';
import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

interface Option {
  label: string;
  value: number | string;
}

interface CustomMultiSelectDropdownProps {
  options: Option[];
  onSelectionChange: (selectedValues: (number | string)[]) => void;
  placeholder?: string;
  selectedValues?: (number | string)[];
}

const CustomMultiSelectDropdown: React.FC<CustomMultiSelectDropdownProps> = ({
  options,
  onSelectionChange,
  placeholder = 'Select options...',
  selectedValues = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItems, setSelectedItems] =
    useState<(number | string)[]>(selectedValues);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: number | string) => {
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleSelect(item.value as number)}
    >
      <CheckBox
        size={15}
        checked={selectedItems.includes(item.value as number)}
        onPress={() => handleSelect(item.value)}
      />
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text style={styles.dropdownText}>{placeholder}</Text>
          <View style={styles.count}>
            <Text style={styles.count}>{selectedItems.length}</Text>
          </View>
        </View>
        <View style={{ transform: [{ rotate: isOpen ? '90deg' : '90deg' }] }}>
          <ArrowRightIconSvg color={colors.gray} />
        </View>
      </TouchableOpacity>

      {isOpen && options.map((option) => renderOption({ item: option }))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: colors.lightGray,
  },
  dropdownButton: {
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  count: {
    width: 20,
    height: 20,
    borderRadius: 10,
    lineHeight: 20,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: 'white',
    backgroundColor: colors.primary,
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textTransform: 'capitalize',
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
});

export default CustomMultiSelectDropdown;

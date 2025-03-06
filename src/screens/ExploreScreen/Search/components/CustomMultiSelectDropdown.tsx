import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

import CheckBox from 'components/Checkbox';
import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

export interface Option {
  label: string;
  value: number | string;
  icon?: any;
}

interface CustomMultiSelectDropdownProps {
  options: Option[];
  onSelectionChange: (selectedValues: (number | string)[]) => void;
  title?: string;
  selectedValues?: (number | string)[];
  isOpen?: boolean;
  setIsOpen(title?: string): void;
}

const CustomMultiSelectDropdown: React.FC<CustomMultiSelectDropdownProps> = ({
  options,
  onSelectionChange,
  title = 'Select options...',
  selectedValues = [],
  isOpen,
  setIsOpen,
}) => {
  const [selectedItems, setSelectedItems] =
    useState<(number | string)[]>(selectedValues);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSelectedItems(selectedValues);
  }, [selectedValues]);

  const toggleDropdown = () => {
    setIsOpen(isOpen ? undefined : title || '');
  };

  const handleSelect = (value: number | string) => {
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };

  const renderOption = ({ item }: { item: Option }) => {
    const Icon = item.icon;

    const isSelected = selectedItems.includes(item.value);

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handleSelect(item.value)}
      >
        <CheckBox
          size={15}
          checked={isSelected}
          onPress={() => handleSelect(item.value)}
        />
        {item.icon && <Icon />}
        <Text
          style={[
            styles.optionText,
            {
              color: isSelected ? colors.darkBlue200 : colors.gray100,
            },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <View style={styles.dropdownContent}>
          <Text style={styles.dropdownText}>{title}</Text>
          <View style={styles.countContainer}>
            <Text style={styles.count}>{selectedItems.length}</Text>
          </View>
        </View>
        <View style={{ transform: [{ rotate: !isOpen ? '90deg' : '-90deg' }] }}>
          <ArrowRightIconSvg color={colors.gray} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View>
          {options.length > 8 && (
            <View style={styles.searchInput}>
              <SearchIconSvg />
              <TextInput
                style={{ flex: 1, color: colors.gray100 }}
                placeholderTextColor={colors.gray100}
                placeholder="Search"
                onChangeText={setSearchText}
              />
            </View>
          )}
          {options
            .filter((it) =>
              it.label
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase()),
            )
            .map((option) => renderOption({ item: option }))}
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownText: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: colors.darkBlue200,
  },
  countContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  count: {
    fontSize: 14,
    color: 'white',
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  optionText: {
    fontSize: 18,
    fontFamily: fontFamily.regular,
    textTransform: 'capitalize',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    marginVertical: 16,
    height: 40,
    width: '100%',
    fontSize: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
  },
});

export default CustomMultiSelectDropdown;

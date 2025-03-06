import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScrollView from 'components/customs/ScrollView';
import CloseIconSvg from 'components/svg/CloseIconSvg';
import TrashIconSvg from 'components/svg/TrashIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

import CustomMultiSelectDropdown, { Option } from './CustomMultiSelectDropdown';

import { FilterSection } from '../type';

export interface FilterCategory {
  title: FilterSection;
  options: Option[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selections: Record<string, (number | string)[]>;
  setSelections: (selections: Record<string, (number | string)[]>) => void;
  categories: FilterCategory[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selections,
  setSelections,
  categories,
}) => {
  const { top } = useSafeAreaInsets();

  const [selectedDropdown, setSelectedDropdown] = useState<
    string | undefined
  >();

  const [tempSelections, setTempSelections] = useState(selections);

  useEffect(() => {
    setTempSelections(selections);
  }, [selections]);

  const handleSelectionChange = useCallback(
    (categoryTitle: string, values: (number | string)[]) => {
      setTempSelections((prev) => ({
        ...prev,
        [categoryTitle]: values,
      }));
    },
    [],
  );

  const handleClose = useCallback(() => {
    setTempSelections(selections);
    setSelectedDropdown(undefined);
    onClose();
  }, [selections, onClose]);

  const handleApply = useCallback(() => {
    setSelections(tempSelections);
    setSelectedDropdown(undefined);
    onClose();
  }, [tempSelections, setSelections, onClose]);

  const hasSelections = Object.values(tempSelections).some(
    (arr) => arr.length > 0,
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={[styles.modalContent, { marginTop: top }]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={handleClose}>
            <CloseIconSvg />
          </TouchableOpacity>
        </View>
        {hasSelections && (
          <View style={styles.selectionContainer}>
            {Object.entries(tempSelections).map(([category, values]) =>
              values.length > 0 ? (
                <View key={category} style={styles.selectionItem}>
                  <View style={styles.selectionTextContainer}>
                    <Text
                      style={styles.selectionCategory}
                    >{`${category}: `}</Text>
                    <Text style={styles.selectionValues}>
                      {values.join(', ')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSelectionChange(category, [])}
                  >
                    <TrashIconSvg color={colors.gray100} />
                  </TouchableOpacity>
                </View>
              ) : null,
            )}
          </View>
        )}
        <ScrollView style={styles.scrollView}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <View key={category.title} style={styles.categoryContainer}>
                <CustomMultiSelectDropdown
                  isOpen={selectedDropdown === category.title}
                  setIsOpen={setSelectedDropdown}
                  options={category.options}
                  onSelectionChange={(values) =>
                    handleSelectionChange(category.title, values)
                  }
                  title={category.title}
                  selectedValues={tempSelections[category.title] || []}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noFiltersText}>No filters available</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={handleApply} style={styles.applyFilters}>
          <Text style={styles.applyFilterText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  scrollView: {
    paddingHorizontal: 10,
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  applyFilters: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
  },
  applyFilterText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: 'white',
  },
  selectionContainer: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectionCategory: {
    fontFamily: fontFamily.bold,
    color: colors.gray100,
    fontSize: 18,
  },
  selectionValues: {
    textTransform: 'capitalize',
    fontFamily: fontFamily.regular,
    color: colors.gray100,
    fontSize: 18,
  },
  noFiltersText: {
    fontSize: 16,
    color: colors.gray100,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fontFamily.regular,
  },
});

export default React.memo(FilterModal);

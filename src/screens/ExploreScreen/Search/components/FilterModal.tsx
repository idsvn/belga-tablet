// FilterModal.tsx
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomMultiSelectDropdown from './CustomMultiSelectDropdown';

interface Option {
  label: string;
  value: number | string;
}

export interface FilterCategory {
  title: string;
  options: Option[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectionsChange: (selections: Record<string, (number | string)[]>) => void;
  categories: FilterCategory[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onSelectionsChange,
  categories,
}) => {
  const [selections, setSelections] = useState<
    Record<string, (number | string)[]>
  >({});

  const handleSelectionChange = (
    categoryTitle: string,
    values: (number | string)[],
  ) => {
    setSelections((prev) => ({
      ...prev,
      [categoryTitle]: values,
    }));
    onSelectionsChange({
      ...selections,
      [categoryTitle]: values,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>FILTERS</Text>

          {categories.map((category) => (
            <View key={category.title} style={styles.categoryContainer}>
              <CustomMultiSelectDropdown
                options={category.options}
                onSelectionChange={(values) =>
                  handleSelectionChange(category.title, values)
                }
                placeholder={category.title}
                selectedValues={selections[category.title] || []}
              />
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryContainer: {},
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FilterModal;

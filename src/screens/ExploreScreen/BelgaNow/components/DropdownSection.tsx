import { memo, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-native-element-dropdown';
import i18n from 'src/localization';

import { useGetTopics } from 'src/services/topicService';

import CheckBox from 'components/Checkbox';

import theme from 'src/themes';

import styles from '../styles';

interface DropDownSectionProps {
  onSelectTopicIds: (topicIds?: string) => void;
}

const DropdownSection = ({ onSelectTopicIds }: DropDownSectionProps) => {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  const { t } = useTranslation();

  const { data: topicData } = useGetTopics();

  const topics = useMemo(() => {
    return (
      topicData?.data
        ?.map((it) => ({
          label: (it.content[i18n.language].title ?? '') as string,
          value: it.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [topicData, t]);

  // Handle selection
  const handleTopicChange = (selectedValues: string[]) => {
    setSelectedTopicIds(selectedValues);
    onSelectTopicIds(
      selectedValues.length ? selectedValues.join(',') : undefined,
    ); // Notify parent component
  };

  return (
    <View style={styles.dropDownContainer}>
      <MultiSelect
        style={styles.dropdown}
        data={topics}
        placeholder={
          t('ExploreScreen.topic') +
          (selectedTopicIds.length > 0 ? ` (${selectedTopicIds.length})` : '')
        }
        itemTextStyle={styles.dropdownText}
        placeholderStyle={styles.dropdownText}
        iconStyle={{ tintColor: theme.colors.primary }}
        value={selectedTopicIds}
        labelField="label"
        valueField="value"
        maxHeight={300}
        renderItem={(item, selected) => {
          return (
            <View style={styles.dropdownCheckbox}>
              <Text style={styles.dropdownText}>{item.label}</Text>
              <CheckBox checked={selected} />
            </View>
          );
        }}
        onChange={handleTopicChange}
        selectedStyle={{
          display: 'none',
        }}
      />

      {/* Other Dropdowns */}
      <MultiSelect
        style={styles.dropdown}
        data={[]}
        itemTextStyle={styles.dropdownText}
        selectedTextStyle={{
          color: theme.colors.primary,
          textAlign: 'center',
        }}
        iconStyle={{ tintColor: theme.colors.primary }}
        value={[]}
        labelField="label"
        valueField="value"
        maxHeight={300}
        onChange={() => {}}
      />
      <MultiSelect
        style={styles.dropdown}
        data={[]}
        itemTextStyle={styles.dropdownText}
        selectedTextStyle={{
          color: theme.colors.primary,
          textAlign: 'center',
        }}
        iconStyle={{ tintColor: theme.colors.primary }}
        value={[]}
        labelField="label"
        valueField="value"
        maxHeight={300}
        onChange={() => {}}
      />
    </View>
  );
};

export default memo(DropdownSection);

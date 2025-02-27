import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { t } from 'i18next';
import uniqBy from 'lodash/uniqBy';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import useDebounce from 'src/hooks/useDebounce';

import { useGetContact } from 'src/services/shareService';

import { Contact } from 'src/models/contactModel';

import { RootState } from 'src/redux/store';

import CloseIcon from 'src/assets/svg/close-icon.svg';

import PlusIconSvg from 'components/svg/PlusIconSvg';
import ProfileIconSvg from 'components/svg/ProfileIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import TrashIconSvg from 'components/svg/TrashIconSvg';

import theme from 'src/themes';
import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const SearchEmail = ({
  setContactIds,
}: {
  setContactIds: (value: number[]) => void;
}) => {
  const [searchText, setSearchText] = useState('');

  const textInputRef = useRef<TextInput>(null);

  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  const debounceSearch = useDebounce(searchText, 500);

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data } = useGetContact({ userId, search: debounceSearch });

  useEffect(() => {
    if (data?.data) {
      setContacts(
        uniqBy([selectedContacts, data.data].flat(), (it: Contact) => it.id),
      );
    }
  }, [data, selectedContacts]);

  useEffect(() => {
    setContactIds(selectedContacts.map((it) => it.id));
  }, [selectedContacts]);

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => {
      const isSelected = selectedContacts.some((it) => it.id === item.id);

      return (
        <TouchableOpacity
          style={[
            styles.contactItem,
            { backgroundColor: isSelected ? colors.lightBlue200 : 'white' },
          ]}
          onPress={() => {
            setSelectedContacts((prev) => {
              if (prev.some((contact) => contact.id === item.id)) {
                return prev.filter((contact) => contact.id !== item.id);
              } else {
                return [...prev, item];
              }
            });
          }}
        >
          <View style={{ alignSelf: 'flex-start', paddingTop: 4 }}>
            <ProfileIconSvg />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={styles.name}
            >{`${item.firstName ?? ''} ${item.lastName ?? ''}`}</Text>
            <View style={styles.emailContainer}>
              <Text style={styles.collaboration}>
                {item.collaboration.slice(0, 3)}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>

          {isSelected ? <TrashIconSvg /> : <PlusIconSvg />}
        </TouchableOpacity>
      );
    },
    [selectedContacts],
  );

  const renderRecipientItem = useCallback(({ item }: { item: Contact }) => {
    const isSelected = selectedContacts.some((it) => it.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.contactItem, { backgroundColor: 'white' }]}
        onPress={() => {
          setSelectedContacts((prev) => {
            if (prev.some((contact) => contact.id === item.id)) {
              return prev.filter((contact) => contact.id !== item.id);
            } else {
              return [...prev, item];
            }
          });
        }}
      >
        <View style={{ alignSelf: 'flex-start', paddingTop: 4 }}>
          <ProfileIconSvg />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={[styles.name, { width: '30%' }]}
          >{`${item.firstName ?? ''} ${item.lastName ?? ''}`}</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.collaboration}>
              {item.collaboration.slice(0, 3)}
            </Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
        {isSelected ? <TrashIconSvg color={colors.red1} /> : <PlusIconSvg />}
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
      <View style={styles.searchView}>
        <SearchIconSvg />
        <TextInput
          ref={textInputRef}
          onFocus={() => {
            setIsTextInputFocused(true);
          }}
          onBlur={() => {
            setIsTextInputFocused(false);
          }}
          style={styles.searchInput}
          placeholder={t('ShareScreen.search')}
          placeholderTextColor={theme.colors.gray200}
          onChangeText={setSearchText}
        />
        {!!searchText && (
          <TouchableOpacity
            onPress={() => {
              textInputRef.current?.clear();
            }}
          >
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.recipientsContainer}>
        {selectedContacts.length > 0 ? (
          <FlatList
            style={styles.recipientsFlatList}
            bounces={false}
            data={selectedContacts}
            keyboardShouldPersistTaps="always"
            renderItem={renderRecipientItem}
          />
        ) : (
          <View style={styles.recipientsView}>
            <Text style={styles.recipientsTitle}>
              {t('ShareScreen.noRecipientsSelected')}
            </Text>
            <Text style={styles.recipientsDescription}>
              {t('ShareScreen.noRecipientsDescription')}
            </Text>
          </View>
        )}
        {isTextInputFocused && (
          <View style={styles.recipientsList}>
            <FlatList
              bounces={false}
              data={contacts}
              keyboardShouldPersistTaps="always"
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
      <View style={styles.selectedContainer}>
        <Text
          style={styles.selectedText}
        >{`${selectedContacts.length} ${t('ShareScreen.selected')}`}</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedContacts([]);
          }}
        >
          <Text style={styles.clearSectionText}>
            {t('ShareScreen.clearSelection')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: colors.gray400,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
    fontSize: 16,
  },
  recipientsContainer: {
    marginTop: 20,
    height: 313,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  recipientsView: {
    alignItems: 'center',
    gap: 20,
  },
  recipientsTitle: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.black100,
  },
  recipientsDescription: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.gray100,
  },
  selectedContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray,
  },
  clearSectionText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.primary,
  },
  recipientsList: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: 300,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  name: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.black100,
  },
  email: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray,
  },
  emailContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingTop: 5,
    alignItems: 'center',
  },
  collaboration: {
    backgroundColor: colors.lightBlue200,
    padding: 3,
    borderRadius: 10,
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.primary,
  },
  recipientsFlatList: {
    width: '100%',
    height: 300,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
});

export default memo(SearchEmail);

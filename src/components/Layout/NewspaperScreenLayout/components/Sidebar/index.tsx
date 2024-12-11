import React, { useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { PATH_SCREEN } from 'src/constants/pathName';

import { widthScreen } from 'src/utils/systemUtils';

import Text from 'components/customs/Text';

import { navigate } from 'App';

import NewObjectItem from '../NewObjectItem';

import { SidebarProps } from './types';

import styles from './styles';

const Sidebar = (props: SidebarProps) => {
  const { t } = useTranslation();

  const { showSidebar, newsObjects = [], pageNumber = 0, onClose } = props;

  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: showSidebar ? 400 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showSidebar]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: showSidebar ? widthScreen : 0,
        },
      ]}
      onPress={onClose}
    >
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.listView, { width: widthAnim }]}>
          <View style={styles.articleView}>
            <Text
              style={styles.articleText}
            >{`${t('NewspaperScreen.sidebar.articlesPageText')} ${pageNumber}`}</Text>
          </View>
          <FlatList
            data={newsObjects}
            showsVerticalScrollIndicator={false}
            keyExtractor={(__item, index) => index.toString()}
            renderItem={({ item }) => (
              <NewObjectItem
                title={item.title}
                onPress={() =>
                  navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
                    id: item.uuid,
                  })
                }
              />
            )}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default Sidebar;

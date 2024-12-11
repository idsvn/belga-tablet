import React, { useRef, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { PATH_SCREEN } from 'src/constants/pathName';

import keycloak from 'src/configs/keycloak';

import Text from 'components/customs/Text';
import ImageWithSkeleton from 'components/ImageWithSkeleton';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import { navigate } from 'App';

import styles from './styles';

const separatorNumber = 4;

const IntroduceScreen = () => {
  const { t } = useTranslation();

  const { height, width } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const widthContent = width - 100;

  const data = Array.from({ length: separatorNumber }, (_, index) => ({
    key: `${index}`,
    title: `Title no ${index + 1}`,
    subtitle: 'FABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
    // imageSource: require(`src/assets/images/introduce/introduce-1.png`), // Ensure you have these images
  }));

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / width);

    setCurrentIndex(index);
  };

  const handleLogin = async () => {
    try {
      await keycloak?.login();

      navigate(PATH_SCREEN.MAIN);
    } catch (error) {
      console.log('🚀 ~ handleLogin ~ error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={[
          styles.headerView,
          { height: height * 0.1, width: width * 0.7 },
        ]}
      >
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.subTitleText}>{item.subtitle}</Text>
      </View>
      <View style={styles.imageView}>
        <ImageWithSkeleton
          imageSource={require(`../../assets/images/introduce/introduce-1.png`)}
          width={'50%'}
          height={height * 0.6}
          style={styles.bannerImage}
          resizeMode={'center'}
        />
      </View>
    </View>
  );

  return (
    <PrimaryLayout style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
      />
      <View
        style={[
          styles.footerView,
          { height: height * 0.2, width: widthContent },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
          }}
        >
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                index === currentIndex
                  ? styles.separatorActive
                  : styles.separator,
                {
                  width:
                    widthContent *
                      (1 / separatorNumber - 0.1 / (separatorNumber - 1)) -
                    5 * (separatorNumber - 3),
                },
                index === currentIndex && {
                  width: widthContent * (1 / separatorNumber + 0.1),
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>
            {t('IntroduceScreen.signInText')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigate(PATH_SCREEN.MAIN)}
        >
          <Text style={styles.guestButtonText}>
            {t('IntroduceScreen.continueAsGuestText')}
          </Text>
        </TouchableOpacity>
      </View>
    </PrimaryLayout>
  );
};

export default IntroduceScreen;

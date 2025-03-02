import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import NewspaperHeader from 'components/Header/NewspaperHeader';
import MyStatusBar from 'components/MyStatusBar';

import Sidebar from 'components/Layout/NewspaperScreenLayout/components/Sidebar';

import { NewspaperDetailLayoutProps } from './types';

const NewspaperScreenLayout = (props: NewspaperDetailLayoutProps) => {
  const {
    statusBarBackgroundColor,
    barStyle,
    style,
    children,
    title = '',
    logoUrl,
    newsObjects = [],
    pageNumber = 0,
    onSelectStartAndEnd,
  } = props;

  const [showSideBar, setShowSidebar] = useState<boolean>(false);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSideBar);
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={statusBarBackgroundColor || 'white'}
        barStyle={barStyle || 'dark-content'}
      />
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <NewspaperHeader
          title={title || ''}
          logoUrl={logoUrl}
          showSideBar={showSideBar}
          onShowSideBar={toggleShowSidebar}
          onSelectStartAndEnd={onSelectStartAndEnd}
        />
        <Sidebar
          showSidebar={showSideBar}
          newsObjects={newsObjects}
          pageNumber={pageNumber}
          onClose={toggleShowSidebar}
        />
        <View style={[style, { flex: 1 }]}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default NewspaperScreenLayout;

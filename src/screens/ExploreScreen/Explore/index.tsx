import React from 'react';

import ArticleList from '../ArticleList';
import LatestPressRelease from '../LatestPressRelease';
import RealtimeFeed from '../RealtimeFeed';

export function Explore() {
  return (
    <>
      <ArticleList />
      <RealtimeFeed />
      <LatestPressRelease />
    </>
  );
}

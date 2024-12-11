import { useEffect } from 'react';
import { Linking } from 'react-native';

const useRedirectUrl = () => {
  useEffect(() => {
    Linking.getInitialURL().then(urlRedirect);
  }, []);

  const urlRedirect = (url: any) => {
    if (!url) {
      return;
    }

    handleNavigateScreen(url);
  };

  const handleNavigateScreen = (redirectUrl: string) => {
    console.log('🚀 ~ handleNavigateScreen ~ redirectUrl:', redirectUrl);
  };
};

export default useRedirectUrl;

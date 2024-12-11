import { StyleSheet } from 'react-native';

import { heightScreen, widthScreen } from 'src/utils/systemUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.colors.gray400,
  },
  zoomableView: {
    height: heightScreen - 100,
    width: widthScreen - 40,
    // flex: 1,
  },
  zone: {
    position: 'absolute',
    borderColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  zoneHighlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 0, 0.3)', // Highlight zone with light yellow color
  },
});

export default styles;

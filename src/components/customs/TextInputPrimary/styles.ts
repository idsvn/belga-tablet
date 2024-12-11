import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonClear: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVisiblePassword: {},
  buttonGroupView: {
    position: 'absolute',
    padding: 6,
    top: 7,
    right: 2,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
});

export default styles;

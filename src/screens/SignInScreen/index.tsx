import { Image, TouchableOpacity, View } from 'react-native';

import { useKeycloak } from '@react-keycloak/native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import i18n, { updateLanguage } from 'src/localization';

import { PATH_SCREEN } from 'src/constants/pathName';

import { Language } from 'src/models/systemModel';

import ButtonPrimary from 'components/ButtonPrimary';
import CheckBox from 'components/Checkbox';
import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';
import PrimaryLayout from 'components/Layout/PrimaryLayout';

import { navigate, userSessionManager } from 'App';

import styles from './styles';

const data = [
  { label: 'English', value: Language.EN },
  { label: 'Français', value: Language.FR },
  { label: 'Nederlands', value: Language.NL },
];

const SignInScreen = () => {
  const { keycloak } = useKeycloak();

  const handleChangeLanguage = (data: { label: string; value: Language }) => {
    updateLanguage(data.value);
  };

  const handleLogin = async () => {
    try {
      // await keycloak?.login();

      navigate(PATH_SCREEN.MAIN);

      userSessionManager.setAccessToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWX0RfRmlQX1VUNThYd0JLV211VnJtT2xXZHRHZ1MySVN2OGl4aXdYTWtBIn0.eyJleHAiOjE3MzEzODUyNjMsImlhdCI6MTczMTM3OTg2MywiYXV0aF90aW1lIjoxNzMxMzc5ODYwLCJqdGkiOiJmOTZiNjVkZi00MTc5LTRjZGItYWE2Ni02YjFhZDc2MGUyMTEiLCJpc3MiOiJodHRwczovL3Nzby5zc2wuYmVsZ2EuYmUvYXV0aC9yZWFsbXMvYmVsZ2EiLCJhdWQiOiJiZWxnYXByZXNzLWFwaSIsInN1YiI6ImRkNjRhZTE3LTI3MGQtNGRiZC1hYTllLTJlMDVlYTIxZmJiOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJlbGdhcHJlc3Mtd2ViIiwibm9uY2UiOiJmNTUxZTAxNC1jYjdjLTQwNzItOTMzOC01Y2Q2MjNlYjJiZWIiLCJzZXNzaW9uX3N0YXRlIjoiNmY4YTQzNzktM2RhMi00YzQzLWFjYzMtNDA5YTU4YWQ1YWYxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vc3NvLnNzbC5iZWxnYS5iZSIsImh0dHBzOi8vd2ViLmJlbGdhLnByZXNzIiwiaHR0cHM6Ly9hY2NlcHQuYmVuYS0wMDAyLXdlYi1wbGF0Zm9ybS1mcm9udGVuZC13ZWIubm92ZW1iZXJmaXZlb3BzLmNvIiwiaHR0cHM6Ly9icC1iby5zc2wuYmVsZ2EuYmUiLCJodHRwczovL2JldGEuYmVsZ2EucHJlc3MiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIl19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwic2lkIjoiNmY4YTQzNzktM2RhMi00YzQzLWFjYzMtNDA5YTU4YWQ1YWYxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJtaW5oLnZvIGlkc29sdXRpb25zLmNvbS52biIsInByZWZlcnJlZF91c2VybmFtZSI6Im1pbmgudm9AaWRzb2x1dGlvbnMuY29tLnZuIiwiZ2l2ZW5fbmFtZSI6Im1pbmgudm8iLCJsb2NhbGUiOiJlbiIsImZhbWlseV9uYW1lIjoiaWRzb2x1dGlvbnMuY29tLnZuIiwiZW1haWwiOiJtaW5oLnZvQGlkc29sdXRpb25zLmNvbS52biJ9.kI_g-l0MRExbXGi-NyZBc74vRqIOyOgNqKHbZXZcSkuPa5cRfg3Q7M_a9hq1-l2NkbfNFNKlE4hkdYukrFH_3csCsqYlfz-PGFVl6duPb-D0JmqnDxb5rhYFY06s8L3UMKLypYFWiedqbL8kvT1bsNwd-Jv6aHO3GS7uq1I_MmYfjSTiDlF01K_SmRwDTjt5u2-WjBuxshuuN5mT8i-WSjb0YtZEru5sfSKuRrBHyKF3qME7b1niHVkbhuM8OnHDbXQGqXk80td9dAQNKvekI6DE1WXrdj-ffgZ9dVAvSJZMJtYab-EFi0Xp-yhnlEUYsuLAtriTV3Te-nuKWUXgmA',
      );

      console.log('🚀 ~ handleLogin ~ login:', keycloak?.token);
      await callAPI(
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWX0RfRmlQX1VUNThYd0JLV211VnJtT2xXZHRHZ1MySVN2OGl4aXdYTWtBIn0.eyJleHAiOjE3MzEzMjU3MTksImlhdCI6MTczMTMyMDMxOSwiYXV0aF90aW1lIjoxNzMxMzIwMzE0LCJqdGkiOiI5OTU4NzM5NC0wY2VkLTQyNDYtOTdkNy0zMjAxZTU4MjEwOTkiLCJpc3MiOiJodHRwczovL3Nzby5zc2wuYmVsZ2EuYmUvYXV0aC9yZWFsbXMvYmVsZ2EiLCJhdWQiOiJiZWxnYXByZXNzLWFwaSIsInN1YiI6ImRkNjRhZTE3LTI3MGQtNGRiZC1hYTllLTJlMDVlYTIxZmJiOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJlbGdhcHJlc3Mtd2ViIiwibm9uY2UiOiJjOGYzNjg2NC0zNGM1LTRlNGMtODIxZC0xZDZkNzdhMTdlYjEiLCJzZXNzaW9uX3N0YXRlIjoiNzI5NjUxZTMtM2MyNC00YzE1LWIwYzUtMmEyZDgwYjVjN2FiIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vc3NvLnNzbC5iZWxnYS5iZSIsImh0dHBzOi8vd2ViLmJlbGdhLnByZXNzIiwiaHR0cHM6Ly9hY2NlcHQuYmVuYS0wMDAyLXdlYi1wbGF0Zm9ybS1mcm9udGVuZC13ZWIubm92ZW1iZXJmaXZlb3BzLmNvIiwiaHR0cHM6Ly9icC1iby5zc2wuYmVsZ2EuYmUiLCJodHRwczovL2JldGEuYmVsZ2EucHJlc3MiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIl19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwic2lkIjoiNzI5NjUxZTMtM2MyNC00YzE1LWIwYzUtMmEyZDgwYjVjN2FiIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJtaW5oLnZvIGlkc29sdXRpb25zLmNvbS52biIsInByZWZlcnJlZF91c2VybmFtZSI6Im1pbmgudm9AaWRzb2x1dGlvbnMuY29tLnZuIiwiZ2l2ZW5fbmFtZSI6Im1pbmgudm8iLCJsb2NhbGUiOiJlbiIsImZhbWlseV9uYW1lIjoiaWRzb2x1dGlvbnMuY29tLnZuIiwiZW1haWwiOiJtaW5oLnZvQGlkc29sdXRpb25zLmNvbS52biJ9.jBpIYJRZEGmXwAjUyGQ8QeukOh-H9lMzKAKKRgGxz_g_znCCYnzdF23y8OFG3OV10xMDcPg1ZzdamzPUWIYyz1NPVwRZaz_fLeuYUv8wbcH9tbm_ZW9t1hsFfqTPSnmtXbcQSwBo9mYZIR6NK7DtZIDExl-NjMzBah9xLLv-UukcpBT4U6nOsxzRI8A-ERHjfpIV9VwNJYs5zDiPJ6IEMpC6vvFv3yns12blHAk_xaR-c0BGnUurnrjc_deTy2xiFQEitJs4KUnUATkNb3lBEIFf8hMdVyXsjje1sdGvdp4UKiclp-9cup5H9TvnFe0aakyky4tzjULYL8rIu9mlMQ',
      );
    } catch (error) {
      console.log('🚀 ~ handleLogin ~ error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await keycloak?.logout();
      userSessionManager.reset();

      console.log('logout success');
    } catch (error) {
      console.log('🚀 ~ handleLogout ~ error:', error);
    }
  };

  const handleRefreshToken = () => {
    try {
      console.log('🚀 ~ refreshToken', keycloak?.refreshToken);
    } catch (error) {
      console.log('🚀 ~ handleRefreshToken ~ error:', error);
    }
  };

  const callAPI = async (token: string) => {
    try {
      const response = await axios.get(
        'https://api.belga.press/belgapress/api/users/13524/kiosk/deliverables/favourites',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('res', response);
    } catch (error) {
      console.log('🚀 ~ callAPI ~ error:', error);
    }
  };

  return (
    <PrimaryLayout style={styles.container}>
      <View style={styles.contentView}>
        <Image source={require('src/assets/images/belga-press-logo.png')} />

        <Dropdown
          style={[styles.dropdown]}
          data={data}
          value={i18n.language}
          labelField={'label'}
          valueField={'value'}
          maxHeight={300}
          onChange={handleChangeLanguage}
        />
        <Text style={styles.titleText}>Sign in to your account</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabelText}>Email</Text>
          <TextInput placeholder="Email" style={styles.inputText} />
        </View>
        <View style={styles.rememberView}>
          <CheckBox checked size={25} />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        <ButtonPrimary
          title="Sign In"
          style={styles.signInButton}
          onPress={handleLogin}
        />

        <ButtonPrimary
          title="Logout"
          style={styles.signInButton}
          onPress={handleLogout}
        />

        <ButtonPrimary
          title="ReToken"
          style={styles.signInButton}
          onPress={handleRefreshToken}
        />
        <View style={styles.footerView}>
          <Text style={styles.newUserText}>New user?</Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>Register as visitor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PrimaryLayout>
  );
};

export default SignInScreen;

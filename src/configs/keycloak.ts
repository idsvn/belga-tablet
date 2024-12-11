import { RNKeycloak } from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'https://sso.ssl.belga.be/auth',
  realm: 'belga',
  clientId: 'belgapress-mobile',
});

export default keycloak;

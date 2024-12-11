// export const API_BASE_URL = `${configEnv.API_BASE_URL}/api`;
export const API_BASE_URL = `/api`;

const API_AUTH_URL = `${API_BASE_URL}/auth`;

export const API_AUTHENTICATION_URL = {
  SIGN_IN_URL: `${API_AUTH_URL}/customer/signin`,
};

export const API_KIOSK_URL = {
  GET_PRESS_RELEASES_URL: `/kiosk/newsrooms/pressreleases`,
  GET_FAVORITES_URL: `/kiosk/deliverables/favourites`,
  GET_PUBLICATION_URL: `/kiosk/publications`,
};

export const API_PUBLICATION_URL = {
  GET_PUBLICATION_URL: '',
};

export const API_USER_URL = {
  USER_URL: `${API_AUTH_URL}/user`,
  USERS_URL: `${API_BASE_URL}/users`,
};

export const API_NEWS_OBJECTS_URL = {
  NEWS_OBJECTS_URL: `${API_BASE_URL}/newsobjects`,
};

export const API_TAG_URL = {
  TAG_URL: `/tags`,
};

export const API_SOURCE_URL = {
  SOURCE_URL: `${API_BASE_URL}/sources`,
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocalStorageKey } from 'src/constants';

class UserSessionManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private userId: string | null = null;
  private username: string | null = '';
  public initialized = false;
  public enableCallApi = true;
  private static instance: UserSessionManager | null = null;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): UserSessionManager {
    if (!UserSessionManager.instance) {
      UserSessionManager.instance = new UserSessionManager();
    }

    return UserSessionManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Fetch the access token from AsyncStorage if it hasn't been fetched already
    this.accessToken =
      (await AsyncStorage.getItem(LocalStorageKey.ACCESS_TOKEN_KEY)) || '';
    this.refreshToken =
      (await AsyncStorage.getItem(LocalStorageKey.REFRESH_TOKEN_KEY)) || '';
    this.initialized = true;
  }

  public async reset(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    this.userId = null;
    this.initialized = false;

    await AsyncStorage.removeItem(LocalStorageKey.ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(LocalStorageKey.REFRESH_TOKEN_KEY);
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public async setAccessToken(newAccessToken: string): Promise<void> {
    this.accessToken = newAccessToken;

    await AsyncStorage.setItem(
      LocalStorageKey.ACCESS_TOKEN_KEY,
      newAccessToken,
    );
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public getUsername(): string | null {
    return this.username;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public async setRefreshToken(newRefreshToken: string): Promise<void> {
    this.refreshToken = newRefreshToken;

    await AsyncStorage.setItem(
      LocalStorageKey.REFRESH_TOKEN_KEY,
      newRefreshToken,
    );
  }

  public getEnableCallApi(): boolean {
    return this.enableCallApi;
  }

  public setEnableCallApi(enableCallApi: boolean) {
    this.enableCallApi = enableCallApi;
  }
}

export default UserSessionManager;

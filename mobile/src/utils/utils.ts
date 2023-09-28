import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';
import {URLS} from '../constants';

export const getUserDataFromUrl = (url: string): string | null => {
  const parsed = queryString.parseUrl(url);
  const token = parsed.query.token as string | null;
  return token || null;
};

const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = async (token?: string) => {
  if (token) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  }
  return token;
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const buildUrlLogin = (client: string) => {
  return `${URLS.login}/${client}`;
};

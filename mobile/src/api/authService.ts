import {fetcher} from '../api/fetcher';
import {getAccessToken} from '../utils/utils';

export const ping = async (): Promise<string> => {
  try {
    const token = await getAccessToken();
    const response = await fetcher('ping', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.message;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

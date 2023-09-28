import {BASE_URL} from '../constants';

export const fetcher = async (
  path: string,
  options: RequestInit = {},
): Promise<any> => {
  const response = await fetch(`${BASE_URL}/${path}`, options);
  if (!response.ok) {
    if ([401, 403].includes(response.status)) throw new Error('Unhautorized');
    throw new Error('API Error');
  }
  return await response.json();
};

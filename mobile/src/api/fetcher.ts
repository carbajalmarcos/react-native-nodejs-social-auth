import { BASE_URL } from "../constants";


export const fetcher =  async (path: string, options: RequestInit = {}): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error('API request failed');
  }
};

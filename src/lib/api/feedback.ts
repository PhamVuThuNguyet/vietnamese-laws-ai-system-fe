import axios from 'axios';

import { baseUrl } from '@/constant/env';

export const sendFeedBack = async (data: Record<string, any>) => {
  const url = `${baseUrl}/feedback`;
  return axios.post(url, data);
};

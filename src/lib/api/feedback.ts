/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import axios from 'axios';

import { baseUrl } from '@/constant/env';

export const sendFeedBack = async (data: Record<string, any>) => {
  const url = `${baseUrl}/feedback`;
  return axios.post(url, data);
};

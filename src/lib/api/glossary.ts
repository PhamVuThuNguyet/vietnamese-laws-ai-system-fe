/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { baseUrl } from '@/constant/env';

export const getGloassaries = async (params: Record<string, any> = {}) => {
  let query = '';
  Object.keys(params).map((key) => {
    if (query === '') query += `${key}=${params[key]}`;
    else {
      query += `&${key}=${params[key]}`;
    }
  });

  const url = `${baseUrl}/glossaries?${query}`;
  const response = await fetch(url);
  return await response.json();
};

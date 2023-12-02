import queryString from 'query-string';

import { baseUrl } from '@/constant/env';

import { NodeData, NodeTypes } from '../types';

export const getCharters = async (
  indexingId: number,
  params: Record<string, any>
) => {
  let url = `${baseUrl}/charters?indexing_id=${indexingId}`;
  Object.keys(params).map((item) => {
    url += `&${item}=${params[item]}`;
  });
  const response = await fetch(url);
  return (await response.json()).data.map(
    (charter: any) =>
      ({
        ...charter,
        id: `${NodeTypes.CHARTER}-${charter.id}`,
        type: NodeTypes.CHARTER,
      } as NodeData)
  );
};

export const getCharterById = async (id: number) => {
  const url = `${baseUrl}/charters?id=${id}`;
  const response = await fetch(url);
  return (await response.json()).data[0];
};

export const getChartersByConditions = async (params = {}) => {
  const url = `${baseUrl}/charters?${queryString.stringify(params)}`;
  const response = await fetch(url);
  return await response.json();
};

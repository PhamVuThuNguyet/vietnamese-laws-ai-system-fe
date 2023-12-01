import { baseUrl } from '@/constant/env';

import { NodeData, NodeTypes } from '../types';

export const getCharters = async (indexingId: number) => {
  const url = `${baseUrl}/charters?indexing_id=${indexingId}`;
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

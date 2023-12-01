import { baseUrl } from '@/constant/env';

import { NodeData, NodeTypes } from '../types';

export const getIndexings = async (subjectId: number) => {
  const url = `${baseUrl}/indexing?subject_id=${subjectId}`;
  const response = await fetch(url);
  return (await response.json()).map(
    (indexing: any) =>
      ({
        ...indexing,
        id: `${NodeTypes.INDEXING}-${indexing.id}`,
        children: [],
        type: NodeTypes.INDEXING,
      } as NodeData)
  );
};

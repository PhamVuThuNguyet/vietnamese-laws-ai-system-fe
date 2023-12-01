import { NodeData, NodeTypes } from '@/lib/types';

import { baseUrl } from '@/constant/env';

export const getTopics = async (): Promise<NodeData[]> => {
  const url = `${baseUrl}/topics`;
  const response = await fetch(url);
  return (await response.json()).map(
    (topic: any) =>
      ({
        ...topic,
        id: `${NodeTypes.TOPIC}-${topic.id}`,
        children: [],
        type: NodeTypes.TOPIC,
      } as NodeData)
  );
};

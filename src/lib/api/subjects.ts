import { baseUrl } from '@/constant/env';

import { NodeData, NodeTypes } from '../types';

export const getSubject = async (topicId: number) => {
  const url = `${baseUrl}/subjects?topic_id=${topicId}`;
  const response = await fetch(url);
  return (await response.json()).map(
    (subject: any) =>
      ({
        ...subject,
        id: `${NodeTypes.SUBJECT}-${subject.id}`,
        children: [],
        type: NodeTypes.SUBJECT,
      } as NodeData)
  );
};

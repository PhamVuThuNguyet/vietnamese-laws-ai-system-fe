/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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

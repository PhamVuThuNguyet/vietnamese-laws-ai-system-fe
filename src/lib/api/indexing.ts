/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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

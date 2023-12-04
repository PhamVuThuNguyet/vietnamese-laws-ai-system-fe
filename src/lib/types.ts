/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

export enum NodeTypes {
  TOPIC = 'TOPIC',
  SUBJECT = 'SUBJECT',
  LEGAL_DOCUMENT = 'LEGAL_DOCUMENT',
  INDEXING = 'INDEXING',
  CHARTER = 'CHARTER',
}

export type NodeData = {
  id: string;
  children: NodeData[];
  type: NodeTypes;
} & Record<string, string>;

export interface Topic {
  id: string;
  name: string;
  type: NodeTypes.TOPIC;
}

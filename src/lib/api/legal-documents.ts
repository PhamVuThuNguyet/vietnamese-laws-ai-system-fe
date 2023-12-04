/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { baseUrl } from '@/constant/env';

import { NodeTypes } from '../types';

export const getLegalDocuments = async (
  subjectId: number
): Promise<Array<{ id: string } & Record<string, string>>> => {
  const url = `${baseUrl}/legal-documents?subject_id=${subjectId}`;
  const response = await fetch(url);
  return (await response.json()).map((document: any) => ({
    ...document,
    id: `${NodeTypes.LEGAL_DOCUMENT}-${document.id}`,
  }));
};

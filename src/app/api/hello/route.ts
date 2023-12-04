/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ hello: 'Next.js' });
}

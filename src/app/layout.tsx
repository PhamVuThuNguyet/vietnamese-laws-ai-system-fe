/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { Metadata } from 'next';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import TanStackProvider from '@/components/providers/TanStackProvider';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <head>
          <meta
            http-equiv='Content-Security-Policy'
            content='upgrade-insecure-requests'
          />
        </head>
        <TanStackProvider>
          <Toaster />
          <div>{children}</div>
        </TanStackProvider>
      </body>
    </html>
  );
}

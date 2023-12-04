/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Head from 'next/head';

import ChatBot from './chatbot/ChatBot';

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Container = ({ title, children }: Props) => {
  return (
    <main className='relative flex  justify-center bg-white'>
      <Head>
        <title>{title || 'Vietname Laws'}</title>
      </Head>
      {children}
      <ChatBot />
    </main>
  );
};

export default Container;

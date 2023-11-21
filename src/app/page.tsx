'use client';

import Head from 'next/head';
import * as React from 'react';

import ChatBot from '@/components/chatbot/ChatBot';
import UnderlineLink from '@/components/links/UnderlineLink';
import { Input } from '@/components/ui/input';

const documents = [
  {
    id: '1',
    title: '1. Mục 1',
  },
  {
    id: '1-1',
    title: '1.1. Mục 1.1',
  },
  {
    id: '1-2',
    title: '1.2. Mục 1.2',
  },
  {
    id: '1-3',
    title: '1.3. Mục 1.3',
  },
  {
    id: '2',
    title: '2. Mục 2',
  },
  {
    id: '2-1',
    title: '1.1. Mục 2.1',
  },
  {
    id: '2-2',
    title: '1.2. Mục 2.2',
  },
  {
    id: '2-3',
    title: '1.3. Mục 2.3',
  },
  {
    id: '3',
    title: '3. Mục 3',
  },
  {
    id: '4',
    title: '4. Mục 4',
  },
];

export default function HomePage() {
  return (
    <main className='relative flex min-h-screen justify-center bg-white py-4'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='flex w-full max-w-xl flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu văn bản QPPL</h1>
        <Input type='text' placeholder='Nhập từ khóa tìm kiếm' />

        <div className='flex w-full flex-col items-start space-y-4'>
          <h2>Đề mục</h2>

          <div className='flex flex-col space-y-1'>
            {documents.map((item) => (
              <UnderlineLink href='#' key={item.id}>
                <h4 className='font-medium'>{item.title}</h4>
              </UnderlineLink>
            ))}
          </div>
        </div>
        {/* <ChatBot /> */}
      </section>
      <ChatBot />
    </main>
  );
}

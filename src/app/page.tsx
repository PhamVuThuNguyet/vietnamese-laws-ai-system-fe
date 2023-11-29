'use client';

import { FileText, FolderNotch, FolderNotchOpen } from '@phosphor-icons/react';
import Head from 'next/head';
import { NodeRendererProps, Tree } from 'react-arborist';

import ChatBot from '@/components/chatbot/ChatBot';
import { Input } from '@/components/ui/input';

type IDocument = {
  id: string;
  title: string;
  children?: IDocument[];
};

const documents: IDocument[] = Array(100)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    title: `Mục ${i}`,
    children: Array(100)
      .fill(0)
      .map((_, j) => ({
        id: `${i}-${j}`,
        title: `Mục ${i}.${j}`,
        children: Array(100)
          .fill(0)
          .map((_, k) => ({
            id: `${i}-${j}-${k}`,
            title: `Mục ${i}.${j}.${k}`,
          })),
      })),
  }));

function Node({ node, style, dragHandle }: NodeRendererProps<IDocument>) {
  const onClick = () => {
    node.toggle();
  };

  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={onClick}
      className='flex cursor-pointer flex-row items-center space-x-2 hover:bg-gray-100'
    >
      <span>
        {node.isLeaf ? (
          <FileText weight='fill' size={24} />
        ) : node.isOpen ? (
          <FolderNotchOpen size={24} weight='fill' />
        ) : (
          <FolderNotch size={24} weight='fill' />
        )}
      </span>
      <h4 className='font-medium'>{node.data.title}</h4>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className='relative flex  justify-center bg-white'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='flex min-h-screen w-full max-w-xl flex-1 flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu văn bản QPPL</h1>
        <Input type='text' placeholder='Nhập từ khóa tìm kiếm' />

        <div className='flex w-full flex-1 flex-col items-start space-y-4'>
          <h2>Đề mục</h2>

          <div className='w-full flex-1'>
            <Tree
              initialData={documents}
              openByDefault={false}
              rowHeight={28}
              width='full'
              height={600}
            >
              {Node}
            </Tree>
          </div>
        </div>
      </section>
      <ChatBot />
    </main>
  );
}

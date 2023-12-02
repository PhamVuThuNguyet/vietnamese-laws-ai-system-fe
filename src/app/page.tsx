'use client';

import { FileText, FolderNotch, FolderNotchOpen } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { NodeRendererProps, Tree } from 'react-arborist';

import { getCharters } from '@/lib/api/charters';
import { getIndexings } from '@/lib/api/indexing';
import { getSubject } from '@/lib/api/subjects';
import { getTopics } from '@/lib/api/topics';
import { getVietnamesNameNodeTypes } from '@/lib/helper';
import { NodeData, NodeTypes } from '@/lib/types';

import Container from '@/components/Container';
import UnderlineLink from '@/components/links/UnderlineLink';
import { Input } from '@/components/ui/input';

const getIcon = (type: NodeTypes, open: boolean) => {
  switch (type) {
    case NodeTypes.TOPIC:
      return open ? (
        <FolderNotchOpen size={24} weight='fill' color='#7ED7C1' />
      ) : (
        <FolderNotch size={24} weight='fill' color='#7ED7C1' />
      );
    case NodeTypes.SUBJECT:
      return open ? (
        <FolderNotchOpen size={24} weight='fill' color='#F0DBAF' />
      ) : (
        <FolderNotch size={24} weight='fill' color='#F0DBAF' />
      );
    case NodeTypes.INDEXING:
      return open ? (
        <FolderNotchOpen size={24} weight='fill' color='#DC8686' />
      ) : (
        <FolderNotch size={24} weight='fill' color='#DC8686' />
      );
    case NodeTypes.CHARTER:
      return <FileText weight='fill' size={24} color='#B06161' />;
  }
};

export default function HomePage() {
  const { data: topicsData, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });

  const openNode = async (nodeData: NodeData) => {
    if (nodeData.children !== undefined && nodeData.children.length > 0) {
      return;
    }

    // example: nodeData.id = 'topic-1' -> nodeData.type.length + 1 = 'topic-'.length -> slice it get id = '1
    const id = Number(nodeData.id.slice(nodeData.type.length + 1));

    let childrenData = [];
    if (nodeData.type === NodeTypes.TOPIC) {
      childrenData = await getSubject(id);
    } else if (nodeData.type === NodeTypes.SUBJECT) {
      childrenData = await getIndexings(id);
    } else if (nodeData.type === NodeTypes.INDEXING) {
      childrenData = await getCharters(id);
    }
    nodeData.children = childrenData;
  };

  const Node = ({ node, style }: NodeRendererProps<NodeData>) => {
    const title = useMemo(
      () =>
        `${
          [NodeTypes.SUBJECT, NodeTypes.TOPIC].includes(node.data.type)
            ? getVietnamesNameNodeTypes(node.data.type) + ': '
            : ''
        }${node.data.name}`,
      [node.data.name, node.data.type]
    );

    const onClick = () => {
      if (node.isLeaf) {
        return;
      } else {
        openNode(node.data).then(() => {
          node.toggle();
        });
      }
    };

    if (node.isLeaf)
      return (
        <a
          target='_blank'
          href={node.data.note[0]['link'] as unknown as string}
          rel='noopener noreferrer'
          style={style}
          className='flex cursor-pointer flex-row items-center space-x-2 hover:bg-gray-100'
        >
          <span>{getIcon(node.data.type, node.isOpen)}</span>
          <p className='font-medium'>{title}</p>
        </a>
      );

    return (
      <div
        style={style}
        onClick={onClick}
        className='flex cursor-pointer flex-row items-center space-x-2 hover:bg-gray-100'
      >
        <span>{getIcon(node.data.type, node.isOpen)}</span>
        <p className='font-medium'>{title}</p>
        {node.data.type === NodeTypes.SUBJECT && (
          <UnderlineLink
            href={`/legal-documents?subjectId=${Number(
              node.data.id.slice(node.data.type.length + 1)
            )}`}
            target='_blank'
            className='text-sm text-gray-400 hover:text-gray-600'
          >
            (Xem danh mục văn bản)
          </UnderlineLink>
        )}
      </div>
    );
  };

  return (
    <Container>
      <section className='flex min-h-screen w-full max-w-xl flex-1 flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu văn bản QPPL</h1>
        <Input type='text' placeholder='Nhập từ khóa tìm kiếm' />

        <div className='flex w-full flex-1 flex-col items-start space-y-4'>
          <h2>Đề mục</h2>

          <div className='w-full flex-1 overflow-x-auto'>
            {isLoading && <p>Loading...</p>}
            {topicsData !== undefined && (
              <div className='w-[2000px]'>
                <Tree
                  initialData={topicsData}
                  openByDefault={false}
                  rowHeight={28}
                  width='100%'
                  height={600}
                >
                  {Node}
                </Tree>
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}

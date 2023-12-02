'use client';

import { FileText, FolderNotch, FolderNotchOpen } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { NodeRendererProps, Tree } from 'react-arborist';

import { getCharters } from '@/lib/api/charters';
import { getIndexings } from '@/lib/api/indexing';
import { getSubject } from '@/lib/api/subjects';
import { getTopics } from '@/lib/api/topics';
import { getOrderNode, getVietnamesNameNodeTypes } from '@/lib/helper';
import { NodeData, NodeTypes } from '@/lib/types';

import CharterModal from '@/components/charter-modal';
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

  const [selectedCharter, setSelectedCharter] = useState({});
  const [search, setSearch] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.open(`/search?q=${search}&page=1`);
  };

  const openNode = async (nodeData: NodeData) => {
    // example: nodeData.id = 'topic-1' -> nodeData.type.length + 1 = 'topic-'.length -> slice it get id = '1
    const id = Number(nodeData.id.slice(nodeData.type.length + 1));

    let childrenData = [];
    if (nodeData.type === NodeTypes.TOPIC) {
      childrenData = await getSubject(id);
    } else if (nodeData.type === NodeTypes.SUBJECT) {
      childrenData = await getIndexings(id);
    } else if (nodeData.type === NodeTypes.INDEXING) {
      childrenData = await getCharters(id, {
        level: 1,
      });
    } else if (nodeData.type === NodeTypes.CHARTER) {
      const { level, indexing_id } = nodeData;
      const childCharters = await getCharters(Number(indexing_id), {
        level: Number(level) + 1,
        parent_charter_id: id,
      });
      if (childCharters.length > 0) {
        childrenData = childCharters;
      } else {
        setSelectedCharter(nodeData);
      }
    }
    nodeData.children = childrenData;
  };

  const Node = ({ node, style }: NodeRendererProps<NodeData>) => {
    const title = useMemo(
      () =>
        `${
          [NodeTypes.SUBJECT, NodeTypes.TOPIC].includes(node.data.type)
            ? getVietnamesNameNodeTypes(node.data.type) +
              ` ${getOrderNode(node.data.type, node)}: `
            : ''
        }${node.data.name}`,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [node.data.name, node.data.type]
    );

    const onClick = () => {
      openNode(node.data).then(() => {
        node.toggle();
      });
    };

    return (
      <div
        style={style}
        className='flex cursor-pointer flex-row items-center space-x-2 hover:bg-gray-100'
      >
        <span onClick={onClick}>{getIcon(node.data.type, node.isOpen)}</span>
        <p className='font-medium' onClick={onClick}>
          {title}
        </p>
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
      {Object.values(selectedCharter).length > 0 && (
        <CharterModal
          data={selectedCharter}
          onClose={() => setSelectedCharter({})}
        />
      )}

      <section className='flex min-h-screen w-full max-w-xl flex-1 flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu văn bản QPPL</h1>
        <form className='flex items-center' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Nhập từ khóa tìm kiếm'
            name='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='submit'
            className='primary text-no-wrap	ml-2 h-10 rounded-sm bg-blue-800 px-2 text-white'
          >
            Tìm kiếm
          </button>
        </form>

        <div className='flex w-full flex-1 flex-col items-start space-y-4'>
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

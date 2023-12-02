'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { getLegalDocuments } from '@/lib/api/legal-documents';

import Container from '@/components/Container';

const LegalDocumentsPage = () => {
  const params = useSearchParams();
  const subjectId = Number(params.get('subjectId'));

  const { data, isLoading } = useQuery({
    queryKey: ['legal-documents', subjectId],
    queryFn: () => getLegalDocuments(subjectId),
    enabled: !!subjectId,
  });

  return (
    <Container>
      <section className='flex min-h-screen w-full max-w-5xl flex-1 flex-col space-y-4 py-8'>
        {isLoading && <p>Loading...</p>}
        {((!isLoading && data && data.length === 0) || !subjectId) && (
          <h1 className='text-center'>Không tìm thấy danh mục văn bản</h1>
        )}
        {data && data.length > 0 && !isLoading && (
          <>
            <h1 className='text-center'>Danh mục văn bản</h1>

            <table className='w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-2 py-2'>
                    Stt
                  </th>
                  <th scope='col' className='px-2 py-2'>
                    Văn bản thuộc nội dung của đề mục
                  </th>
                  <th scope='col' className='px-2 py-2'>
                    Cơ quan thực hiện pháp điển
                  </th>
                  <th scope='col' className='px-2 py-2'>
                    Ngày ban hành
                  </th>

                  <th scope='col' className='px-2 py-2'>
                    Ngày có hiệu lực
                  </th>

                  <th scope='col' className='px-2 py-2'>
                    Ký hiệu văn bản trong đề mục
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <th className='w-2 px-2 py-2 font-medium text-gray-900 dark:text-white'>
                      {index + 1}
                    </th>
                    <th
                      scope='row'
                      className='px-2 py-2 font-medium text-gray-900 dark:text-white'
                    >
                      {item.name}
                    </th>
                    <td className='px-2 py-2'></td>
                    <td className='px-2 py-2'>{item.issued_date}</td>
                    <td className='px-2 py-2'>{item.effective_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </Container>
  );
};

export default LegalDocumentsPage;

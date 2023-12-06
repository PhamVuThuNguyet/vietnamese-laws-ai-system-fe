/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import { getGloassaries } from '@/lib/api/glossary';

import Container from '@/components/Container';
import { Input } from '@/components/ui/input';

const Glossary = () => {
  const [glossariesData, setGlossariesData] = useState({
    data: [] as any[],
    total: 0,
  });
  const [search, setSearch] = useState({
    q: '',
    page: 1,
    size: 15,
  });

  const fetchGlossariesData = async (query: Record<string, any> = {}) => {
    if (!query?.q) {
      setGlossariesData({
        data: [],
        total: 0,
      });
      return;
    }

    try {
      const data = await getGloassaries(query);
      setGlossariesData(data);
      window.scrollTo(0, 0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newSearch = {
      ...search,
      page: 1,
    };

    fetchGlossariesData(newSearch);
    setSearch(newSearch);
  };

  const handleChangePage = (page: number) => {
    setSearch({
      ...search,
      page: page,
    });
  };

  useEffect(() => {
    fetchGlossariesData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.page]);

  return (
    <Container>
      <section className='flex min-h-screen w-full max-w-xl flex-1 flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu thuật ngữ</h1>
        <form className='flex items-center' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Nhập từ khóa tìm kiếm'
            name='search'
            value={search.q}
            onChange={(e) => setSearch({ ...search, q: e.target.value })}
          />
          <button
            type='submit'
            className='primary text-no-wrap	ml-2 h-10 rounded-sm bg-blue-800 px-2 text-white'
          >
            Tìm kiếm
          </button>
        </form>

        <div className='flex w-full flex-1 '>
          <table className='w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-2 py-2'>
                  Stt
                </th>
                <th scope='col' className='px-2 py-2'>
                  Thuật ngữ
                </th>
                <th scope='col' className='px-2 py-2'>
                  Mô tả
                </th>
                <th scope='col' className='px-2 py-2'>
                  Nguồn
                </th>
              </tr>
            </thead>
            <tbody>
              {glossariesData.data.map((item, index) => (
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
                    {item.term}
                  </th>
                  <td className='px-2 py-2'>{item.desc}</td>
                  <td className='px-2 py-2'>{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {Math.ceil(glossariesData.total / search.size) > 1 && (
          <Pagination
            showSizeChanger={false}
            onChange={handleChangePage}
            defaultCurrent={Number(search.page)}
            pageSize={search.size}
            total={glossariesData.total}
          />
        )}
      </section>
    </Container>
  );
};

export default Glossary;

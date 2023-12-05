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
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import { getChartersByConditions, getChartersFromAI } from '@/lib/api/charters';

import CharterModal from '@/components/charter-modal';
import Container from '@/components/Container';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const [charterData, setCharterData] = useState({
    data: [] as any[],
    total: 0,
  });
  const [selectedCharter, setSelectedCharter] = useState<any>({});
  const [search, setSearch] = useState({
    q: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1,
    size: 15,
  });

  const fetchChartersData = async (query: Record<string, any> = {}) => {
    if (!query?.q) {
      setCharterData({
        data: [],
        total: 0,
      });
      return;
    }

    try {
      const data = await getChartersByConditions(query);
      const curIndex = Number(data?.page) * Number(data?.size);
      if (curIndex >= data.total) {
        const dataAI = await getChartersFromAI(query.q);
        setCharterData({
          data: [...data.data, ...dataAI],
          total: data.total + dataAI.length,
        });
      } else {
        setCharterData(data);
      }
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

    fetchChartersData(newSearch);
    setSearch(newSearch);
  };

  const handleChangePage = (page: number) => {
    setSearch({
      ...search,
      page: page,
    });
  };

  useEffect(() => {
    fetchChartersData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.page]);

  return (
    <Container>
      {Object.values(selectedCharter).length > 0 && (
        <CharterModal
          data={selectedCharter}
          onClose={() => setSelectedCharter({})}
          keyword={search.q}
        />
      )}

      <section className='flex min-h-screen w-full max-w-xl flex-1 flex-col space-y-4 py-8'>
        <h1 className='text-center'>Tra cứu văn bản QPPL</h1>
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
        <div className={styles['charter-data']}>
          {charterData.data.map((charter: Record<string, any>) => (
            <div
              className={styles.charter}
              key={charter.id || Math.random()}
              onClick={() => setSelectedCharter(charter)}
            >
              <div className={styles['charter-title']}>{charter.name}</div>
              <div className={styles['charter-description']}>
                {charter.description}
              </div>
            </div>
          ))}
        </div>
        {Math.ceil(charterData.total / search.size) > 1 && (
          <Pagination
            showSizeChanger={false}
            onChange={handleChangePage}
            defaultCurrent={Number(search.page)}
            pageSize={search.size}
            total={charterData.total}
          />
        )}
      </section>
    </Container>
  );
}

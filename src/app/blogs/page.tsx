'use client'

import AppTable from '@/components/appTable';
import React from 'react'
import useSWR from 'swr';

interface pageProps {

}

const BlogsPage: React.FC<pageProps> = ({ }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<IBlog[]>(
    "http://localhost:8000/blogs",
    fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }
  );

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <AppTable blogs={data?.sort((a: IBlog, b: IBlog) => b.id - a.id)} />
    </div>
  );
};

export default BlogsPage;

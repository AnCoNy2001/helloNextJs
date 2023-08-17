'use client'

import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import useSWR, { Fetcher } from 'swr';

interface IProps {
  params: {
    id: string
  }
}

const ViewDetailBlog: React.FC<IProps> = ({ params }: { params: { id: string } }) => {
  const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }
  );
  if (isLoading) return <div>loading...</div>
  return (
    <Box padding={'20px 0'}>

      <Link href={'/blogs'}>
        <Button variant='contained' size="medium">Go back</Button>
      </Link>

      <Card sx={{ minWidth: 275, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardHeader
          title={data?.title}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data?.content}
          </Typography>
        </CardContent>
        <CardActions >
          <Typography>{data?.author}</Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ViewDetailBlog;

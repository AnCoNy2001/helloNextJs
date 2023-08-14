'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface IPageProps {

}

const page: React.FC<IPageProps> = ({ }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleBtn = () => {
    router.push('/')
  }
  return (
    <div>
      Facebook
      <div>
        <button onClick={handleBtn}>Back home</button>
      </div>
    </div>
  );
};

export default page;

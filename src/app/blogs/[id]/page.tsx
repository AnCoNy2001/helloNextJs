import React from 'react'

interface IProps {
  params: {
    id: string
  }
}

const ViewDetailBlog: React.FC<IProps> = ({ params }: { params: { id: string } }) => {
  console.log('Param:', params.id)
  return (
    <div>ViewDetailBlog: {params.id}</div>
  );
};

export default ViewDetailBlog;

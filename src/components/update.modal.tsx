'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, TextareaAutosize, FormControl, Backdrop, Fade } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { mutate } from "swr"

interface IProps {
  showModalUpdate: boolean
  setShowModalUpdate: (value: boolean) => void
  blog: IBlog | null
  setBlog: (value: IBlog | null) => void
}

const sx = {
  styleModal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60vh',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  }
}

const schema = yup
  .object({
    title: yup.string().required(),
    author: yup.string().required(),
    content: yup.string()
  })
  .required()

const UpdateModal: React.FC<IProps> = (props: IProps) => {
  const [id, setId] = useState<number>(0)
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setValue('title', blog.title);
      setValue('author', blog.author);
      setValue('content', blog.content);
    }
  }, [blog]);

  const onSubmit = async (data: any): Promise<void> => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json,text/plain, */*',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.success('Create new blog succed');
          mutate('http://localhost:8000/blogs');
          handleClose();
        }
      })
  }

  const handleClose = (): void => {
    setShowModalUpdate(false);
    setBlog(null);
    reset();
  }

  return (
    <Modal
      open={showModalUpdate}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Box sx={sx.styleModal} component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Box height={'50vh'}>
          <Box display={'flex'} justifyContent={'space-between'} borderBottom={'1px solid #ccc'} padding={'10px 0'}>
            <Typography variant="h5" component="h2" fontWeight={'600'}>
              Update A Blog
            </Typography>
            <IconButton size='large' onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box padding={'10px 10px'} display={'flex'} flexDirection={'column'} gap={3}>
            <FormControl fullWidth>
              <Typography>Title</Typography>
              <TextField
                error={errors.title !== undefined}
                placeholder='Title ...'
                variant='outlined'
                {...register('title')}
                helperText={errors.title?.message?.charAt(0).toUpperCase().concat(errors.title?.message.slice(1))}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Author</Typography>
              <TextField
                error={errors.author !== undefined}
                placeholder='Author ...'
                variant='outlined'
                {...register('author')}
                helperText={errors.author?.message?.charAt(0).toUpperCase().concat(errors.author?.message.slice(1))}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Content</Typography>
              <TextareaAutosize
                placeholder='...'
                minRows={6}
                style={{ borderRadius: '5px', resize: 'vertical' }}
                {...register('content')}
              />
            </FormControl>
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={'end'} gap={2} borderTop={'1px solid #ccc'} paddingTop={'10px'}>
          <Button variant='contained' color='secondary' onClick={handleClose}>Close</Button>
          <Button variant='contained' color='success' type='submit'>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;

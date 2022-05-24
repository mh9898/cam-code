import React, { useState } from 'react';
import Layout from '@/layout/Layout';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Center, Text, Textarea } from '@mantine/core';
import Button from '@/lib/Button/Button';
import { useNavigate } from 'react-router-dom';
import { sendFeedback } from '@/services/barcode.service';
import useCustomTheme from '@/hooks/useCustomTheme';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const { customStyle } = useCustomTheme();
  const [images, setImages] = React.useState<any[]>([]);
  const maxNumber = 3;
  const navigate = useNavigate();
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as any[]);
  };
  const submitFeedback = async () => {
    try {
      const res = await sendFeedback(
        customStyle.barcode,
        feedback,
        images[0]?.dataURL.split(',')[1],
        images[1]?.dataURL.split(',')[1],
        images[2]?.dataURL.split(',')[1]
      );
    } catch (e) {
      console.log(e);
    }
    navigate(-1);
  };
  return (
    <Layout>
      <Center sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onClick={() => navigate(-1)} mt="1rem">
          Back
        </Button>
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.currentTarget.value)}
          rows={5}
          sx={{ width: '100%' }}
          my="2rem"
          placeholder="write some feedback"
        />
        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <Center sx={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <Center mb="1rem" sx={{ justifyContent: 'space-between', width: '100%' }}>
                <Button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click To Add Photos
                </Button>
                <Button color="red" onClick={onImageRemoveAll}>
                  Remove all
                </Button>
              </Center>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button mx="1rem" onClick={() => onImageRemove(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </Center>
          )}
        </ImageUploading>
        <Button mt="1rem" onClick={submitFeedback}>
          Send
        </Button>
      </Center>
    </Layout>
  );
};

export default Feedback;

import React from 'react';
import Layout from '@/layout/Layout';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Center, Text, Textarea } from '@mantine/core';
import Button from '@/lib/Button/Button';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 3;
  const navigate = useNavigate();
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  return (
    <Layout>
      <Center sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onClick={() => navigate(-1)} mt="1rem">
          Back
        </Button>
        <Textarea rows={5} sx={{ width: '100%' }} my="2rem" placeholder="write some feedback" />
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
        <Button mt="1rem">Send</Button>
      </Center>
    </Layout>
  );
};

export default Feedback;

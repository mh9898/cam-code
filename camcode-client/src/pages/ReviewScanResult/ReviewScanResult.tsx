//@ts-nocheck
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { Card, Center, Text, Title } from '@mantine/core';
import Button from '@/lib/Button/Button';
const ReviewScanResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <Center sx={{ flexDirection: 'column' }}>
        <Card my="2rem" sx={{ background: state?.cardBg, width: '90%', height: '25vh' }}>
          <Center sx={{ height: '100%' }}>
            <Title order={3}>{state?.result}</Title>
          </Center>
        </Card>
        <Button mb="0.5rem" sx={{ width: '50%' }} onClick={() => navigate('/Feedback')}>
          FeedBack
        </Button>
        <Button my="0.5rem" sx={{ width: '50%' }} onClick={() => navigate('/ContactUs')}>
          Contact Us
        </Button>
        <Button my="0.5rem" sx={{ width: '50%' }} onClick={() => navigate('/ErrorOnScan')}>
          Survey Link
        </Button>
        <Button mt="4rem" sx={{ width: '50%' }} color="red" onClick={() => navigate(-1)}>
          Scan Again
        </Button>
      </Center>
    </Layout>
  );
};

export default ReviewScanResult;

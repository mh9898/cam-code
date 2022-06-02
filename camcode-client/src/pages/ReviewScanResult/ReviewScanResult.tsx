//@ts-nocheck
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { Card, Center, Text, Title, Space } from '@mantine/core';
import Button from '@/lib/Button/Button';
import useCustomTheme from '@/hooks/useCustomTheme';
import { log } from 'util';
const ReviewScanResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { customStyle } = useCustomTheme();

  return (
    <Layout>
      <Center sx={{ flexDirection: 'column', textAlign: 'center'}}>
     <Space h="xl" />
        <Text>{state.sQuality}</Text>
        <Card
          my="2rem"
          radius="xl"
          sx={{ background: state?.cardBg, width: '90%', height: '10vh' }}
        >
          <Center sx={{ height: '100%', textAlign: 'center'  }}>
            <Title order={3}>{state?.result}</Title>
          </Center>
        </Card>
        <Button mb="0.5rem" sx={{ width: '50%' }} onClick={() => navigate('/Feedback')}>
          FeedBack
        </Button>
        <Button my="0.5rem" sx={{ width: '50%' }} onClick={() => navigate('/ContactUs')}>
          Contact Us
        </Button>
        {customStyle.surveyLink && (
          <Button
            my="0.5rem"
            sx={{ width: '50%' }}
            onClick={() => (location.href = customStyle.surveyLink)}
          >
            Survey Link
          </Button>
        )}
        <Button mt="4rem" sx={{ width: '50%' }} color="red" onClick={() => navigate(-1)}>
          Scan Again
        </Button>
      </Center>
    </Layout>
  );
};

export default ReviewScanResult;

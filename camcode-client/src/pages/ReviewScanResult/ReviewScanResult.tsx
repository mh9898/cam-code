//@ts-nocheck
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { Button, Card, Center, Text, Title } from '@mantine/core';

const ReviewScanResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <Center sx={{ flexDirection: 'column' }}>
        <Title>Scan Result</Title>
        <Card my="2rem" p="2rem" sx={{ background: state?.cardBg }}>
          <Text size="lg">{state?.result}</Text>
        </Card>
        <Card my="1rem" p="1rem">
          <Text>{state?.result}</Text>
        </Card>
        <Card my="1rem" p="1rem">
          <Text>{state?.result}</Text>
        </Card>
        <Card my="1rem" p="1rem">
          <Text>{state?.result}</Text>
        </Card>
        <Button onClick={() => navigate(-1)}>Scan Again</Button>
      </Center>
    </Layout>
  );
};

export default ReviewScanResult;

import React from 'react';
import Layout from '@/layout/Layout';
import { Button, Center, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ErrorOnScan = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Center>
        <Title>Seems Like We Couldn't Scan This Barcode</Title>
        <Button onClick={() => navigate(-1)}>Try Again</Button>
      </Center>
    </Layout>
  );
};

export default ErrorOnScan;

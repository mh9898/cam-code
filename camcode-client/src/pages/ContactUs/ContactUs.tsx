import React from 'react';
import Layout from '@/layout/Layout';
import useCustomTheme from '@/hooks/useCustomTheme';
import { Center, Text } from '@mantine/core';

const ContactUs = () => {
  const { customStyle } = useCustomTheme();
  return (
    <Layout>
      <Center>
        <Text>Email: ${customStyle.email}</Text>
        <Text>Phone: ${customStyle.phone}</Text>
        <Text>Link to Website: ${customStyle.websiteLink}</Text>
      </Center>
    </Layout>
  );
};

export default ContactUs;

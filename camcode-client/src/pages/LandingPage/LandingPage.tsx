import React, { SetStateAction, useEffect, useState } from 'react';
import Layout from '@/layout/Layout';
import useCustomTheme from '@/hooks/useCustomTheme';
import { Center, Text, Title } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@/lib/Button/Button';

const askLocationAccessPermission = (setter: React.Dispatch<SetStateAction<any>>) => {
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setter({ latitude, longitude });
    },
    error,
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};
const LandingPage = () => {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    askLocationAccessPermission(setCoordinates);
  }, []);
  return (
    <Layout>
      <Center sx={{ flexDirection: 'column', textAlign: 'center' }}>
        <Title>Smart Scanner</Title>
        <Text mt="2rem">Please allow camera and location access to continue scanning</Text>
        <Text mt="2rem">If you blocked your camera by mistake, simply refresh the page!</Text>
        <Button mt="2rem" onClick={() => navigate('/ScanCode')} state={coordinates}>
          Scan Barcode
        </Button>
      </Center>
    </Layout>
  );
};

export default LandingPage;

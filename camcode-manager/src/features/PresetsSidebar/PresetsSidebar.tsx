import React from 'react';
import { Center } from '@mantine/core';
import ThemeCard from '@/features/PresetsSidebar/components/ThemeCard/ThemeCard';
import PreviewPhone from '@/features/PreviewPhone/PreviewPhone';
import ShowAllPresets from '@/features/ShowAllPresets/ShowAllPresets';

const PresetsSidebar = () => {
  return (
    <Center
      sx={{
        width: '100%',
        background: '#fff4ed',
        minHeight: '100vh',
        flexDirection: 'column',
        maxWidth: '370px',
      }}
      py="1rem"
    >
      <ShowAllPresets />
      <PreviewPhone />
    </Center>
  );
};

export default PresetsSidebar;

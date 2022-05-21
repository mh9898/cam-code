import React from 'react';
import { Center } from '@mantine/core';
import ThemeCard from '@/features/PresetsSidebar/components/ThemeCard/ThemeCard';
import PreviewPhone from '@/features/PreviewPhone/PreviewPhone';

const PresetsSidebar = () => {
  return (
    <Center sx={{ width: '100%', background: '#fff4ed', minHeight: '100vh' }} py="1rem">
      <PreviewPhone />
    </Center>
  );
};

export default PresetsSidebar;

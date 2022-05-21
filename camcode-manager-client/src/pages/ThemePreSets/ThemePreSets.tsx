import React from 'react';
import Layout from '@/layout/Layout';
import PresetsSidebar from '@/features/PresetsSidebar/PresetsSidebar';
import ThemeCreator from '@/features/ThemeCreator/ThemeCreator';

const ThemePreSets = () => {
  return (
    <Layout scrollStyles={<PresetsSidebar />}>
      <ThemeCreator />
    </Layout>
  );
};

export default ThemePreSets;

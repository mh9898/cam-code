import React from 'react';
import { Container } from '@mantine/core';
import { layoutStyle } from '@/layout/layout.style';

type Props = {
  children: React.ReactNode;
  scrollStyles: React.ReactNode;
};
const Layout = ({ children, scrollStyles }: Props) => {
  const { classes } = layoutStyle();
  return (
    <Container fluid classNames={classes}>
      <Container fluid classNames={classes} sx={{ flex: '1' }}>
        {scrollStyles}
      </Container>
      <Container fluid classNames={classes} sx={{ flex: '4' }}>
        {children}
      </Container>
    </Container>
  );
};

export default Layout;

import React from 'react';
import { previewPhoneLayoutStyle } from '@/layout/layout.style';
import { Container } from '@mantine/core';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import useCustomTheme from '@/hooks/useCustomTheme';

type Props = {
  children: React.ReactNode;
};
const PreviewCamcodeClientLayout = ({ children }: Props) => {
  const { classes } = previewPhoneLayoutStyle();
  const [style] = useCustomTheme();
  return (
    <Container classNames={classes} fluid>
      <Header />
      <div style={{ flex: '1', background: style.contentBG, paddingInline: '1rem' }}>
        {children}
      </div>
      <Footer />
    </Container>
  );
};

export default PreviewCamcodeClientLayout;

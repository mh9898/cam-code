import React from 'react';
import { Footer as FooterM, Image } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';
import VarCodeLogo from '@/assets/varcode-logo.png';
const Footer = () => {
  const { customStyle } = useCustomTheme();
  return (
    <FooterM
      height="10vh"
      sx={{
        display: 'flex',
        background: customStyle.notchBG,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image height={65} width={230} src={VarCodeLogo} />
    </FooterM>
  );
};

export default Footer;

import React from 'react';
import { Footer as FooterM, Image } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';
import VarCodeLogo from '@/assets/varcode-logo.png';
const Footer = () => {
  const [customStyle] = useCustomTheme();
  return (
    <FooterM
      height="10vh"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: customStyle.notchBG,
        alignItems: 'center',
        borderRadius: '0 0 1rem 1rem ',
      }}
    >
      <Image height={65} width={230} src={VarCodeLogo} />
    </FooterM>
  );
};

export default Footer;

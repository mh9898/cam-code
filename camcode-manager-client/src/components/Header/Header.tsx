import React from 'react';
import { headerStyle } from '@/components/Header/Header.style';
import { Anchor, Center, Container, Image, Text } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';

const Header = () => {
  const [customStyle] = useCustomTheme();
  const { classes } = headerStyle(customStyle.notchBG)();
  return (
    <header>
      <meta name="theme-color" content={customStyle.notchBG} />
      <Container classNames={classes} fluid>
        <Anchor m="1rem" href={'#'}>
          <Image
            sx={{ maxHeight: '100%', maxWidth: '100%' }}
            styles={{
              imageWrapper: {
                height: '6.2rem',
              },
              image: {
                maxHeight: '100%',
              },
            }}
            src={customStyle.headerIconIMG}
          />
        </Anchor>
      </Container>
    </header>
  );
};

export default Header;

import React from 'react';
import {headerStyle} from "@/components/Header/Header.style";
import {Anchor, Center, Container, Image, Text} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";

const Header = () => {
    const customStyle = useCustomTheme()
    const { classes } = headerStyle(customStyle.headerBG)()
    return (
        <header>
            <meta name="theme-color" content={customStyle.headerBG}/>
        <Container classNames={classes} fluid>
            <Anchor m="1rem" href={customStyle.headerIconURL}>
                <Image width={350} height={100} src={customStyle.headerIconIMG}/>
            </Anchor>

        </Container>
        </header>
    );
};

export default Header;

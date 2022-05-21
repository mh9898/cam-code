import React from 'react';
import { Card, Text, Title } from '@mantine/core';
type Props = {
  title: string;
  children: React.ReactNode;
};
const CustomizeCard = ({ title, children }: Props) => {
  return (
    <Card sx={(theme) => ({ background: theme.colors.gray[3] })}>
      <Title order={2}>{title}</Title>
      {children}
    </Card>
  );
};

export default CustomizeCard;

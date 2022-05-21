import { createStyles } from '@mantine/core';

export const headerStyle = (headerBg: string) =>
  createStyles((theme) => ({
    root: {
      padding: 0,
      background: headerBg,
      maxHeight: '8rem',
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
      borderRadius: '2rem 2rem 0 0 ',
    },
  }));

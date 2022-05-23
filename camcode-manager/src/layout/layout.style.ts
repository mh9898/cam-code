import { createStyles } from '@mantine/core';

export const layoutStyle = createStyles((theme) => ({
  root: {
    margin: 0,

    padding: 0,
    display: 'flex',
  },
}));
export const previewPhoneLayoutStyle = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: 'auto',
    paddingBlock: '2rem',
    borderRadius: '16px',
    height: '770px',
  },
}));

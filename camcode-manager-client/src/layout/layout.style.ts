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
    height: '100%',
    flexDirection: 'column',
    paddingInline: '2rem',
    paddingBlock: '8rem',
    borderRadius: '16px',
  },
}));

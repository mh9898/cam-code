import { Button, Center, Group, Modal } from '@mantine/core';
import React, { SetStateAction, useEffect, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import useCustomTheme from '@/hooks/useCustomTheme';
import { ICustomStyle } from '@/types/customStyle.type';
import { log } from 'util';

const WelcomeTextRte = () => {
  const [opened, setOpened] = useState(false);
  const [currentTheme, setCurrentTheme] = useCustomTheme();
  useEffect(() => {
    if (opened !== currentTheme.editInProgress) {
      setCurrentTheme((prev: ICustomStyle) => ({ ...prev, editInProgress: opened }));
    }
  }, [opened]);
  return (
    <>
      <Modal opened={opened} size="xl" onClose={() => setOpened(false)} title="Edit Welcome Text!">
        <RichTextEditor
          value={currentTheme.scanBarcodeInfoText}
          onChange={(value) =>
            setCurrentTheme((prev: ICustomStyle) => ({ ...prev, scanBarcodeInfoText: value }))
          }
        />
        <Center sx={{ justifyContent: 'flex-end' }} mt="1rem">
          <Button variant="outline" radius="xl" onClick={() => setOpened(false)}>
            Done
          </Button>
        </Center>
      </Modal>

      <Group position="center" sx={{ height: '80%' }}>
        <Button
          sx={{ color: '#007cbe' }}
          radius="xl"
          variant="outline"
          onClick={() => setOpened(true)}
        >
          Open Text Editor
        </Button>
      </Group>
    </>
  );
};

export default WelcomeTextRte;

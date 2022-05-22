import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllThemes } from '@/services/customTheme.service';
import { Anchor, Button, Card, Center, LoadingOverlay, Modal, Title } from '@mantine/core';
import { ICustomThemeMetadata } from '@/types/customStyle.type';
import useCustomTheme from '@/hooks/useCustomTheme';
import QRcode from 'react-qr-code';
import useNewPreset from '@/hooks/useNewPreset';
const ShowAllPresets = () => {
  const [customStyle, setCustomStyle] = useCustomTheme();
  const [isNewPreset, setIsNewPreset] = useNewPreset();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>('');
  const [openQrModal, setOpenQrModal] = useState(false);
  const fetchedPresets = useQuery('preset-list', getAllThemes, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const setPreset = (preset: ICustomThemeMetadata) => {
    setIsNewPreset(true);
    setOpenModal(false);
    setCustomStyle((prev: any) => ({ ...prev, ...preset, editInProgress: false }));
    setTimeout(() => {
      setIsNewPreset(false);
    }, 1000);
  };
  return (
    <>
      <Button variant="outline" radius="xl" color="red" onClick={() => setOpenModal(true)}>
        Show All Presets
      </Button>
      <Modal centered opened={openModal} onClose={() => setOpenModal(false)}>
        {fetchedPresets.isLoading && <LoadingOverlay visible />}
        {fetchedPresets.isError && <div>Error</div>}
        {fetchedPresets.isSuccess && (
          <>
            <Center sx={{ width: '100%', flexDirection: 'column' }}>
              {fetchedPresets.data.map((preset) => (
                <Card key={preset._id} withBorder radius="xl" mb="2rem">
                  <Title>{preset.companyName}</Title>
                  <Center>
                    <Button
                      radius="xl"
                      mr="1rem"
                      variant="outline"
                      onClick={() => setPreset(preset)}
                    >
                      Preview Theme
                    </Button>
                    <Button
                      radius="xl"
                      color="gray"
                      variant="outline"
                      onClick={() => {
                        setSelectedTheme(preset._id);
                        setOpenQrModal(true);
                      }}
                    >
                      Generate QR
                    </Button>
                  </Center>
                </Card>
              ))}
            </Center>
          </>
        )}
      </Modal>
      <Modal opened={openQrModal} onClose={() => setOpenQrModal(false)}>
        <Center sx={{ flexDirection: 'column' }}>
          <Anchor mb="2rem" href={`https://apps.varcode.com/${selectedTheme}`}>
            Or Press here to see the results
          </Anchor>
          <QRcode
            value={
              selectedTheme
                ? `https://apps.varcode.com/${selectedTheme}`
                : 'https://apps.varcode.com'
            }
          />
          {/*<img*/}
          {/*  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${JSON.stringify(*/}
          {/*    customStyle*/}
          {/*  )}`}*/}
          {/*  alt="qr"*/}
          {/*/>*/}
        </Center>
      </Modal>
    </>
  );
};

export default ShowAllPresets;

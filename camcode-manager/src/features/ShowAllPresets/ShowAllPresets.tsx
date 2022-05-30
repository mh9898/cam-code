import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTheme, getAllThemes } from '@/services/customTheme.service';
import { Anchor, Button, Card, Center, LoadingOverlay, Modal, Title } from '@mantine/core';
import { ICustomThemeMetadata } from '@/types/customStyle.type';
import useCustomTheme from '@/hooks/useCustomTheme';
import QRcode from 'react-qr-code';
import useNewPreset from '@/hooks/useNewPreset';
import { notifications } from '@/utils/Notifications/notifications';

const ShowAllPresets = () => {
  const queryClient = useQueryClient();
  const [showDeleteDailogModal, setShowDeleteDailogModal] = useState(false);
  const [__, setCustomStyle] = useCustomTheme();
  const [_, setIsNewPreset] = useNewPreset();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [openQrModal, setOpenQrModal] = useState(false);
  const fetchedPresets = useQuery('presetList', getAllThemes, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 5000,
  });
  const deletePresetMutate = useMutation(deleteTheme, {
    onSuccess: () => notifications.success('Preset Deleted Successfully'),
    onError: () => notifications.error('Error Deleting Preset'),
  });
  const setPreset = (preset: ICustomThemeMetadata) => {
    setIsNewPreset(true);
    setOpenModal(false);
    setCustomStyle((prev: any) => ({ ...prev, ...preset, editInProgress: false }));
    setTimeout(() => {
      setIsNewPreset(false);
    }, 1000);
  };
  const removePreset = async () => {
    await deletePresetMutate.mutateAsync({ id: selectedTheme });
    await queryClient.invalidateQueries('presetList');
    setShowDeleteDailogModal(false);
  };
  return (
    <>
      <Button variant="outline" radius="xl" color="red" onClick={() => setOpenModal(true)}>
        Show All Presets
      </Button>
      <Modal
        size="xl"
        centered
        opened={openModal}
        styles={{ body: { overflowY: 'auto', maxHeight: '50vh' } }}
        onClose={() => setOpenModal(false)}
      >
        {fetchedPresets.isLoading && <LoadingOverlay visible />}
        {fetchedPresets.isError && <div>Error</div>}
        {fetchedPresets.isSuccess && (
          <>
            <Center sx={{ flexDirection: 'column', maxHeight: '60vh', overflowY: 'auto' }}>
              {fetchedPresets.data.map((preset) => (
                <Card key={preset._id} withBorder radius="xl" mb="2rem">
                  <Title>{preset.companyName}</Title>
                  <Center>
                    <Button radius="xl" variant="outline" onClick={() => setPreset(preset)}>
                      Preview Theme
                    </Button>
                    <Button
                      radius="xl"
                      color="gray"
                      mx="1rem"
                      variant="outline"
                      onClick={() => {
                        setSelectedTheme(preset._id ?? '');
                        setOpenQrModal(true);
                      }}
                    >
                      Generate QR
                    </Button>
                    <Button
                      color="red"
                      radius="xl"
                      variant="outline"
                      onClick={() => {
                        setSelectedTheme(preset._id ?? '');
                        setShowDeleteDailogModal(true);
                      }}
                    >
                      Delete Preset
                    </Button>
                  </Center>
                </Card>
              ))}
            </Center>
          </>
        )}
      </Modal>
      <Modal
        opened={openQrModal}
        onClose={() => {
          setOpenQrModal(false);
          setSelectedTheme('');
        }}
      >
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
        </Center>
      </Modal>
      <Modal opened={showDeleteDailogModal} onClose={() => setShowDeleteDailogModal(false)}>
        <Center sx={{ flexDirection: 'column', width: '100%', textAlign: 'center' }}>
          <Title mb="1rem">Are you sure you want to delete this preset?</Title>
          <Button color="red" radius="xl" variant="outline" onClick={removePreset}>
            Delete
          </Button>
        </Center>
      </Modal>
    </>
  );
};

export default ShowAllPresets;

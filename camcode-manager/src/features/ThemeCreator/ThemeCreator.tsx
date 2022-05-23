import React, { useState } from 'react';
import { Button, Center, ColorInput, ColorPicker } from '@mantine/core';
import CustomizeCard from '@/features/ThemeCreator/components/CustomizeCard/CustomizeCard';
import WelcomeTextRte from '@/features/ThemeCreator/components/WelcomeTextRTE/WelcomeTextRTE';
import UploadLogo from '@/features/ThemeCreator/components/UploadLogo/UploadLogo';
import ContactDetails from '@/features/ThemeCreator/components/ContactDetails/ContactDetails';
import useCustomTheme from '@/hooks/useCustomTheme';
import { ICustomStyle, ICustomThemeMetadata } from '@/types/customStyle.type';
import { createThemeService } from '@/services/customTheme.service';
import { showNotification } from '@mantine/notifications';
import { notifications } from '@/utils/Notifications/notifications';
import { useQueryClient } from 'react-query';

const ThemeCreator = () => {
  const [currentTheme, setCurrentTheme] = useCustomTheme();
  const [contactDetails, setContactDetails] = useState<ICustomThemeMetadata | null>(null);
  const queryClient = useQueryClient();
  const createTheme = async () => {
    if (currentTheme.headerIconIMG.length < 100) {
      alert('Please upload a logo');
      return;
    }
    if (!contactDetails?.websiteLink)
      return notifications.error('Please fill all contacts details and validate it!');
    try {
      const result = await createThemeService({ ...currentTheme, ...contactDetails });
      console.log(result);
      notifications.success('Theme Created Successfully');
      await queryClient.invalidateQueries('presetList');
    } catch (e) {
      console.log(e);
      notifications.error('Error Creating Theme');
    }
  };

  return (
    <Center sx={{ width: '100%', flexDirection: 'column', overflowY: 'auto', maxHeight: '100%' }}>
      <div
        style={{
          display: 'grid',
          width: '85%',
          gridTemplateColumns: 'repeat(auto-fit, minmax(22rem, 1fr))',
          gridRowGap: '1rem',
          gridColumnGap: '1rem',
        }}
      >
        <CustomizeCard title={'Select Notch color'}>
          <ColorInput
            label="Notch color"
            radius="lg"
            size="md"
            required
            value={currentTheme.notchBG}
            onChange={(notchBG) => setCurrentTheme((prev: ICustomStyle) => ({ ...prev, notchBG }))}
          />
        </CustomizeCard>
        <CustomizeCard title={'Select Background color'}>
          <ColorInput
            label="Background color"
            radius="lg"
            size="md"
            required
            value={currentTheme.contentBG}
            onChange={(contentBG) =>
              setCurrentTheme((prev: ICustomStyle) => ({ ...prev, contentBG }))
            }
          />
        </CustomizeCard>
        <CustomizeCard title={'Select Font Color'}>
          <ColorInput
            label="Font Color"
            radius="lg"
            size="md"
            required
            value={currentTheme.fontColor}
            onChange={(fontColor) =>
              setCurrentTheme((prev: ICustomStyle) => ({ ...prev, fontColor }))
            }
          />
        </CustomizeCard>
        <CustomizeCard title="Pick logo icon">
          <UploadLogo />
        </CustomizeCard>
        <CustomizeCard title={'Welcome Text'}>
          <WelcomeTextRte />
        </CustomizeCard>
        <CustomizeCard title={'Contact Details'}>
          <ContactDetails setContactDetails={setContactDetails} />
        </CustomizeCard>
      </div>
      <Button mt="2rem" color="green" variant="outline" radius="xl" onClick={createTheme}>
        Save
      </Button>
    </Center>
  );
};

export default ThemeCreator;

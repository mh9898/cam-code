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

const ThemeCreator = () => {
  const [currentTheme, setCurrentTheme] = useCustomTheme();
  const [contactDetails, setContactDetails] = useState<ICustomThemeMetadata | null>(null);

  console.log(currentTheme);
  const createTheme = async () => {
    if (currentTheme.headerIconIMG.length < 100) {
      alert('Please upload a logo');
      return;
    }
    if (!contactDetails?.websiteLink)
      return showNotification({
        title: 'Error',
        message: 'please fill contact details and validate it',
        color: 'red',
      });
    try {
      const result = await createThemeService({ ...currentTheme, ...contactDetails });
      console.log(result);
      showNotification({
        title: 'Success',
        message: 'Theme created!',
        color: 'green',
      });
    } catch (e) {
      console.log(e);
      showNotification({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    }
  };

  return (
    <Center sx={{ width: '100%', flexDirection: 'column' }}>
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

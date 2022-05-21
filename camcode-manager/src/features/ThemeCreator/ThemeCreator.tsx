import React, { useState } from 'react';
import { Center, ColorInput, ColorPicker } from '@mantine/core';
import CustomizeCard from '@/features/ThemeCreator/components/CustomizeCard/CustomizeCard';
import WelcomeTextRte from '@/features/ThemeCreator/components/WelcomeTextRTE/WelcomeTextRTE';
import UploadLogo from '@/features/ThemeCreator/components/UploadLogo/UploadLogo';
import ContactDetails from '@/features/ThemeCreator/components/ContactDetails/ContactDetails';
import useCustomTheme from '@/hooks/useCustomTheme';
import { ICustomStyle } from '@/types/customStyle.type';

const ThemeCreator = () => {
  const [currentTheme, setCurrentTheme] = useCustomTheme();

  return (
    <Center sx={{ width: '100%' }}>
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
          <ContactDetails />
        </CustomizeCard>
      </div>
    </Center>
  );
};

export default ThemeCreator;

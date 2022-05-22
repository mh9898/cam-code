import React, { useEffect, useState } from 'react';
import PreviewCamcodeClientLayout from '@/layout/PreviewCamcodeClientLayout/PreviewCamcodeClientLayout';
import { RichTextEditor } from '@mantine/rte';
import { Center, Image, Loader, LoadingOverlay, Text } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';
import { ICustomStyle } from '@/types/customStyle.type';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;
import useNewPreset from '@/hooks/useNewPreset';

const PreviewPhone = () => {
  const [currentTheme, onChange] = useCustomTheme();
  const [isNewPreset] = useNewPreset();
  useEffect(() => {}, [currentTheme.editInProgress]);
  return (
    <PreviewCamcodeClientLayout>
      {!currentTheme.editInProgress && !isNewPreset ? (
        <RichTextEditor
          value={currentTheme.scanBarcodeInfoText}
          styles={{
            root: { border: 'none', backgroundColor: 'transparent', color: currentTheme.fontColor },
          }}
          onChange={(value) =>
            onChange((prev: ICustomStyle) => ({ ...prev, scanBarcodeInfoText: value }))
          }
          readOnly
        />
      ) : (
        <Center mb="1rem">
          <Loader size="xl" />
        </Center>
      )}
      <Text>Barcdoe Scanner :</Text>
      <Image width={300} height={100} />
    </PreviewCamcodeClientLayout>
  );
};

export default PreviewPhone;

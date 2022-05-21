import React, { useEffect, useState } from 'react';
import PreviewCamcodeClientLayout from '@/layout/PreviewCamcodeClientLayout/PreviewCamcodeClientLayout';
import { RichTextEditor } from '@mantine/rte';
import { Image } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';
import { ICustomStyle } from '@/types/customStyle.type';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

const PreviewPhone = () => {
  const [currentTheme, onChange] = useCustomTheme();
  useEffect(() => {}, [currentTheme.editInProgress]);
  return (
    <PreviewCamcodeClientLayout>
      {!currentTheme.editInProgress && (
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
      )}
      <Image width={300} height={100} />
    </PreviewCamcodeClientLayout>
  );
};

export default PreviewPhone;

import { Button, Center, Image, Paper, Text, Title } from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { sendBarcode } from '@/services/barcode.service';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { RichTextEditor } from '@mantine/rte';
import useCustomTheme from '@/hooks/useCustomTheme';
import { useMutation } from 'react-query';
import ErrorOnScan from '@/pages/ErrorOnScan/ErrorOnScan';

export const getHexColor = (number: string) => {
  const strToNum = Number(number);
  if (!strToNum) return '#989a81';
  return '#' + ('000000' + (strToNum >>> 0).toString(16)).slice(-6);
};

const ScanCode = () => {
  const { customStyle, setCustomStyle } = useCustomTheme();
  const { state } = useLocation();
  const [code, setCode] = useState<string>('');
  const [value, onChange] = useState(customStyle.scanBarcodeInfoText);
  const navigate = useNavigate();

  const handleSendBarcode = useMutation(sendBarcode, {
    onError: () => navigate('/ErrorOnScan'),
    onSuccess: (res) => {
      setCustomStyle((prev: any) => ({ ...prev, iScanID: res.message.scid }));
      navigate('/ReviewScan', {
        state: {
          cardBg: getHexColor(res.message.nBColor),
          result: res.message.sConfirmationText,
          sQuality: res.message.sQuality,
        },
      });
    },
  });

  useEffect(() => {
    const sendRequest = async () => {
      if (code.length > 12) {
        setCustomStyle((prev: any) => ({ ...prev, barcode: code.slice(1) }));
        handleSendBarcode.mutate({
          barcode: code.slice(1),
          //@ts-ignore
          long: state?.longitude || 0,
          //@ts-ignore
          lat: state?.latitude || 0,
        });
      }
    };
    sendRequest();
  }, [code]);
  const onSkip = () => {
    navigate('/ReviewScan', {
      state: {
        cardBg: '#ab2929',
        result: 'You Meal is out of date',
      },
    });
  };
  return (
    <Layout>
      <Center sx={{ flexDirection: 'column' }}>
        <RichTextEditor
          value={value}
          styles={{
            root: { border: 'none', backgroundColor: 'transparent' },
          }}
          onChange={onChange}
          readOnly
        />
        {!code && (
          <div style={{ width: '90vw' }}>
            <Text>
              If you are having trouble scanning the tag, change the barcode’s distance from the
              camera.
            </Text>
            <BarCodeScanner
              onUpdate={(err, resp): void => {
                if (resp) {
                  if (resp.getText().length > 9) setCode(resp.getText());
                }
              }}
            />
          </div>
        )}
        {handleSendBarcode.isLoading && <p>loading...</p>}
        {import.meta.env.DEV && <Button onClick={onSkip}>Skip</Button>}
      </Center>
    </Layout>
  );
};

export default ScanCode;

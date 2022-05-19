import { Button, Center, Image, Paper, Title } from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { sendBarcode } from '@/services/barcode.service';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { RichTextEditor } from '@mantine/rte';
import useCustomTheme from '@/hooks/useCustomTheme';
import { useMutation } from 'react-query';

export const getHexColor = (number: string) => {
  const strToNum = Number(number);
  if (!strToNum) return '#989a81';
  return '#' + ('000000' + (strToNum >>> 0).toString(16)).slice(-6);
};

const ScanCode = () => {
  const customStyle = useCustomTheme();
  const { state } = useLocation();
  const [code, setCode] = useState<string>('');
  const [value, onChange] = useState(customStyle.scanBarcodeInfoText);
  const navigate = useNavigate();

  const handleSendBarcode = useMutation(sendBarcode);

  useEffect(() => {
    const sendRequest = async () => {
      if (code.length > 12) {
        console.log(code);
        const res = await handleSendBarcode.mutateAsync({
          barcode: code.slice(1),
          //@ts-ignore
          long: state?.longitude || 0,
          //@ts-ignore
          lat: state?.latitude || 0,
        });

        navigate('/ReviewScan', {
          state: {
            cardBg: getHexColor(res.message.nBColor),
            result: res.message.sConfirmationText.slice(5),
          },
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
      {/*{code && (*/}
      {/*  <>*/}
      {/*    {result ? (*/}
      {/*      <Paper sx={{ background: color }} p="2rem">*/}
      {/*        <h2>{result}</h2>*/}
      {/*      </Paper>*/}
      {/*    ) : (*/}
      {/*      <h2>Scanning...</h2>*/}
      {/*    )}*/}
      {/*    <Button onClick={() => setCode('')}> Scan Again </Button>*/}
      {/*  </>*/}
      {/*)}*/}
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

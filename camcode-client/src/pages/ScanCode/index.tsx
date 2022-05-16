import { Button, Center, Image } from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { SendBarcode } from '@/services/barcode.service';

const ScanCode = () => {
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [latLong, setLatLong] = useState<any>({longitude: 0, latitude: 0});
  useEffect(()=>{
    function success(position: { coords: { latitude: any; longitude: any; }; }) {
      const { latitude, longitude } = position.coords;
      setLatLong({latitude, longitude});
    }
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0});
  }, [])
  useEffect(() => {
    if (code.length > 12) {
      const sendRequest = async () => {
        const res = await SendBarcode(code.slice(1), latLong.longitude, latLong.latitude);
        console.log(res.message.sConfirmationText);
        if (res.message.sConfirmationText) {
          setResult(res.message.sConfirmationText.slice(5));
        } else {
          setCode('');
        }
        console.log(res);
      };
      sendRequest();
    } else {
      setCode('');
    }
  }, [code]);
  return (
    <Center
      sx={(theme) => ({
        background: theme.fn.linearGradient(45, 'cyan', 'blue'),
        flexDirection: 'column',
      })}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Image src={VarCodeLogoSrc} sx={{ width: '90%' }} />
      {code && (
        <>
          {result ? <h2>{result}</h2> : <h2>Scanning...</h2>}
          <Button onClick={() => setCode('')}> Scan Again </Button>
        </>
      )}
      {!code && (
        <BarCodeScanner
          onUpdate={(err, resp): void => {
            if (resp) {
              if (resp.getText().length > 9) setCode(resp.getText());
            }
          }}
        />
      )}
    </Center>
  );
};

export default ScanCode;

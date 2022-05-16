import {Button, Center, Image, Paper} from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { SendBarcode } from '@/services/barcode.service';

export const getHexColor = (number: string) => {
  const strToNum = Number(number);
  if(!strToNum) return '#989a81';
  return "#" + ("000000" + (strToNum >>> 0).toString(16)).slice(-6);
};

const ScanCode = () => {
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [color, setColor] = useState<string>('#fff');
  const [latLong, setLatLong] = useState<any>({longitude: 0, latitude: 0});
  useEffect(()=>{
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition((position) =>{
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setLatLong({latitude, longitude});
    } , error, {enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0});
  }, [])
  useEffect(() => {
    if (code.length > 12) {
      const sendRequest = async () => {
        const res = await SendBarcode(code.slice(1), latLong.longitude, latLong.latitude);
        console.log(res.message.sConfirmationText);
        if (res.message.sConfirmationText) {
          setColor(getHexColor(res.message.nBColor))
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
          {result ? <Paper sx={{background: color}} p="2rem"><h2>{result}</h2></Paper> : <h2>Scanning...</h2>}
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

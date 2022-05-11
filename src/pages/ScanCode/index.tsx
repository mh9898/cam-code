import {Button, Center, Image, Paper} from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { SendBarcode } from '@/services/barcode.service';
import {getHexColor} from "@/pages/ScanCode/ScanCode.logic";

const ScanCode = () => {
  const [result, setResult] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [color, setColor] = useState<string>('#fff');
  let long = '';
  let lat = '';
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos: { coords: any; }) {
      const crd = pos.coords;
      console.log(`Latitude : ${crd.latitude}`);
      lat = crd.latitude;
      long = crd.longitude;
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err: { code: any; message: any; }) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);


  useEffect(() => {
    if (code.length > 12) {
      const sendRequest = async () => {
        const res = await SendBarcode(code.slice(1), lat, long);
        console.log(res.message.sConfirmationText);
        if (res.message.sConfirmationText) {
          setResult(res.message.sConfirmationText.slice(5));
          console.log(getHexColor(res.message.nBColor))
          setColor(getHexColor(res.message.nBColor))
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
          {result ?   <Paper my="1rem" p="2rem" sx={{background: color}}>
            <h2>{result}</h2>
          </Paper> : <h2>Scanning...</h2>}
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
// const handleChange = (e) => {
//     const [f] = e.target.files;
//     console.log(URL.createObjectURL(f))
//     QuaggaDecode(URL.createObjectURL(f), setFile)
// };

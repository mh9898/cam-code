import { Center, Image } from '@mantine/core';
import BarCodeScanner from 'barcode-react-scanner';
import React, { useEffect, useState } from 'react';

import VarCodeLogoSrc from '@/assets/varcode-logo.png';
import { SendBarcode } from '@/services/barcode.service';

const ScanCode = () => {
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  useEffect(() => {
    if (code.length > 12) {
      const sendRequest = async () => {
        const res = await SendBarcode(code.slice(1));
        console.log(res.message.sConfirmationText);
        if (res.message.sConfirmationText) {
          setResult(res.message.sConfirmationText.slice(1, 5));
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
      {code && <h2> {result} </h2>}
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

import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { CustomThemeContext } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import VarCodeLogo from '@/assets/varcode-logo.png';
type Props = {
  children: React.ReactNode;
};
const AppProviders = ({ children }: Props) => {
  const [customStyle, setCustomStyle] = useState({
    headerBG: '#d7d7d7',
    headerIconIMG: VarCodeLogo,
    headerIconURL: 'https://www.google.com',
    contentBG: '#e8e8e8',
    scanBarcodeInfoText:
      '<h3><strong>Welcome!</strong></h3><h4><strong>you have just unpacked your box containing you meal-kits!</strong></h4><h4>scan the enclosed tag to provide us feedback and information, to ensure your satisfaction with our service</h4><p><br></p>',
  });
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ fontFamily: 'Poppins', headings: { fontFamily: 'Poppins' } }}>
        <CustomThemeContext.Provider value={{ customStyle, setCustomStyle }}>
          {children}
        </CustomThemeContext.Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;

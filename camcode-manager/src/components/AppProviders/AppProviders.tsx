import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import VarCodeLogo from '@/assets/varcode-logo.png';
import { CustomThemeContext } from '@/context/ThemeContext';
import { ICustomStyle } from '@/types/customStyle.type';
import { NotificationsProvider } from '@mantine/notifications';
type Props = {
  children: React.ReactNode;
};
const AppProviders = ({ children }: Props) => {
  const [customStyle, setCustomStyle] = useState<ICustomStyle>({
    notchBG: '#1a3b4e',
    headerIconIMG: VarCodeLogo,
    headerIconURL: 'https://www.google.com',
    editInProgress: false,
    contentBG: '#ffffff',
    fontColor: '#000000',
    scanBarcodeInfoText:
      '<h3><strong>Welcome!</strong></h3><h4><strong>you have just unpacked your box containing you meal-kits!</strong></h4><h4>scan the enclosed tag to provide us feedback and information, to ensure your satisfaction with our service</h4><p><br></p>',
  });
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <MantineProvider
          theme={{ fontFamily: 'Montserrat', headings: { fontFamily: 'Montserrat' } }}
        >
          <CustomThemeContext.Provider value={{ customStyle, setCustomStyle }}>
            {children}
          </CustomThemeContext.Provider>
        </MantineProvider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;

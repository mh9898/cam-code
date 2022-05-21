import { createContext } from 'react';

export const CustomThemeContext = createContext<{ customStyle: any; setCustomStyle: any }>({
  customStyle: {},
  setCustomStyle: null,
});

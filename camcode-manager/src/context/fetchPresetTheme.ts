import { createContext } from 'react';

export const FetchPresetThemeContext = createContext<{
  isNewPreset: boolean;
  setIsNewPreset: any;
}>({ isNewPreset: false, setIsNewPreset: () => {} });

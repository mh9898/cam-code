import { useContext } from 'react';
import { FetchPresetThemeContext } from '@/context/fetchPresetTheme';

const useNewPreset = () => {
  const { isNewPreset, setIsNewPreset } = useContext(FetchPresetThemeContext);
  return [isNewPreset, setIsNewPreset];
};
export default useNewPreset;

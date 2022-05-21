import { ICustomStyle, ICustomThemeMetadata } from '@/types/customStyle.type';
import VarCodeAPI from './axioConfig';

export const createThemeService = async (data: ICustomStyle & ICustomThemeMetadata) => {
  const { editInProgress, ...customThemeData } = data;
  customThemeData.headerIconURL = customThemeData.websiteLink;
  return await VarCodeAPI.post(`/customTheme`, customThemeData);
};

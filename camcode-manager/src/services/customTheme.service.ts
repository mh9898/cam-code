import { ICustomStyle, ICustomThemeMetadata } from '@/types/customStyle.type';
import VarCodeAPI from './axioConfig';

export const createThemeService = async (data: ICustomStyle & ICustomThemeMetadata) => {
  const { editInProgress, ...customThemeData } = data;
  customThemeData.headerIconURL = customThemeData.websiteLink;
  delete customThemeData._id;
  return await VarCodeAPI.post(`/customTheme`, customThemeData);
};
export const getAllThemes = async () => {
  const { data } = await VarCodeAPI.get(`/customTheme`);
  return data as ICustomStyle & ICustomThemeMetadata[];
};
export const deleteTheme = async ({ id }: { id: string }) => {
  return await VarCodeAPI.delete(`/customTheme/${id}`);
};

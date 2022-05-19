import {createContext} from "react";

export const CustomThemeContext = createContext<{customStyle: any} | {customStyle: any, setCustomStyle: any} >({customStyle: {}})

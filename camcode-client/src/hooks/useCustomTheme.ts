import {CustomThemeContext} from "@/context/ThemeContext";
import {useContext} from "react";

const useCustomTheme = () => {
    const {customStyle} = useContext(CustomThemeContext);
    return customStyle
}
export default useCustomTheme

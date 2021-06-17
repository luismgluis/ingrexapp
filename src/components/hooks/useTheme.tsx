import { useState } from "react";
import { useSelector } from "react-redux";
import { theme0 } from "../../themes/theme0";
import { theme1 } from "../../themes/theme1";

const TAG = "USE THEME";
export function useTheme() {
  const [theme, setTheme] = useState(theme1);
  useSelector((store: any) => {
    try {
      const newTheme = store.generalValues.theme;
      if (!isNaN(newTheme)) {
        if (newTheme === 1) {
          setTheme(theme1);
        } else {
          setTheme(theme0);
        }
      }
      return newTheme;
    } catch (error) {
      console.log(TAG, error);
    }
    return 0;
  });
  return theme;
}

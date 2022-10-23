import { swithTheme } from "@src/redux/slices/themeSlice";
import { lightTheme, darkTheme } from "@src/constants/theme";
import { useAppDispatch, useAppSelector } from "./useAppStore";

export default () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const handleToggleTheme = () => {
    if (theme.mode === "light") {
      dispatch(swithTheme(darkTheme));
    } else {
      dispatch(swithTheme(lightTheme));
    }
  };

  return { theme, handleToggleTheme };
};

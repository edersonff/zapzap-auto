import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useColorScheme } from "@mui/joy";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  const { setMode } = useColorScheme();

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);

    setMode(colorMode === "dark" ? "dark" : "light");
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;

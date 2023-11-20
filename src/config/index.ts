import { extendTheme } from "@chakra-ui/react";
import { createPaletteFromColor } from "palettey";
import { iconButtonTheme } from "./components";

function generateColor(key: string, color: string) {
  const res = createPaletteFromColor(key, color, {});
  return res[key];
}

const themeConfig = {
  colors: {
    primary: generateColor("primary", "#6A5FF5"),
    danger: generateColor("danger", "#EE786C"),
    gray: generateColor('gray', '#e0e5e7')
  },
  components: {
    Button: iconButtonTheme
  }
};

export const theme = extendTheme(themeConfig);

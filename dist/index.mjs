export { default as defaultTailwindColors } from 'tailwindcss/colors';
import tinycolor from 'tinycolor2';
import plugin from 'tailwindcss/plugin';

// src/defaults.ts
var defaultColors = {
  /**
   * @see https://www.tailwindshades.com/#color=220%2C15.294117647058819%2C50&step-up=8&step-down=11&hue-shift=0&name=slate-gray&base-stop=5&v=1&overrides=eyIxIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjk0LCJoZXgiOiJFREVGRjIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIyIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjg5LCJoZXgiOiJERkUyRTciLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIzIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjgxLCJoZXgiOiJDN0NDRDYiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI0Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjY2LCJoZXgiOiI5QkE0QjYiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI2Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjMxLCJoZXgiOiI0MzRCNUIiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI3Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjIyLCJoZXgiOiIzMDM1NDEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI4Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjE1LCJoZXgiOiIyMDI0MkMiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI5Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjcsImhleCI6IjBGMTExNSIsInRleHRDb2xvciI6IndoaXRlIn0sIjAuNSI6eyJodWUiOi0xLCJzYXR1cmF0aW9uIjotMSwibGlnaHRuZXNzIjo5OCwiaGV4IjoiRjlGQUZCIiwidGV4dENvbG9yIjoiYmxhY2sifSwiOS41Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjQsImhleCI6IjA5MEEwQyIsInRleHRDb2xvciI6IndoaXRlIn19
   */
  "frame": {
    // ...defaultTailwindColors.gray
    50: "#F9FAFB",
    100: "#EDEFF2",
    200: "#DFE2E7",
    300: "#C7CCD6",
    400: "#9BA4B6",
    500: "#6C7993",
    600: "#434B5B",
    700: "#303541",
    800: "#20242C",
    900: "#0F1115",
    950: "#090A0C"
  },
  primary: {
    50: "#E3F0FC",
    100: "#CCE4FA",
    200: "#9DCBF6",
    300: "#6FB2F1",
    400: "#4099ED",
    500: "#1680E4",
    600: "#1166B6",
    700: "#0D4C87",
    800: "#09345D",
    900: "#051D33",
    950: "#03111E"
  },
  secondary: {
    50: "#FFDAD4",
    100: "#FFCBC2",
    200: "#FFAD9E",
    300: "#FF8E7B",
    400: "#FF7057",
    500: "#F04E2D",
    600: "#D32F12",
    700: "#A5240D",
    800: "#7D1908",
    900: "#550E02",
    950: "#430E04"
  },
  tertiary: {
    50: "#F7F6F5",
    100: "#ECECE9",
    200: "#D8D6D0",
    300: "#C3C0B7",
    400: "#AEAA9E",
    500: "#999485",
    600: "#7D7868",
    700: "#5F5B4F",
    800: "#403D35",
    900: "#21201C",
    950: "#12110F"
  },
  danger: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  info: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  }
};
var defaultTheme = {
  name: "default",
  variables: {
    "--text-light": defaultColors.frame["100"],
    "--text-dark": defaultColors.frame["700"],
    "--bg-light": "#ffffff",
    "--bg-dark": "#14161c",
    // defaultColors.frame['900'],
    "--bg-white": "#ffffff",
    "--body-text-light": defaultColors.frame["700"],
    "--body-text-dark": defaultColors.frame["100"],
    "--body-bg-light": "#ffffff",
    "--body-bg-dark": "#14161c"
    // defaultColors.frame['900'],
  },
  colors: { ...defaultColors }
};
function isHexRgbHslColor(str) {
  return ["#", "rgb", "rgba", "hsl", "hsla"].some((s) => str.startsWith(s));
}
function getRgbChannels(color) {
  const c = tinycolor(color).toRgb();
  return `${c.r} ${c.g} ${c.b}`;
}
function ensureDefault(colors) {
  for (const [, map] of Object.entries(colors)) {
    if (typeof map !== "object" || map === null || Array.isArray(map))
      continue;
    map["DEFAULT"] = map["DEFAULT"] || map["500"];
  }
  return colors;
}
function generateTailwindVars(colors, parent = "") {
  return Object.entries(ensureDefault(colors)).reduce((result, [key, value]) => {
    const colorName = parent === "" ? `${key}` : key === "DEFAULT" ? `${parent}` : `${parent}-${key}`;
    const formattedValue = `rgb(var(--color-${colorName})/<alpha-value>)`;
    const currentResult = typeof value === "string" ? { [key]: formattedValue } : { [key]: generateTailwindVars(value, key) };
    return { ...result, ...currentResult };
  }, {});
}
function generateVariables(variables) {
  return Object.entries(variables).reduce((result, [key, value]) => {
    if (isHexRgbHslColor(value))
      value = getRgbChannels(value);
    result[key] = value;
    return result;
  }, {});
}
function generateRootVars(colors, name = "") {
  return Object.keys(ensureDefault(colors)).reduce((result, shadeOrObj) => {
    const value = colors[shadeOrObj];
    const key = shadeOrObj === "DEFAULT" ? `--color-${name}` : `--color-${name}-${shadeOrObj}`;
    const currentResult = typeof value === "string" ? { [key]: getRgbChannels(value) } : generateRootVars(value, shadeOrObj);
    return { ...result, ...currentResult };
  }, {});
}
function mergeColors(colors, defaults) {
  const clone = JSON.parse(JSON.stringify(defaults));
  for (const [k, v] of Object.entries(colors)) {
    if (typeof clone[k] === "undefined")
      continue;
    clone[k] = { ...clone[k], ...v };
  }
  return clone;
}
function generateThemes(config) {
  return Object.entries(config).reduce((result, [key, theme]) => {
    const { colors: c, variables: v, ...rest } = theme;
    theme = {
      name: key,
      preprocess: "both",
      colors: mergeColors(c, defaultTheme.colors),
      // not deep merge only merges top level color key.
      variables: { ...defaultTheme.variables, ...v },
      ...rest
    };
    const variables = ["both", "variables"].includes(theme.preprocess || "") ? generateVariables(theme.variables) : theme.variables;
    const colors = ["both", "colors"].includes(theme.preprocess || "") ? generateRootVars(theme.colors) : theme.colors;
    result[`:root [data-theme='${theme.name}']`] = {
      ...variables,
      ...colors
    };
    return result;
  }, {});
}
var aft = plugin.withOptions(
  (config) => {
    return (opts) => {
      const { addBase, addUtilities, matchUtilities, addComponents, theme } = opts;
      addBase({
        ...generateThemes(config),
        // this seems to accept only string in types but array works hmmm...
        // '@font-face': [{
        //   fontFamily: 'Poppins',
        //   fontStyle: 'normal',
        //   fontWeight: '400',
        //   src:
        //     "url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap) format('woff2')"
        // } as any],
        html: {
          height: "100%"
        },
        body: {
          height: "100%",
          // 'background-color': 'rgb(var(--body-bg-light))',
          // color: 'rgb(var(--body-text-light))'
          "background-color": "rgb(var(--bg-light))",
          color: "rgb(var(--text-dark))"
        },
        ".dark body": {
          // 'background-color': 'rgb(var(--body-bg-dark))',
          // color: 'rgb(var(--body-text-dark))'
          "background-color": "rgb(var(--bg-dark))",
          color: "rgb(var(--text-light))"
        },
        "@keyframes fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      });
      addUtilities({
        // color of text in darkmode.
        "body-text-dark": {
          // color: `rgb(var(--body-text-dark))`
          color: `rgb(var(--text-light))`
        },
        // color of text in lightmode
        "body-text-light": {
          // color: `rgb(var(--body-text-light))`
          color: `rgb(var(--text-dark))`
        },
        ".body-dark": {
          //'background-color': `rgb(var(--body-bg-dark))`
          "background-color": `rgb(var(--bg-dark))`
        },
        ".body-light": {
          //'background-color': `rgb(var(--body-bg-light))`
          "background-color": `rgb(var(--bg-light))`
        },
        // dark color text = body-text-light
        ".text-dark": {
          // color: `rgb(var(--body-text-light))`
          color: `rgb(var(--text-dark))`
        },
        // light color text = body-text-dark
        ".text-light": {
          // color: `rgb(var(--body-text-dark))`
          color: `rgb(var(--text-light))`
        },
        ".text-md": {
          fontSize: "1.0rem",
          lineHeight: "1.5"
        },
        ".small-caps": {
          "font-variant": "all-small-caps"
        },
        ".fade-in-down": "fade-in-down .3s ease-out"
      });
      matchUtilities({
        brightness: (value) => ({
          filter: `brightness(${value})`
        })
      }, {
        values: { ...theme("brightness"), 80: ".80", 85: ".85", 102: "1.02", 115: "1.15", 135: "1.35" }
      });
      matchUtilities({
        animate: (value) => ({
          animation: value
        })
      }, {
        values: { ...theme("animation"), "fade-in-down": "fade-in-down 0.3s ease-out" }
      });
    };
  },
  () => {
    return {
      theme: {
        extend: {
          // Generate variables that Tailwind uses to consume Css variables.
          // TODO: add ability for additional color names/keys.
          // ex: {
          //    primary: 'rgb(var(--color-${colorName})/<alpha-value>)',
          //    secondary: 'rgb(var(--color-${colorName})/<alpha-value>)',
          //    ....continue w/ each color
          // }
          colors: generateTailwindVars(defaultTheme.colors)
          // fontFamily: {
          //   // make sure this font family is the same as the one
          //   // defined in your @font-face
          //   sans: ['Poppins', ...fontFamily.sans]
          // },
        }
      }
    };
  }
);

export { aft, defaultColors, defaultTheme, ensureDefault, generateRootVars, generateTailwindVars, generateThemes, generateVariables, getRgbChannels, mergeColors };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map
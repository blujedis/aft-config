'use strict';

var defaultTailwindColors = require('tailwindcss/colors');
var tinycolor = require('tinycolor2');
var plugin = require('tailwindcss/plugin');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var defaultTailwindColors__default = /*#__PURE__*/_interopDefault(defaultTailwindColors);
var tinycolor__default = /*#__PURE__*/_interopDefault(tinycolor);
var plugin__default = /*#__PURE__*/_interopDefault(plugin);

// src/defaults.ts
var defaultColors = {
  /**
   * @see https://www.tailwindshades.com/#color=220%2C15.294117647058819%2C50&step-up=8&step-down=11&hue-shift=0&name=slate-gray&base-stop=5&v=1&overrides=eyIxIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjk0LCJoZXgiOiJFREVGRjIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIyIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjg5LCJoZXgiOiJERkUyRTciLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIzIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjgxLCJoZXgiOiJDN0NDRDYiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI0Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjY4LCJoZXgiOiJBMUE5QkEiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI1Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjU3LCJoZXgiOiI4MThDQTIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI2Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjQ4LCJoZXgiOiI2ODc0OEQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI3Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjM2LCJoZXgiOiI0RTU3NkEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI4Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjIyLCJoZXgiOiIzMDM1NDEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI5Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjEwLCJoZXgiOiIxNjE4MUQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCIwLjUiOnsiaHVlIjotMSwic2F0dXJhdGlvbiI6LTEsImxpZ2h0bmVzcyI6OTgsImhleCI6IkY5RkFGQiIsInRleHRDb2xvciI6ImJsYWNrIn0sIjkuNSI6eyJodWUiOi0xLCJzYXR1cmF0aW9uIjotMSwibGlnaHRuZXNzIjo1LCJoZXgiOiIwQjBDMEYiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9fQ%3D%3D
   */
  "frame": {
    ...defaultTailwindColors__default.default.gray,
    // 50: '#F9FAFB',
    // 100: '#F3F4F7',
    // 200: '#E4E7EC',
    // 300: '#D1D7E0',
    // 400: '#9BA7BB',
    // 500: '#6D798D',
    // 600: '#465367',
    // 700: '#363F4F',
    // 800: '#252C37',
    900: "#121b2b",
    950: "#080D13"
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
    "--bg-dark": defaultColors.frame["900"],
    //'#242c38', // defaultColors.frame['900'], 
    "--bg-white": "#ffffff",
    "--body-text-light": defaultColors.frame["700"],
    "--body-text-dark": defaultColors.frame["100"],
    "--body-bg-light": "#ffffff",
    "--body-bg-dark": defaultColors.frame["900"]
    // '#242c38', // defaultColors.frame['900']
  },
  colors: { ...defaultColors }
};
function isHexRgbHslColor(str) {
  return ["#", "rgb", "rgba", "hsl", "hsla"].some((s) => str.startsWith(s));
}
function getRgbChannels(color) {
  const c = tinycolor__default.default(color).toRgb();
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
var aft = plugin__default.default.withOptions(
  function createAft(config) {
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
  (arg1) => {
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

Object.defineProperty(exports, "defaultTailwindColors", {
  enumerable: true,
  get: function () { return defaultTailwindColors__default.default; }
});
exports.aft = aft;
exports.defaultColors = defaultColors;
exports.defaultTheme = defaultTheme;
exports.ensureDefault = ensureDefault;
exports.generateRootVars = generateRootVars;
exports.generateTailwindVars = generateTailwindVars;
exports.generateThemes = generateThemes;
exports.generateVariables = generateVariables;
exports.getRgbChannels = getRgbChannels;
exports.mergeColors = mergeColors;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
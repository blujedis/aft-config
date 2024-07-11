'use strict';

var colors = require('tailwindcss/colors');
var tinycolor = require('tinycolor2');
var plugin = require('tailwindcss/plugin');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var colors__default = /*#__PURE__*/_interopDefault(colors);
var tinycolor__default = /*#__PURE__*/_interopDefault(tinycolor);
var plugin__default = /*#__PURE__*/_interopDefault(plugin);

// src/defaults.ts
var defaultColors = {
  // frame: defaultTailwindColors.neutral,
  "frame": {
    50: "#F9FAFB",
    100: "#EEF0F2",
    200: "#D7DBE0",
    300: "#C0C7CE",
    400: "#95A1AC",
    500: "#677584",
    600: "#434D56",
    700: "#2F363C",
    800: "#24292E",
    900: "#161A1D",
    950: "#121417"
  },
  // frame: {
  // 	50: '#F9FAFB',
  // 	100: '#F3F4F6',
  // 	200: '#EDEFF2',
  // 	300: '#D8DDE3',
  // 	400: '#A9B2C1',
  // 	500: '#6E7D96',
  // 	600: '#536074',
  // 	700: '#404A59',
  // 	800: '#292F38',
  // 	900: '#15191E',
  // 	950: '#0F1115'
  // },
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
    "--body-text-light": defaultColors.frame["700"],
    "--body-text-dark": defaultColors.frame["100"],
    "--body-bg-light": "#ffffff",
    "--body-bg-dark": defaultColors.frame["800"]
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
function generateThemes(config) {
  return Object.entries(config).reduce((result, [key, theme]) => {
    theme = {
      name: key,
      preprocess: "both",
      ...theme
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
  (config) => {
    return (opts) => {
      const { addBase, addUtilities, matchUtilities, addComponents, theme } = opts;
      addBase({
        ...generateThemes(config),
        html: {
          height: "100%"
        },
        body: {
          height: "100%",
          "background-color": "rgb(var(--body-bg-light))",
          color: "rgb(var(--body-text-light))"
        },
        ".dark body": {
          "background-color": "rgb(var(--body-bg-dark))",
          color: "rgb(var(--body-text-dark))"
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
        ".text-md": {
          fontSize: "1.0rem",
          lineHeight: "1.5"
        },
        // color of text in darkmode.
        "body-text-dark": {
          color: `rgb(var(--body-text-dark))`
        },
        // color of text in lightmode
        "body-text-light": {
          color: `rgb(var(--body-text-light))`
        },
        // dark color text = body-text-light
        ".text-dark": {
          color: `rgb(var(--body-text-light))`
        },
        // light color text = body-text-dark
        ".text-light": {
          color: `rgb(var(--body-text-dark))`
        },
        ".body-dark": {
          "background-color": `rgb(var(--body-bg-dark))`
        },
        ".body-light": {
          "background-color": `rgb(var(--body-bg-light))`
        },
        ".small-caps": {
          "font-variant": "all-small-caps"
        },
        ".fade-in-down": "fade-in-down 0.3s ease-out"
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
          colors: generateTailwindVars(defaultColors)
        }
      }
    };
  }
);

Object.defineProperty(exports, "defaultTailwindColors", {
  enumerable: true,
  get: function () { return colors__default.default; }
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
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
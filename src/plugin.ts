import tinycolor, { ColorInput } from 'tinycolor2';
import plugin from 'tailwindcss/plugin';
import { defaultColors } from './defaults';
import svgToDataUri from 'mini-svg-data-uri';
import colors from 'tailwindcss/colors';

export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ThemeColorObject = Record<ThemeShade, string> & { DEFAULT?: string };
export type ThemeColors = Record<string, ThemeColorObject>;

export interface Theme {
  name?: string;
  preprocess?: 'colors' | 'variables' | 'both' | 'none';
  colors: ThemeColors;
  variables: Record<string, string>;
}

function isHexRgbHslColor(str: string) {
  return ['#', 'rgb', 'rgba', 'hsl', 'hsla'].some(s => str.startsWith(s));
}

export function getRgbChannels(color: ColorInput) {
  const c = tinycolor(color).toRgb();
  return `${c.r} ${c.g} ${c.b}`;
}

export function ensureDefault(colors: Record<string, any>) {
  for (const [, map] of Object.entries(colors)) {
    if (typeof map !== 'object' || map === null || Array.isArray(map)) continue;
    map['DEFAULT'] = map['DEFAULT'] || map['500'];
  }
  return colors;
}

export function generateTailwindVars<T extends ThemeColors>(colors: T, parent = '') {
  return Object.entries(ensureDefault(colors)).reduce((result, [key, value]) => {
    const colorName =
      parent === '' ? `${key}` : key === 'DEFAULT' ? `${parent}` : `${parent}-${key}`;
    const formattedValue = `rgb(var(--color-${colorName})/<alpha-value>)`;
    const currentResult =
      (typeof value === 'string'
        ? { [key]: formattedValue }
        : { [key]: generateTailwindVars(value, key) }) as Record<string, unknown>
    return { ...result, ...currentResult };
  }, {}) as Record<keyof T, ThemeColorObject>;
}

export function generateVariables(variables: Record<string, string>) {
  return Object.entries(variables).reduce((result, [key, value]) => {
    // converts hex, rgb, hsl to rgb for use with tailwind.
    if (isHexRgbHslColor(value))
      value = getRgbChannels(value);
    result[key] = value;
    return result;
  }, {} as Record<string, string>);
}

export function generateRootVars<T extends ThemeColors>(colors: T, name = '') {
  return Object.keys(ensureDefault(colors)).reduce((result, shadeOrObj) => {
    const value = colors[shadeOrObj as keyof typeof colors];
    const key = shadeOrObj === 'DEFAULT' ? `--color-${name}` : `--color-${name}-${shadeOrObj}`;
    const currentResult =
      (typeof value === 'string'
        ? { [key]: getRgbChannels(value) }
        : generateRootVars(value as any, shadeOrObj)) as ThemeColors;
    return { ...result, ...currentResult };
  }, {}) as Record<keyof T, ThemeColorObject>;
}

export function generateThemes(config: Record<string, Theme>) {
  return Object.entries(config).reduce((result, [key, theme]) => {
    theme = {
      name: key,
      preprocess: 'both',
      ...theme
    };
    const variables = ['both', 'variables'].includes(theme.preprocess || '')
      ? generateVariables(theme.variables)
      : theme.variables;
    const colors = ['both', 'colors'].includes(theme.preprocess || '')
      ? generateRootVars(theme.colors)
      : theme.colors;
    result[`:root [data-theme='${theme.name}']`] = {
      ...variables,
      ...colors
    }
    return result;
  }, {} as Record<string, Record<string, any>>);
}

export const aft =
  plugin.withOptions<Record<string, Theme>>((config) => {
    return ({ addBase, addUtilities, matchUtilities, addComponents, theme }) => {



      addBase({

        ...generateThemes(config),

        html: {
          height: '100%'
        },

        body: {
          height: '100%',
          'background-color': 'rgb(var(--body-bg-light))',
          color: 'rgb(var(--body-text-light))'
        },

        '.dark body': {
          'background-color': 'rgb(var(--body-bg-dark))',
          color: 'rgb(var(--body-text-dark))'
        },

        '@keyframes fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }

      });

      // addComponents({
      //   '.form-select': {
      //     'background-image': `url("${svgToDataUri(
      //       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${theme('colors.frame.400', colors.slate['400'])}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
      //     )}")`
      //   }
      // })

      addUtilities({
        '.text-md': {
          fontSize: '1.0rem',
          lineHeight: '1.5'
        },
        '.text-light': {
          color: `rgb(var(--body-text-dark))/<alpha-value>`
        },
        '.text-dark': {
          color: `rgb(var(--body-text-light))/<alpha-value>`
        },
        '.small-caps': {
          'font-variant': 'all-small-caps'
        },
        '.fade-in-down': 'fade-in-down 0.3s ease-out'
      });

      matchUtilities({
        outline: (value) => ({
          outlineWidth: value
        }),
        ring: (value) => ({
          ringWidth: value
        })
      }, {
        values: { ...theme('outlineWidth'), 3: '3px' } as any
      });

      matchUtilities({
        brightness: (value) => ({
          filter: `brightness(${value})`
        })
      }, {
        values: { ...theme('brightness'), 80: '.80', 85: '.85', 115: '1.15', 135: '1.35' }
      });

      matchUtilities({
        animate: (value) => ({
          animation: value
        })
      }, {
        values: { ...theme('animation'), 'fade-in-down': 'fade-in-down 0.3s ease-out' } as any
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
      }
    }
  );

export default aft;

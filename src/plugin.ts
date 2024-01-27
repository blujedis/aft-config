import tinycolor, { ColorInput } from 'tinycolor2';
import { PluginAPI } from 'tailwindcss/types/config';

export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ThemeColorObject = Record<ThemeShade, string> & { DEFAULT?: string };
export type ThemeColors = Record<string, ThemeColorObject>;

/**
 * @param {import('tinycolor2').ColorInput} color
 */
function getRgbChannels(color: ColorInput) {
  const c = tinycolor(color).toRgb();
  return `${c.r} ${c.g} ${c.b}`;
}

function ensureDefault(colors: Record<string, any>) {
  for (const [, map] of Object.entries(colors)) {
    if (typeof map !== 'object' || map === null || Array.isArray(map)) continue;
    map['DEFAULT'] = map['DEFAULT'] || map['500'];
  }
  return colors;
}

export function generateRootVars<T extends ThemeColors>(colors: T, name = '') {
  return Object.keys(ensureDefault(colors)).reduce((result, shadeOrObj) => {
    const value = colors[shadeOrObj as keyof typeof colors];
    const key = shadeOrObj === 'DEFAULT' ? `--color${name}` : `--color${name}-${shadeOrObj}`;
    const currentResult =
      (typeof value === 'string'
        ? { [key]: getRgbChannels(value) }
        : generateRootVars(value as any, `-${shadeOrObj}`)) as ThemeColors;
    return { ...result, ...currentResult };
  }, {}) as Record<keyof T, ThemeColorObject>;
}

export function generateTailwindVars<T extends ThemeColors>(colors: T, parent = '') {
  return Object.entries(ensureDefault(colors)).reduce((result, [key, value]) => {
    const colorName =
      parent === '' ? `${key}` : key === 'DEFAULT' ? `${parent}` : `${parent}-${key}`;
    const formattedValue = `rgb(var(--color-${colorName})/<alpha-value>)`;
    const currentResult =
      (typeof value === 'string'
        ? { [key]: formattedValue }
        : { [key]: generateTailwindVars(value as any, key) }) as Record<string, any>
    return { ...result, ...currentResult };
  }, {}) as Record<keyof T, ThemeColorObject>;
}

export const plugin =
  <T extends ThemeColors>(colors: T) =>
    ({ addBase, addUtilities, matchUtilities, theme }: PluginAPI) => {

      addBase({
        ':root': {
          ...generateRootVars(colors)
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

      addUtilities({
        '.text-md': {
          fontSize: '1.0rem',
          lineHeight: '1.5'
        }
      });

      addUtilities({
        '.fade-in-down': 'fade-in-down 0.3s ease-out'
      })

      matchUtilities({
        outline: (value) => ({
          outlineWidth: value
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
      })

      matchUtilities({
        animate: (value) => ({
          animation: value
        })
      }, {
        values: { ...theme('animation'), 'fade-in-down': 'fade-in-down 0.3s ease-out' } as any
      })

    };

export default plugin;

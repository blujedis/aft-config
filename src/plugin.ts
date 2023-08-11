import tinycolor, { ColorInput } from 'tinycolor2';
import { PluginAPI } from 'tailwindcss/types/config';

export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ThemeColorObject = Record<ThemeShade, string> & { DEFAULT?: string };
export type ThemeObject = Record<string, ThemeColorObject>;

/**
 * @param {import('tinycolor2').ColorInput} color
 */
function getRgbChannels(color: ColorInput) {
  const c = tinycolor(color).toRgb();
  return `${c.r} ${c.g} ${c.b}`;
}

export function generateRootVars<T extends ThemeObject>(colors: T, name = '') {
  return Object.keys(colors).reduce((result, shadeOrObj) => {
    const value = colors[shadeOrObj as keyof typeof colors];
    const key = shadeOrObj === 'DEFAULT' ? `--color${name}` : `--color${name}-${shadeOrObj}`;
    const currentResult =
      (typeof value === 'string'
        ? { [key]: getRgbChannels(value) }
        : generateRootVars(value as any, `-${shadeOrObj}`)) as ThemeObject;
    return { ...result, ...currentResult };
  }, {}) as Record<keyof T, ThemeColorObject>;
}

export function generateTailwindVars<T extends ThemeObject>(colors: T, parent = '') {
  return Object.entries(colors).reduce((result, [key, value]) => {
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
  <T extends ThemeObject>(colors: T) =>
    ({ addBase, addUtilities }: PluginAPI) => {
      addBase({
        ':root': {
          ...generateRootVars(colors)
        }
      });
      addUtilities({
        '.text-md': {
          fontSize: '1.0rem',
          lineHeight: '1.5'
        }
      });
    };

export default plugin;

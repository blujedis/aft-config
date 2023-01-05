// Color generation utility based from
// https://github.com/mbitson/mcg/blob/c484a34a4f670d75b7a0824bbdc9945703e3a4f8/scripts/controllers/ColorGeneratorCtrl.js

import tinycolor from 'tinycolor2';
import { shades } from './palette';
import type { Shade, PaletteInit } from './types';

type RGB = { b: number; g: number; r: number };

const excluded = ['white', 'black', 'transparent', 'inherit', 'current'] as const;

function multiply(rgb1: RGB, rgb2: RGB) {
	rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
	rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
	rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
	return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
}

const objectify = (value: tinycolor.ColorInput, name: string) => ({
	[name]: tinycolor(value).toHexString()
});

const white = tinycolor('#ffffff');

function buildPaletteByVarColor(varColor: string) {
	return {
		'50': `var(${varColor}-50)`,
		'100': `var(${varColor}-100)`,
		'200': `var(${varColor}-200)`,
		'300': `var(${varColor}-300)`,
		'400': `var(${varColor}-400)`,
		'500': `var(${varColor}-500)`,
		'600': `var(${varColor}-600)`,
		'700': `var(${varColor}-700)`,
		'800': `var(${varColor}-800)`,
		'900': `var(${varColor}-900)`
	};
}

function buildPalette(hex: string) {

	const varColorMatch = hex.match(/var\((?<color>[^)]+)/) as RegExpMatchArray;

	if (varColorMatch && varColorMatch?.groups) {
		if (!varColorMatch.groups['color'])
			throw new Error(`Invalid color match group.`);
		return {
			...buildPaletteByVarColor(varColorMatch.groups['color']),
			DEFAULT: hex
		};
	}

	const baseDark = multiply(tinycolor(hex).toRgb(), tinycolor(hex).toRgb());
	const lightest = objectify(tinycolor.mix(white, hex, 30), '100');
	const midpoint = objectify(tinycolor.mix(white, hex, 100), '500');
	const midpointVal = midpoint['500'];

	return {
		...objectify(tinycolor.mix(white, hex, 12), '50'),
		...lightest,
		...objectify(tinycolor.mix(white, hex, 50), '200'),
		...objectify(tinycolor.mix(white, hex, 70), '300'),
		...objectify(tinycolor.mix(white, hex, 85), '400'),
		...midpoint,
		...objectify(tinycolor.mix(baseDark, hex, 87), '600'),
		...objectify(tinycolor.mix(baseDark, hex, 70), '700'),
		...objectify(tinycolor.mix(baseDark, hex, 54), '800'),
		...objectify(tinycolor.mix(baseDark, hex, 25), '900'),
		DEFAULT: midpointVal
	};
}

/**
 * Generates palette using string or passes provided color palette shades.
 *
 * @example
 * generateColors({
 *    primary: '#057BFF',  // shades will be generated
 *    danger: {            // shades will be passed as is.
 *    	50: '#fff1f2',
 *	    100: '#ffe4e6',
 *	    200: '#fecdd3',
 *     .....
 *    }
 * });
 *
 */
export function genPalette<T extends PaletteInit>(colors = {} as T) {
	return Object.entries(colors).reduce((a, [key, val]) => {
		if (excluded.includes(key as typeof excluded[number]))
			return { ...a, [key]: val };
		const newVal =
			typeof val === 'object' && val !== null
				? { ...val }
				: buildPalette(val as any);
		return { ...a, [key]: newVal };
	}, {}) as Record<keyof T, Record<Shade | 'DEFAULT', string>>;
}

/**
 * Generates CSS variables from key names for Tailwind theme.
 *
 * @param keys the palette key names to generate vars.
 * @param prefix optiona prefix for building vars.
 */
export function genThemeVars<K extends string>(
	keys: K[],
	prefix?: string
): Record<K, Record<Shade | 'DEFAULT', string>>;

/**
 * Generates CSS variables from object for Tailwind theme.
 *
 * @param palette the palette used to generate theme css variables.
 * @param prefix optiona prefix for building vars.
 */
export function genThemeVars<T extends PaletteInit>(
	palette: T,
	prefix?: string
): Record<keyof T, Record<Shade | 'DEFAULT', string>>;

export function genThemeVars(
	values: Record<string, any> | string[],
	prefix = 'color'
) {
	// Normalize prefix in case user passes --color etc.
	prefix = prefix.replace(/^--/, '');
	const cssvars = {} as any;
	const keys =
		typeof values == 'string' ? values : (Object.keys(values) as string[]);
	keys
		.filter((v) => typeof v !== 'undefined')
		.forEach((c) => {
			cssvars[c] = {} as any;
			cssvars[c].DEFAULT = `var(--${prefix}-${c as string})`;
			shades.forEach((s) => {
				cssvars[c][s] = `var(--${prefix}-${c as string}-${s})`;
			});
		});
	return cssvars as Record<string, Record<string, string>>;
}

/**
 * Generates and flattens variables for :root.
 *
 * @param palette the palette to generate vars for.
 * @param prefix the prefix for example --color.
 */
export function genRootVars<T extends PaletteInit>(palette: T, prefix = 'color') {
	prefix = prefix.replace(/^--/, '');
	return Object.entries(palette).reduce((a, [color, conf]) => {
		if (typeof conf === 'string') a[`--${prefix}-${color}`] = conf;
		else
			Object.entries(conf).forEach(([shade, value]) => {
				if (shade.toLowerCase() === 'default') a[`--${prefix}-${color}`] = value;
				else a[`--${prefix}-${color}-${shade}`] = value;
			});
		return a;
	}, {} as Record<string, string>);
}

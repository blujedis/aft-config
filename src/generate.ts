// Color generation utility based from
// https://github.com/mbitson/mcg/blob/c484a34a4f670d75b7a0824bbdc9945703e3a4f8/scripts/controllers/ColorGeneratorCtrl.js

import tinycolor from 'tinycolor2';
import { shades } from './palette';
import type { Shade, PaletteInit } from './types';

type RGB = { b: number; g: number; r: number };

const excluded = ['white', 'black', 'transparent', 'inherit', 'current'] as const;

/**
 * Generates simple string of RGB channels without alpha which Tailwind will inject.
 *
 * @param color the color to get RGB channels for.
 */
export function getRgbChannels(color: tinycolor.ColorInput) {
	const c = tinycolor(color).toRgb();
	return `${c.r} ${c.g} ${c.b}`;
}

function multiply(rgb1: RGB, rgb2: RGB) {
	rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
	rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
	rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
	return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
}

/**
 * Creates object of color using name/shade as key name.
 *
 * @param value the value to create color value for.
 * @param name the name of the color key/shade.
 * @param rgb when true rgb channels are return instead of hex.
 */
const objectify = (value: tinycolor.ColorInput, name: string, rgb = false) => ({
	[name]: rgb ? getRgbChannels(value) : tinycolor(value).toHexString()
});

const white = tinycolor('#ffffff');

/**
 * Builds color palette of color shades.
 *
 * @param value the color value to build palette for.
 * @param rgb when true create object using rgb channels instead of hex.
 */
function buildPalette(value: string, rgb = false) {
	const baseDark = multiply(tinycolor(value).toRgb(), tinycolor(value).toRgb());
	// Make lightest/midpoint here so we know below
	// where both points on in object. Also need to grab
	// midpoint here for the default.
	const lightest = objectify(tinycolor.mix(white, value, 30), '100', rgb);
	const midpoint = objectify(tinycolor.mix(white, value, 100), '500', rgb);
	const midpointVal = midpoint['500'];

	return {
		...objectify(tinycolor.mix(white, value, 12), '50', rgb),
		...lightest,
		...objectify(tinycolor.mix(white, value, 50), '200', rgb),
		...objectify(tinycolor.mix(white, value, 70), '300', rgb),
		...objectify(tinycolor.mix(white, value, 85), '400', rgb),
		...midpoint,
		...objectify(tinycolor.mix(baseDark, value, 87), '600', rgb),
		...objectify(tinycolor.mix(baseDark, value, 70), '700', rgb),
		...objectify(tinycolor.mix(baseDark, value, 54), '800', rgb),
		...objectify(tinycolor.mix(baseDark, value, 25), '900', rgb),
		...objectify(tinycolor.mix(baseDark, value, 10), '950', rgb),
		DEFAULT: midpointVal
	};
}

/**
 * Generates palette using string or passes provided color palette shades.
 *
 * @param colors the palette of colors can be hex, rgb, we'll normalize.
 * @param rgb when true output palette will have rgb channels as values instead of hex.
 *
 * @example
 * genPalette({
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
export function genPalette<T extends PaletteInit>(colors = {} as T, rgb = false) {
	return Object.entries(colors).reduce((a, [key, val]) => {
		if (excluded.includes(key as typeof excluded[number]))
			return { ...a, [key]: val };
		const newVal =
			typeof val === 'object' && val !== null
				? { ...val } // assumes already object of shades prolly should be a check for all shades here.
				: buildPalette(val as any, rgb);
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
	prefix?: string,
	rgb?: boolean
): Record<K, Record<Shade | 'DEFAULT', string>>;

/**
 * Generates CSS variables from object for Tailwind theme.
 *
 * @param palette the palette used to generate theme css variables.
 * @param prefix optiona prefix for building vars.
 */
export function genThemeVars<T extends PaletteInit>(
	palette: T,
	prefix?: string,
	rgb?: boolean
): Record<keyof T, Record<Shade | 'DEFAULT', string>>;

export function genThemeVars(
	values: Record<string, any> | string[],
	prefix = 'color',
	rgb = false
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
			if (rgb) {
				cssvars[c].DEFAULT = `rgb(var(--${prefix}-${c as string})/<alpha-value>)`;
				shades.forEach((s) => {
					cssvars[c][s] = `rgb(var(--${prefix}-${c as string}-${s})/<alpha-value>)`;
				});
			} else {
				cssvars[c].DEFAULT = `var(--${prefix}-${c as string})`;
				shades.forEach((s) => {
					cssvars[c][s] = `var(--${prefix}-${c as string}-${s})`;
				});
			}
		});
	return cssvars as Record<string, Record<string, string>>;
}

/**
 * Generates and flattens variables for :root.
 *
 * @param palette the palette to generate vars for.
 * @param asChannels when true root values are channels instead of hex string.
 * @param prefix the prefix for example --color.
 */
export function genRootVars<T extends PaletteInit>(
	palette: T,
	asChannels = true,
	prefix = 'color'
) {
	prefix = prefix.replace(/^--/, '');
	return Object.entries(palette).reduce((a, [color, conf]) => {
		if (typeof conf === 'string') {
			a[`--${prefix}-${color}`] = asChannels ? getRgbChannels(conf) : conf;
		} else
			Object.entries(conf).forEach(([shade, value]) => {
				if (shade.toLowerCase() === 'default') {
					a[`--${prefix}-${color}`] = asChannels ? getRgbChannels(value) : value;
				} else {
					a[`--${prefix}-${color}-${shade}`] = asChannels
						? getRgbChannels(value)
						: value;
				}
			});
		return a;
	}, {} as Record<string, string>);
}

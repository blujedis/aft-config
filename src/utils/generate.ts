import type { ThemeColor, ThemeColors, ThemeDefaultColors } from '../types';

export const defaultColors = {
	default: {
		DEFAULT: '#B2B9C2',
		'50': '#F1F2F4',
		'100': '#EEEFF1',
		'200': '#E3E5E8',
		'300': '#D7DBDF',
		'400': '#C9CED4',
		'500': '#B2B9C2',
		'600': '#939DA9',
		'700': '#738090',
		'800': '#5A6472',
		'900': '#414952'
	},
	primary: {
		DEFAULT: '#00B1F5',
		'50': '#E5F8FF',
		'100': '#D6F4FF',
		'200': '#B8EBFF',
		'300': '#8ADEFF',
		'400': '#52CFFF',
		'500': '#00B1F5',
		'600': '#0088BD',
		'700': '#006085',
		'800': '#00374D',
		'900': '#000F15'
	},
	accent: {
		DEFAULT: '#E96A2A',
		'50': '#FEF5F1',
		'100': '#FCECE3',
		'200': '#F9D5C3',
		'300': '#F5BB9E',
		'400': '#F1A179',
		'500': '#EC7E46',
		'600': '#E96726',
		'700': '#9D3F10',
		'800': '#742F0C',
		'900': '#491E09'
	},
	dark: {
		DEFAULT: '#484C50',
		'50': '#F2F2F3',
		'100': '#DFE0E2',
		'200': '#B7BABE',
		'300': '#91969C',
		'400': '#72787E',
		'500': '#484C50',
		'600': '#383B3E',
		'700': '#292B2E',
		'800': '#1B1C1E',
		'900': '#111213'
	},
	danger: {
		DEFAULT: '#f43f5e',
		50: '#fff1f2',
		100: '#ffe4e6',
		200: '#fecdd3',
		300: '#fda4af',
		400: '#fb7185',
		500: '#f43f5e',
		600: '#e11d48',
		700: '#be123c',
		800: '#9f1239',
		900: '#881337'
	},
	warn: {
		DEFAULT: '#f59e0b',
		50: '#fffbeb',
		100: '#fef3c7',
		200: '#fde68a',
		300: '#fcd34d',
		400: '#fbbf24',
		500: '#f59e0b',
		600: '#d97706',
		700: '#b45309',
		800: '#92400e',
		900: '#78350f'
	},
	success: {
		DEFAULT: '#10b981',
		50: '#ecfdf5',
		100: '#d1fae5',
		200: '#a7f3d0',
		300: '#6ee7b7',
		400: '#34d399',
		500: '#10b981',
		600: '#059669',
		700: '#047857',
		800: '#065f46',
		900: '#064e3b'
	},
	info: {
		DEFAULT: '#0ea5e9',
		50: '#f0f9ff',
		100: '#e0f2fe',
		200: '#bae6fd',
		300: '#7dd3fc',
		400: '#38bdf8',
		500: '#0ea5e9',
		600: '#0284c7',
		700: '#0369a1',
		800: '#075985',
		900: '#0c4a6e'
	}
};

export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

/**
 * Generates CSS variables used for tailwind theme.
 *
 * @param colors the colors used to generate theme css variables.
 */
export function genThemeVars<T extends ThemeDefaultColors>(
	colors = defaultColors as T
) {
	const cssvars = {} as ThemeColors;
	const keys = Object.keys(colors) as ThemeColor[];
	keys.forEach((c) => {
		cssvars[c] = {} as any;
		cssvars[c].DEFAULT = `var(--color-${c as string})`;
		shades.forEach((s) => {
			cssvars[c][s] = `var(--color-${c as string}-${s})`;
		});
	});
	return cssvars;
}

/**
 * Generates style tag containing dynamically generated colors.
 *
 * @param store the theme configuration from storage.
 */
export function genThemeStyles(store: ThemeColors) {
	let html = '';
	if (typeof window === 'undefined') return html;
	const colors = Object.entries(store).reduce((a, [key, val]) => {
		const template = `--color-${key}`;
		Object.entries(val).forEach(([k, v]) => {
			if (k === 'DEFAULT') a.push(template + `: ${v}`);
			else a.push(template + `-${k}: ${v}`);
		});
		return a;
	}, [] as string[]);
	html = `<style>:root { ${colors.join(';')}} }</style>`;
	return html;
}

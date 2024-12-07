import tinycolor, { ColorInput } from 'tinycolor2';
import plugin from 'tailwindcss/plugin';
import { defaultTheme } from './defaults';

export type ThemeShade =
	| 50
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900
	| 950;
export type ThemeColorObject = Record<ThemeShade, string> & { DEFAULT?: string };
export type ThemeColors = Record<string, ThemeColorObject>;

export interface Theme {
	name?: string;
	preprocess?: 'colors' | 'variables' | 'both' | 'none';
	colors: ThemeColors;
	variables: Record<string, string>;
}

function isHexRgbHslColor(str: string) {
	return ['#', 'rgb', 'rgba', 'hsl', 'hsla'].some((s) => str.startsWith(s));
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
			parent === ''
				? `${key}`
				: key === 'DEFAULT'
					? `${parent}`
					: `${parent}-${key}`;
		const formattedValue = `rgb(var(--color-${colorName})/<alpha-value>)`;
		const currentResult = (
			typeof value === 'string'
				? { [key]: formattedValue }
				: { [key]: generateTailwindVars(value, key) }
		) as Record<string, unknown>;
		return { ...result, ...currentResult };
	}, {}) as Record<keyof T, ThemeColorObject>;
}

export function generateVariables(variables: Record<string, string>) {
	return Object.entries(variables).reduce(
		(result, [key, value]) => {
			// converts hex, rgb, hsl to rgb for use with tailwind.
			if (isHexRgbHslColor(value)) value = getRgbChannels(value);
			result[key] = value;
			return result;
		},
		{} as Record<string, string>
	);
}

export function generateRootVars<T extends ThemeColors>(colors: T, name = '') {
	return Object.keys(ensureDefault(colors)).reduce((result, shadeOrObj) => {
		const value = colors[shadeOrObj as keyof typeof colors];
		const key =
			shadeOrObj === 'DEFAULT' ? `--color-${name}` : `--color-${name}-${shadeOrObj}`;
		const currentResult = (
			typeof value === 'string'
				? { [key]: getRgbChannels(value) }
				: generateRootVars(value as any, shadeOrObj)
		) as ThemeColors;
		return { ...result, ...currentResult };
	}, {}) as Record<keyof T, ThemeColorObject>;
}

export function mergeColors(
	colors: Partial<Theme['colors']>,
	defaults: Theme['colors']
) {
	const clone = JSON.parse(JSON.stringify(defaults));
	for (const [k, v] of Object.entries(colors)) {
		if (typeof clone[k] === 'undefined') continue;
		clone[k] = { ...clone[k], ...v };
	}
	return clone;
}

export function generateThemes(config: Record<string, Theme>) {
	return Object.entries(config).reduce(
		(result, [key, theme]) => {
			const { colors: c, variables: v, ...rest } = theme;
			theme = {
				name: key,
				preprocess: 'both',
				colors: mergeColors(c, defaultTheme.colors), // not deep merge only merges top level color key.
				variables: { ...defaultTheme.variables, ...v },
				...rest
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
			};
			return result;
		},
		{} as Record<string, Record<string, any>>
	);
}

export const aft = plugin.withOptions<Record<string, Theme>>(
	function createAft(config) {
		return (opts) => {
			const { addBase, addUtilities, matchUtilities, addComponents, theme } = opts;

			addBase({
				...generateThemes(config),

				html: {
					height: '100%'
				},

				body: {
					height: '100%',
					// 'background-color': 'rgb(var(--body-bg-light))',
					// color: 'rgb(var(--body-text-light))'
					'background-color': 'rgb(var(--bg-light))',
					color: 'rgb(var(--text-dark))'
				},

				'.dark body': {
					// 'background-color': 'rgb(var(--body-bg-dark))',
					// color: 'rgb(var(--body-text-dark))'
					'background-color': 'rgb(var(--bg-dark))',
					color: 'rgb(var(--text-light))'
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
				// color of text in darkmode.
				'.body-text-dark': {
					// color: `rgb(var(--body-text-dark))`
					color: `rgb(var(--text-light))`
				},
				// color of text in lightmode
				'.body-text-light': {
					// color: `rgb(var(--body-text-light))`
					color: `rgb(var(--text-dark))`
				},
				'.body-dark': {
					//'background-color': `rgb(var(--body-bg-dark))`
					backgroundColor: `rgb(var(--bg-dark))`
				},
				'.body-light': {
					//'background-color': `rgb(var(--body-bg-light))`
					backgroundColor: `rgb(var(--bg-light))`
				},
				// dark color text = body-text-light
				'.text-dark': {
					// color: `rgb(var(--body-text-light))`
					color: `rgb(var(--text-dark))`
				},
				// light color text = body-text-dark
				'.text-light': {
					// color: `rgb(var(--body-text-dark))`
					color: `rgb(var(--text-light))`
				},
				'.text-md': {
					fontSize: '1.0rem',
					lineHeight: '1.5'
				},
				'.small-caps': {
					fontVariant: 'all-small-caps'
				},

				'.elevate-none': {
					boxShadow: 'none;'
				},
				'.elevate-xs': {
					// .3, .15
					boxShadow:
						'rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.05) 0px 1px 2px;'
				},
				'.elevate-sm': {
					// .3, .15
					boxShadow:
						'rgba(60, 64, 67, 0.15) 0px 2px 3px, rgba(60, 64, 67, 0.11) 0px 2px 3px;'
				},
				'.elevate-md': {
					// .16, .23
					boxShadow:
						'rgba(0, 0, 0, 0.09) 0px 3px 6px, rgba(0, 0, 0, 0.14) 0px 3px 6px;'
				},
				'.elevate-lg': {
					// .19, .23
					boxShadow:
						'rgba(0, 0, 0, 0.11) 0px 5px 8px, rgba(0, 0, 0, 0.16) 0px 4px 6px;'
				},
				'.elevate-xl': {
					// .25, .22
					boxShadow:
						'rgba(0, 0, 0, 0.13) 0px 7px 9px, rgba(0, 0, 0, 0.17) 0px 7px 9px;'
				},
				'.elevate-xl2': {
					// .3, .22
					boxShadow:
						'rgba(0, 0, 0, 0.14) 0px 9px 11px, rgba(0, 0, 0, 0.15) 0px 9px 11px;'
				},

				'.fade-in-down': 'fade-in-down .3s ease-out'
			});

			matchUtilities(
				{
					brightness: (value) => ({
						filter: `brightness(${value})`
					})
				},
				{
					values: {
						...theme('brightness'),
						80: '.80',
						85: '.85',
						102: '1.02',
						115: '1.15',
						135: '1.35'
					}
				}
			);

			matchUtilities(
				{
					animate: (value) => ({
						animation: value
					})
				},
				{
					values: {
						...theme('animation'),
						'fade-in-down': 'fade-in-down 0.3s ease-out'
					} as any
				}
			);
		};
	},
	(arg1) => {
		// const { lightBlue, warmGray, trueGray, coolGray, blueGray, inherit, current, transparent, black, white, ...clean } = defaultTailwindColors;

		// lightBlue: [Getter],
		// warmGray: [Getter],
		// trueGray: [Getter],
		// coolGray: [Getter],
		// blueGray: [Getter]

		// const colors = generateTailwindVars({
		//   ...defaultTheme.colors
		// });

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

export default aft;

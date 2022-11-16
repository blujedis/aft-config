import tailwindPlugin from 'tailwindcss/plugin';
import { genPalette, genRootVars, genThemeVars } from './generate';
import { defaultPalette } from '../main/palette';
import { Config, PluginAPI } from 'tailwindcss/types/config';
import { join, relative } from 'path';
import { createWriteStream } from 'fs';
import type { PluginOptions, PluginOutput, Palette } from '../types';

const cwd = process.cwd();
const createPlugin = tailwindPlugin.withOptions;

function getPath(
	name: string,
	outdir: string | boolean,
	outext = 'json' as PluginOptions['outext']
) {
	const dir = (outdir === true ? 'src' : !outdir ? '' : outdir) as string;
	if (!dir.length) return '';
	return join(cwd, dir, name + '.' + outext);
}

/**
 * Outputs the color palette to the specified directory relative to project root.
 *
 * @param palette the palette to be output to file.
 * @param outdir the path to output the file to.
 */
function outputPalette(palette: Palette, options: PluginOutput) {
	if (!options.outdir) return;

	const outpath = getPath('palette', options.outdir, options.outext);

	if (!outpath) return;

	let output = JSON.stringify(palette, null, 2);

	if (options.outtype === 'cjs') output = `module.exports = ` + output + ';\n';
	else if (options.outtype !== 'json')
		output = 'const palette = ' + output + ';\n\nexport default palette;';

	const ws = createWriteStream(outpath);
	const buffer = Buffer.from(output, 'utf-8');
	let hasError = false;

	ws.on('error', (err) => {
		console.error(err);
		hasError = true;
	});

	ws.on('close', () => {
		if (hasError)
			process.stdout.write(
				`  \u001b[31m✖\u001b[0m  Forewind: palette output FAILED: "${outpath}"\n`
			);
		else
			process.stdout.write(
				`  \u001b[32;1m➜\u001b[0m  Forewind: palette output: "${relative(
					cwd,
					outpath
				)}"\n`
			);
	});

	ws.write(buffer);
}

// const defaultKeys = Object.keys(defaultPalette);

function createExtendHandler(options = {} as PluginOptions) {
	return (api: PluginAPI) => {
		const { addBase, theme } = api;
		const allColors = theme('colors') as Record<string, any>;
		const { inherit, current, transparent, black, white, ...cleanColors } =
			allColors;
		// Generate root variables ex: :root { --color-primary: '#FF0000' }
		if (options.dynamic)
			addBase({
				':root': genRootVars({ ...cleanColors } as any)
			});
	};
}

/**
 * Handler for generating the Tailwind configuration.
 *
 * @param _options configuration options for the plugin.
 */
function configHandler(options = {} as PluginOptions) {
	options = {
		dynamic: true,
		prefix: 'color',
		outtype: 'json',
		output: true,
		colors: { ...defaultPalette },
		...options
	};

	const { colors, output, dynamic, prefix, outdir, outext, outtype } =
		options as Required<PluginOptions>;

	// Generate color palette for each theme color.
	const themeColors = genPalette(colors);

	let varColors = { ...themeColors };

	// Generate them vars ex: var(--color-primary)
	if (dynamic) varColors = genThemeVars(themeColors, prefix);

	if (output) outputPalette(themeColors, { outdir, outext, outtype });

	const config = {
		darkMode: 'class',
		theme: {
			extend: {
				colors: themeColors,
				padding: {
					'0.25': '0.0625rem',
					'0.75': '0.1875rem',
					'1.25': '0.375rem'
				},
				margin: {
					'0.25': '0.0625rem',
					'0.75': '0.1875rem',
					'1.25': '0.375rem'
				},
				fontSize: {
					md: ['1rem', { lineHeight: '1.5rem' }]
				}
			}
		}
	} as Partial<Config>;

	return config as Config;
}

export const plugin = createPlugin(
	(options = {} as PluginOptions) => createExtendHandler(options),
	configHandler
);

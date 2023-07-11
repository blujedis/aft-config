import tailwindPlugin from 'tailwindcss/plugin';
import formsPlugin from '@tailwindcss/forms';
import { genPalette, genRootVars, genThemeVars } from './generate';
import { defaultPalette } from './palette';
import { Config, PluginAPI } from 'tailwindcss/types/config';
import { join, relative } from 'path';
import { createWriteStream } from 'fs';
import type { PluginOptions, PluginOutput, PaletteLike } from './types';

const cwd = process.cwd();
const createPlugin = tailwindPlugin.withOptions;

let hasOutput = false;
let prevOutput = false;

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
function outputPalette(
	// source: PaletteLike,
	palette: PaletteLike,
	options: PluginOutput
) {
	if (!options.outdir) return;

	const outpath = getPath(
		options.outname || 'palette',
		options.outdir,
		options.outext
	);

	if (!outpath) return;

	let output = JSON.stringify(palette, null, 2);
	// let sourceOutput = JSON.stringify(source, null, 2);

	if (options.outtype === 'cjs') output = `module.exports = ` + output + ';\n';
	else if (options.outtype !== 'json')
		output = 'export const palette = ' + output + ';\n\nexport default palette;';

	// if (options.outtype === 'cjs') output = `exports.source = ` + sourceOutput + ';\n';
	// else if (options.outtype !== 'json')
	// 	sourceOutput = 'export const source = ' + sourceOutput + ';\n';

	// output = options.outsrc ? sourceOutput + '\n' + output : output;

	const ws = createWriteStream(outpath);
	const buffer = Buffer.from(output, 'utf-8');
	let hasError = false;

	ws.on('error', (err) => {
		console.error(err);
		hasError = true;
	});

	ws.on('close', () => {
		if (hasError) {
			process.stdout.write(
				`  \u001b[31m✖\u001b[0m  Sveleton: palette output FAILED: "${outpath}"\n`
			);
		} else {
			process.stdout.write(
				`  \u001b[32;1m➜\u001b[0m  Sveleton: palette output: "${relative(
					cwd,
					outpath
				)}"\n`
			);
		}
	});

	ws.write(buffer);
}

function createExtendHandler(options = {} as PluginOptions) {
	return (api: PluginAPI) => {
		const { addBase, theme } = api;
		const allColors = theme('colors') as Record<string, any>;
		const { inherit, current, transparent, black, white, ...cleanColors } =
			allColors;

		const plugins = api.config('plugins') as any[];

		// loose check to ensure @tailwindcss/forms
		// is present in plugins, not sure if there is
		// a better way but this seems better than overriding
		// user plugins or trying to merge them.
		const hasStrategy = plugins.some((p) => {
			return (
				typeof p === 'object' &&
				typeof p.__options !== 'undefined' &&
				p.__options.strategy === 'class'
			);
		});

		if (!hasStrategy)
			throw new Error(
				`@sveleton/config requires Tailwind plugin @tailwindcss/forms but appears to be missing.\nexample:\nrequire('@tailwindcss/forms')({\n  strategy: "class"\n})\n`
			);

		// When dynamic we need to generate our root css variables
		// using ONLY RGB channels so opacity works
		// example: :root { --color-primary: 21 35 22 }
		if (options.dynamic) {
			// Because set our colors as var(--color-primary) we have to relookup
			// our source colors to generate vars. This is due to how Tailwind's
			// plugin is designed. We do this by accessing "options.colors"
			// which were updated in the previous step. We merge with the source colors
			// with cleaned Tailwind colors temporarily overwriting our var(--color) colors.
			const mergedColors = { ...cleanColors, ...createExtendHandler.source };

			const rootVars = genRootVars(
				{ ...mergedColors } as any,
				options.dynamic,
				options.prefix
			);
			addBase({
				':root': rootVars
			});
		}
	};
}

createExtendHandler.source = {} as Record<string, any>;

// output: false,
// outsrc: false,
// outdir: './src/lib/theme/palettes',
// outname: 'app',
// dynamic: true,
// outtype: 'esm',
// outext: 'ts',

/**
 * Handler for generating the Tailwind configuration.
 *
 * @param _options configuration options for the plugin.
 */
function configHandler(options = {} as PluginOptions) {
	options = {
		dynamic: true,
		prefix: 'color',
		outdir: './src/theme',
		outname: 'palette',
		outext: 'ts',
		outtype: 'esm',
		output: false,
		colors: { ...defaultPalette },
		...options
	};

	const { colors, output, dynamic, prefix, outdir, outext, outtype, outname } =
		options as Required<PluginOptions>;

	// Generate source color palette for each theme color.
	// normalized object of color name and object of each color 50 - 950 shades.
	const generatedColors = genPalette(colors);

	// Update colors we'll need this when generating root vars when dynamic.
	createExtendHandler.source = generatedColors;

	// Theme colors may be clone or generated as dynamic css variables in next step.
	let themeColors = { ...generatedColors };

	// Generate the vars ex: var(--color-primary)
	if (dynamic) themeColors = genThemeVars(themeColors, prefix, true);

	const shouldOutput =
		(output && !hasOutput) || (hasOutput && output && !prevOutput);

	prevOutput = output;

	// If output is enabled and not already output, write the palette to file.
	// Or if has output the palette but output status has changed to true, previous false
	// the write to file.
	if (shouldOutput) {
		outputPalette(
			// colors as PaletteLike,
			{ ...generatedColors },
			{ outdir, outext, outtype, outname }
		);
		hasOutput = true;
	}

	const config = {
		theme: {
			extend: {
				colors: themeColors,
				fontSize: {
					md: ['1rem', { lineHeight: '1.5rem' }]
				}
			}
		}
	} as Partial<Config>;

	return config as Config;
}

export const plugin = (options = {} as PluginOptions) => {
	return createPlugin(
		() => createExtendHandler(options),
		() => configHandler(options)
	);
};

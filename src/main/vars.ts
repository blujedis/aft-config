import type { shades, defaultPalette } from './palette';

export type Shade = typeof shades[number];

export type DefaultKeys = keyof typeof defaultPalette;

export type PaletteColor = Partial<Record<Shade | 'DEFAULT', string>>;

export type PaletteInit = Record<DefaultKeys, string | Partial<PaletteColor>>;

export type Palette<T extends PaletteInit = PaletteInit> = Record<
	keyof T,
	PaletteColor
>;

export type ColorName<T extends PaletteInit = PaletteInit> =
	| keyof T
	| `${Extract<keyof T, string>}-${Shade}`;

const windowLoaded = typeof window !== 'undefined';

const TOKEN = '__forewind_init__';

export function useVars<
	T extends Record<keyof PaletteInit, PaletteColor>,
	P extends string = 'color'
>(initPalette: Palette<T>, prefix = 'color' as P) {
	const api = {
		add,
		remove,
		update
	};

	/**
	 * Checks if token exists and has initialized.
	 */
	function hasInit() {
		if (!windowLoaded) return false;
		return document.documentElement.classList.contains(TOKEN);
	}

	/**
	 * Formats a variable name normalizing with or without prefix.
	 *
	 * @param color the color to format key for.
	 * @param shade the optional shade to use.
	 */
	const formatVar = (color: string, shade?: Shade, withPrefix = false) => {
		const exp = new RegExp(`^--(${prefix}-?)?`);
		const cleaned = prefix.replace(exp, '');
		if (withPrefix)
			return !shade ? `--${cleaned}-${color}` : `--${cleaned}-${color}-${shade}`;
		return !shade ? `${color}` : `${color}-${shade}`;
	};

	/**
	 * Adds color variable to root.
	 * 
	 * @param name the name of the variable to add.
	 * @param value the variables value to be set.
	 */
	function add(name: ColorName<T>, value: string): void;

	/**
	 * Adds a css variable to the root using shade. 
	 * 
	 * @param name the name of the variable to be applied.
	 * @param shade the shade of the variable to be applied.
	 * @param value the variable's value.
	 */
	function add(name: keyof T, shade: Shade, value: string): void;
	function add(
		name: keyof T | ColorName<T>,
		shadeOrValue: Shade | string,
		value?: string
	) {
		if (!windowLoaded) return;
		let shade = shadeOrValue as Shade;
		if (arguments.length === 2) {
			value = shadeOrValue as string;
			shade = '' as unknown as Shade;
		}
		const key = formatVar(name as string, shade, true);
		if (typeof value == 'string' && value.length) {
			document.documentElement.style.setProperty(key, value);
		}
	}

	/**
	 * Removes a css variable from the root.
	 * 
	 * @param name the name of the variable to remote.
	 */
	function remove(name: ColorName<T>): void;

	/**
	 * Remove a css variable from the root.
	 * 
	 * @param name the name of the variable to be removed.
	 * @param shade the shade used to build name or key for removal.
	 */
	function remove(name: keyof T, shade: Shade): void;
	function remove(name: keyof T | ColorName<T>, shade?: Shade) {
		if (!windowLoaded) return;
		const key = formatVar(name as string, shade, true);
		document.documentElement.style.removeProperty(key);
	}

	/**
	 * Using a color palette object of key values, update all colors to root.
	 * 
	 * @param palette the color palette collection to update from.	
	 */
	function update(palette?: Palette<T> | Partial<Palette<T>>): void;

	/**
	 * Updates a single css variable in the root variables collection.
	 * 
	 * @param name the name of the css variable to be updated.
	 * @param value the value to use for updating.
	 */
	function update(name: string, value: string): void;

	/**
 * Updates a single css variable in the root variables collection.
 * 
 * @param name the name of the css variable to be updated.
 * @param value the value to use for updating.
 */
	function update(name: string, shade: Shade, value: string): void;
	function update(
		nameOrPalette?: string | Palette<T> | Partial<Palette<T>>,
		shadeOrValue?: Shade | string,
		value?: string
	) {
		if (!windowLoaded) return;

		let shade: Shade | undefined;

		if (arguments.length > 1) {
			if (arguments.length === 3) {
				shade = shadeOrValue as Shade;
			}
			else {
				value = shadeOrValue as string;
			}
		}

		const palette = (
			typeof nameOrPalette === 'string'
				? { [nameOrPalette]: value || '' }
				: nameOrPalette || initPalette
		) as Palette<T> | Partial<Palette<T>>;

		Object.entries(palette).forEach((v) => {
			const [color, conf] = v;

			if (typeof conf === 'object' && conf !== null && !Array.isArray(conf)) {
				Object.entries(conf as Record<string, string>).forEach((c) => {
					const [shade, value] = c;
					if (shade === 'DEFAULT')
						add(color as keyof T, value);
					else
						add(color as keyof T, shade as unknown as Shade, value);
				});

			}
			else if (typeof conf === 'string') {
				add(color as keyof T, shade as Shade, value as string);
			}

		});

		document.documentElement.classList.add(TOKEN);
	}

	if (!hasInit) update();

	return api;
}

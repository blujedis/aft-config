import {} from '../plugin/generate';
import type {
	Shade,
	PaletteInit,
	ColorVariable,
	PaletteColor,
	Palette,
	ColorName
} from '../types';

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

	function add(name: ColorName<T>, value: string): void;
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

	function remove(name: ColorName<T>): void;
	function remove(name: keyof T, shade: Shade): void;
	function remove(name: keyof T | ColorName<T>, shade?: Shade) {
		if (!windowLoaded) return;
		const key = formatVar(name as string, shade, true);
		document.documentElement.style.removeProperty(key);
	}

	function update(palette?: Palette<T> | Partial<Palette<T>>): void;
	function update(key: string, value: string): void;
	function update(
		keyOrPalette?: string | Palette<T> | Partial<Palette<T>>,
		value?: string
	) {
		if (!windowLoaded) return;

		const palette = (
			typeof keyOrPalette === 'string'
				? { [keyOrPalette]: value }
				: keyOrPalette || initPalette
		) as Palette<T> | Partial<Palette<T>>;

		Object.entries(palette).forEach((v) => {
			const [color, conf] = v;
			if (typeof conf !== 'object') return; // can't build variable unless object of shades.

			Object.entries(conf as Record<string, string>).forEach((c) => {
				const [shade, value] = c;
				if (shade === 'DEFAULT') add(color as keyof T, value);
				else add(color as keyof T, shade as unknown as Shade, value);
			});
		});

		document.documentElement.classList.add(TOKEN);
	}

	if (!hasInit) update();

	return api;
}

const vars = useVars({ primary: { 100: '' }, secondary: { 100: '' } } as Palette);

import { getProperty, setProperty } from 'dot-prop';
import { twMerge } from 'tailwind-merge';
import type {
	ClassProp,
	Features,
	FeaturesDefined,
	Palette,
	Path,
	Shade
} from '../types';

/**
 * A simplified version for converting values/objects into single class string.
 * For a more robust version use the following:
 * @see https://www.npmjs.com/package/classnames
 *
 * @param classes classes or objects to merge into class.
 */
export function classnames(...classes: (ClassProp | ClassProp[])[]) {
	const flattened = classes.flat();
	let result = [] as string[];

	function handleString(value: string) {
		result = [...result, value.trim()];
	}

	function handleObject(value: Record<string, any> | string[]) {
		for (const [key, v] of Object.entries(value)) {
			if (typeof v === 'undefined' || v === null || v === false) continue;
			if (typeof v === 'object') {
				handleObject(v);
			} else {
				if (typeof v === 'string') v.replace(/\s+/g, ' ').trim().split(' ');
				handleString(v === true ? key + '' : v);
			}
		}
	}

	for (let val of flattened) {
		if (typeof val === 'undefined' || val === null || val === '') continue;
		if (typeof val === 'string')
			//{
			val = val.replace(/\s+/g, ' ').trim().split(' ');
		handleObject(val as any[] | Record<string, any>);
	}

	// remove dupes and trim to be sure.
	return Array.from(new Set(result)).join(' ').trim().replace(/\s+/g, ' ');
}

/**
 * Combines values to create styles for html element style attribute.
 *
 * @param values the values to combine as style property value.
 */
export function stylenames(...values: any[]) {
	values = values.flat();
	return values
		.reduce((a, c) => {
			if (typeof c === 'string') {
				c = c.replace(/;$/, '').replace(/\s+/g, ' ').trim();
			} else if (c !== null && typeof c === 'object') {
				Object.keys(c).forEach((k) => {
					const val = c[k];
					if (val) c = k.replace(/;$/, '').replace(/\s+/g, ' ').trim();
				});
			}
			a.push(c as string);
			return a;
		}, [] as string[])
		.join('; ');
}

/**
 * Uses JSON parse/stringify to create a simple cloned object.
 *
 * @param obj the object to be cloned.
 */
export function shallowClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

// Class and Style Helpers //

/**
 * Ensures that the value is an array of defined type.
 *
 * @param value the value to ensure as array.
 * @param def a default value if value above is undefined.
 */
export function ensureArray<T = any>(value: T | T[], def = [] as T[]): T[] {
	if (typeof value === 'undefined') return def;
	if (!Array.isArray(value)) value = [value];
	return value as T[];
}

/**
 * Takes an array of strings or RegExp and ensures all are RegExp.
 *
 * @param filters the filters to ensure as RegExp.
 */
export function ensureFilters(filters: string | RegExp | (string | RegExp)[]) {
	const arr = ensureArray(filters);
	const filterSet = Array.from(new Set(arr));
	return filterSet.map((f) => (typeof f === 'string' ? new RegExp(f, 'i') : f));
}

/**
 * Filters a string of classes removing matches.
 *
 * @param classes the classes to be filtered.
 * @param filters the fillters to be applied.
 */
function applyFilters(classes: string[], filters: RegExp[]) {
	const excluded = [] as string[];

	const filtered = classes.reduce((result, c) => {
		c = c.trim();
		const valid = !~excluded.indexOf(c) && !filters.some((f) => f.test(c));
		if (valid) result = [...result, c];
		else excluded.push(c);
		return result;
	}, [] as string[]);
	return filtered;
}

/**
 * Filters styles that are not valid or preserves those which match.
 *
 * @param classes the classes to be processed.
 * @param filters filters used to check if style is valid.
 */
export function filterClasses(
	classes: string | string[],
	filters: string | RegExp | (string | RegExp)[]
) {
	if (typeof classes === 'string')
		classes = classes.trim().replace(/\s+/g, ' ').split(' ');
	if (typeof filters === 'string')
		filters = filters.trim().replace(/\s+/g, ' ').split(' ');
	if (!Array.isArray(classes) || !Array.isArray(filters))
		throw new Error(`Type mismatch: failed to match class styles using `);
	if (!filters.length) return classes;
	return applyFilters(ensureArray(classes), ensureFilters(filters));
}

/**
 * Merges Tailwind classes purging duplicates allowing for overrides.
 *
 * @param classes the classes to be merged.
 */
export function mergeTailwind(...classes: string[]) {
	return twMerge(...classes);
}

/**
 * Simple helper to concat class strings.
 *
 * @param item a string or array of string.
 * @param items an array of string or array.
 */
export function concat(
	item: string | null | undefined | string[],
	...items: (string | null | undefined | string[])[]
) {
	if (!Array.isArray(item) && item !== null && typeof item !== 'undefined')
		item = [item];
	return [...(item || []), ...items]
		.flat()
		.map((v) => (v || '').trim())
		.filter((i) => !!i)
		.join(' ');
}

/**
 * Pick values from object. Supports only one nested level.
 *
 * @param obj the object to pick values from.
 * @param keys the keys to be picked.
 */
export function pick<T extends Record<string, any>, K extends Path<T>>(
	obj: T,
	...keys: (K | Path<T>)[]
) {
	const result = {} as Record<K, string | Record<string, any>>;
	keys.forEach((k) => {
		const val = getProperty(obj, k as string);
		setProperty(result, k as string, val);
	});
	return result;
}

/**
 * Picks nested keys from object containing palette colors.
 *
 * @param obj the object of variants.
 * @param keys the nested keys to be picked.
 */
export function pickVariant<
	T extends Record<keyof Palette, Record<string, any>>,
	K extends Path<T['primary']>
>(obj: T, ...keys: (K | Path<T['primary']>)[]) {
	const result = {} as any;
	Object.keys(obj).forEach((color) => {
		if (color !== 'default') {
			if (!keys.length) {
				// just creates empty object
				result[color] = {} as any;
			} else {
				keys.forEach((k) => {
					const path = `${color}.${k as string}`;
					const val = getProperty(obj, path);
					setProperty(result, path, val);
				});
			}
		}
	});
	return result as Record<keyof Palette, Record<string, any>>;
}

/**
 * Merges two feature configurations.
 * CAUTION: this does NOT function as a typical object literal merging
 * function. It is specific to feature configurations.
 *
 * @param target the target of the merged values.
 * @param source the source to merge from.
 * @param source1 the second source to merge from.
 * @param source2 the third source to merge from.
 */
export function mergeConfigs<
	T extends Record<string, any>,
	S extends Record<string, any>,
	S1 extends Record<string, any>,
	S2 extends Record<string, any>,
	S3 extends Record<string, any>
>(target: T, source: S, source1?: S1, source2?: S2, source3?: S3) {
	const clone = { ...target };

	function merger(s = {} as Record<string, any>) {
		for (const [k, v] of Object.entries(s)) {
			if (typeof clone[k] === 'undefined' && typeof v !== 'undefined') {
				clone[k as keyof T] = s[k];
			}
			if (v !== null && !Array.isArray(v) && typeof v === 'object') {
				if (typeof clone[k] !== 'object' || Array.isArray(clone[k]))
					throw new Error(
						`Data type mismiatch, both target and source must be objects.`
					);
				clone[k as keyof T] = mergeConfigs(clone[k], v);
			} else if (Array.isArray(v)) {
				if (!Array.isArray(clone[k]))
					throw new Error(
						`Data type mismiatch, both target and source must be arrays.`
					);
				clone[k as keyof T] = classnames(v) as any;
			} else {
				clone[k as keyof T] = classnames(clone[k], v) as any;
			}
		}
	}

	[source, source1, source2, source3].forEach((s) => {
		merger(s as Record<string, any>);
	});

	return clone;
}

/**
 * Extends configuration object with themes using current palette.
 *
 * @param features the object to extend themes to.
 * @param palette the palette object used for creating theme keys.
 */
export function withThemes<
	F extends Features,
	P extends Palette,
	K = Extract<keyof P, string>
>(features: F, palette: P) {
	type Result = F & { theme: K[] };
	return { ...features, theme: Object.keys(palette || {}) } as Required<Result>;
}

/**
 * Normalizes a component it's features and variants.
 *
 * @param features the features config to be normalizes.
 */
export function normalize<F extends Features>(features: F): FeaturesDefined<F>;

/**
 * Normalizes a component it's features and variants extending with themes from palette.
 *
 * @param features the features config to be normalizes.
 * @param palette the theme color palette.
 */
export function normalize<
	F extends Features,
	P extends Palette,
	K = Extract<keyof P, string>
>(features: F, palette?: P): FeaturesDefined<F> & { theme: K[] };
export function normalize<F extends Features, P extends Palette>(
	features: F,
	palette?: P
) {
	features = {
		base: '',
		variant: {},
		...features
	};
	features.variant = features.variant || {};
	for (const k in features.variant) {
		features.variant[k] = {
			base: '',
			default: '',
			filters: [],
			themes: {},
			...features.variant[k]
		};
	}
	if (palette) return withThemes(features, palette);
	return features;
}

/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
export function uniqid(radix = 16) {
	return '#' + ((Math.random() * 0xffffff) << 0).toString(radix);
}

/**
 * Generates the name of a css color variable.
 *
 * @param key the palette key to generate css var for.
 * @param shade the shade to be generated (default: 500)
 */
export function genCssVar(
	key: keyof Palette,
	shade = 500 as Shade,
	prefix = '--color'
) {
	return [prefix, key, shade].join('-').trim(); // `--color-${key}-${shade}`;
}

/**
 * Sets an HTMLElement's style property.
 *
 * @param node the node to set the property for.
 * @param key the key for the property to be set.
 * @param value the value to set for key.
 */
export function setStyleProperty<E extends HTMLElement>(
	node: E,
	key: string,
	value: any
) {
	node.style.setProperty(key, value);
}

/**
 * Picks from object then returns api for extending and merging.
 *
 * @param obj the object to pick keys from.
 * @param keys the keys to be picked.
 */
// export function pickWith<T extends Record<string, any>, K extends Path<T>>(obj: T, ...keys: (K | Path<T>)[]) {

// 	const result = pick(obj, ...keys);

// 	const api = {
// 		assign,
// 		merge,
// 		value: result
// 	};

// 	/**
// 	 * Convenience to Object.assign.
// 	 *
// 	 * @example
// 	 * const picked = pickWith({}, ...keys)
// 	 * 	.assign(value) // { ...picked, ...value }
// 	 *
// 	 * @param value the value to assign to target.
// 	 */
// 	function assign<V extends Record<string, any>>(value: V) {
// 		return Object.assign(result, value) as typeof result & V;
// 	}

// 	/**
// 	 * Convenience wrapper for mergeConfigs().
// 	 *
// 	 * @example
// 	 * const picked = pickWith({}, ...keys)
// 	 * 	.merge(value) // picked << value
// 	 * 	.merge(value, true) // value >> picked
// 	 *
// 	 * @param value the value used for merging classes.
// 	 * @param isTarget when isTarget the picked value is merged into the "value".
// 	 */
// 	function merge<V extends Record<string, any>>(value: V, isTarget = false) {
// 		if (isTarget)
// 			return mergeConfigs(value, result) as typeof result & V;
// 		return mergeConfigs(result, value) as typeof result & V;
// 	}

// 	return api;

// }

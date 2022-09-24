import unset from 'lodash.unset';
import type { ClassNameProp, DeepOmit, NestedKey, TypedElement } from '../types';

/**
 * A simplified version for converting values/objects into single class string.
 * For a more robust version use the following:
 * @see https://www.npmjs.com/package/classnames
 *
 * @param classes classes or objects to merge into class.
 */
export function classnames(...classes: (ClassNameProp | ClassNameProp[])[]) {
	const flattened = classes.flat();
	let result = [] as string[];

	function handleString(value: string) {
		result = [...result, ...value.trim().split(' ')];
	}

	function handleObject(value: Record<string, any>) {
		for (const [key, v] of Object.entries(value)) {
			if (typeof v === 'undefined' || v === null || v === false) continue;
			if (typeof v === 'object') {
				handleObject(v);
			} else {
				handleString(v === true ? key + '' : v);
			}
		}
	}

	for (const val of flattened) {
		if (typeof val === 'undefined' || val === null || val === '') continue;
		if (typeof val === 'string') {
			handleString(val.replace(/\s+/g, ' ').trim());
		} else if (typeof val === 'object') {
			handleObject(val);
		}
	}

	return result.join(' ');
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
 * Ensures the value provided is truthy.
 *
 * @param value a value to ensure is truthy.
 * @param def a default value if validation fails.
 */
export function defaultValue(value: any, def = '' as any) {
	if (typeof value === 'undefined' || value === '') return def;
	return value;
}

/**
 * Ensures the returned value is an array. When empty string, null or undefined
 * are detected an empty array or your default is returned.
 *
 * @param value the value to ensure as an array.
 */
export function ensureArray(value: unknown, def = [] as any[]) {
	if (typeof value === 'undefined' && value !== null && value !== '') value = def;
	if (!Array.isArray(value)) value = [value] as any;
	return value as any[];
}

/**
 * Uses JSON parse/stringify to create a simple cloned object.
 *
 * @param obj the object to be cloned.
 */
export function simpleClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * Omits $$slots and $$scope from $$props object, all other properties returned.
 *
 * @param obj the object to omit props for.
 */
export function omitProps<T extends Record<string, any>>(obj: T): T;

/**
 * Omits $$slots and $$scope from $$props object, as well as any keys
 * that are provided which are contained in the object.
 *
 * @param obj the object to omit props for.
 * @param keys a list of keys to be omitted from the object.
 */
export function omitProps<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	...keys: K[]
): Omit<T, K>;
export function omitProps<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	...keys: K[]
): T | Omit<T, K> {
	const clone = { ...obj };
	[...keys, '$$slots', '$$scope'].forEach((k) => delete clone[k]);
	return clone;
}

/**
 * Omit keys from an object using dot notation.
 *
 * @param obj the object and remove dot notated keys from.
 * @param remove the available keys that can be omitted.
 */
export function omitDeep<T extends Record<string, unknown>, K extends NestedKey<T>>(
	obj: T,
	...remove: NestedKey<T>[]
) {
	const clone = simpleClone(obj);
	remove.forEach((k) => unset(clone, k));
	return obj as DeepOmit<T, K>;
}

/**
 * Simple helper used to create a new object by picking known keys
 * within the provided object.
 *
 * @param obj the object to pick keys from.
 * @param keys the keys to be picked.
 */
export function pickProps<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	...keys: K[]
) {
	return keys.reduce((a, c) => {
		if (typeof obj[c] === 'undefined') return a;
		a[c] = obj[c];
		return a;
	}, {} as Record<K, any>);
}

export function getTypedConfig<
	T extends Record<string, any>,
	K extends keyof T | true | undefined = undefined
>(config: T) {
	return config as unknown as TypedElement<T, K>;
}

/**
 * Picks values from theme configuration features property/collection.
 *
 * @param features the elements feature collection.
 * @param values the values the user passed in props.
 * @param defaults any optional default values.
 */
export function parseFeatures<
	F extends Record<string, any>,
	V extends Partial<Record<keyof F, any>>,
	D extends Partial<Record<keyof F, any>>
>(features: F, values: V, defaults = {} as D) {
	const result = {} as any;
	for (const k in values) {
		if (
			typeof values[k] === 'undefined' ||
			values[k] === false ||
			values[k] === null
		)
			continue;
		// if object value must be key of object.
		if (typeof features[k] === 'object') {
			if (Object.keys(features[k]).includes(values[k])) {
				if (k === 'theme') {
					const theme = features[k][values[k]];
					if (typeof theme === 'string') result[k] = theme;
					else result[k] = theme[values['variant'] || 'default'];
				} else {
					result[k] = features[k][values[k]];
				}
			}
		} else {
			if (typeof values[k] === 'string') result[k] = values[k];
			else if (values[k] === true) result[k] = features[k];
		}
	}
	return { ...defaults, ...result } as Partial<Record<keyof F | keyof D, any>>;
}

import type { defaultColors, shades } from './utils/generate';
import 'svelte2tsx/svelte-jsx';

// Common

export type BaseType = string | number | boolean | undefined | null;

export type ClassNameType = BaseType | Record<string, any>;

export type ClassNameProp = ClassNameType | ClassNameType[];

export type StringOrValue = string & { value?: any };

export type TypeOrValue<Keys extends string | number | symbol> =
	| Keys
	| StringOrValue;

export type FallbackType = 'undefined' | 'null' | false;

export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends Array<infer R>
		? Array<DeepPartial<R>>
		: DeepPartial<T[K]>;
};

export type DeepRequired<T> = {
	[K in keyof Required<T>]?: T[K] extends Array<infer R>
		? Array<DeepRequired<R>>
		: T[K] extends object
		? DeepRequired<T[K]>
		: T[K];
};

// Theme Colors

export type ThemeDefaultColors = typeof defaultColors;
export type ThemeColor = keyof ThemeDefaultColors;
export type Shade = typeof shades[number];
export type ThemeColors = Record<ThemeColor, Record<Shade | 'DEFAULT', string>>;

// Theme and Variant Helpers

export type ThemeKey<T extends Record<string, unknown>> = keyof T;

export type VariantKey<
	T extends Record<string, unknown>,
	K extends keyof T = keyof T
> = keyof T[K];

// Theme Element Config

const META = Symbol.for('META');

export interface ElementConfig {
	base?: string | Record<string, any>;
	defaults?: Record<string, any>;
	features?: Record<string, any> & {
		theme?: Record<string, string | Record<string, string | Record<string, string>>>;
	};
}

export interface ThemeConfig {
	readonly [META]?: Record<string, any>;
	global: Record<string, any>;
	elements: Record<string, ElementConfig>;
}

// export type ElementConfigs = { global: Record<string, any> } & Record<string, ElementConfig>;

export type NormalizedElement<C extends ElementConfig> = Omit<C, 'defaults'> & {
	defaults: TypedDefaults<Required<C['defaults']>, Required<C['features']>>;
};

export type NormalizedElements<C extends Record<string, ElementConfig>> = {
	[K in keyof C]: NormalizedElement<C[K]>;
};

export type NormalizedTheme<T extends ThemeConfig> = Omit<T, 'elements'> & {
	elements: NormalizedElements<T['elements']>;
};

// Picks feature types.

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TypedFeaturesBase<T extends Record<string, any>> = {
	[P in keyof T]: T[P] extends object
		? T[P] extends readonly any[]
			? T[P][number]
			: keyof T[P]
		: boolean;
	// T[P] extends readonly any[] ? T[P][number] : TypeOrValue<keyof T[P]> : boolean
};

/**
 * Converts element features to typed options.
 * K = undefined return all props as required.
 * K = true return all props as optional.
 * K = keyof T return only those props as partial.
 *
 * Expects element features object ex: typeof theme.elements.icon.features
 */
export type TypedFeatures<
	T extends Record<string, any>,
	K extends keyof T | true | undefined = undefined
> = K extends undefined
	? TypedFeaturesBase<T>
	: K extends keyof T
	? Optional<TypedFeaturesBase<T>, K>
	: K extends true
	? Partial<TypedFeaturesBase<T>>
	: never;

/**
 * Converts defaults object to typed default types when features key exist.
 *
 * Expects element defaults object ex: typeof theme.elements.icon.defaults
 */
export type TypedDefaults<
	D extends Record<string, any>,
	F extends Record<string, any>,
	U extends string = Exclude<Extract<keyof D, string>, keyof F>,
	V extends string = Exclude<Extract<keyof D, string>, U>
> = Record<U, D[U]> & {
	[P in V]: F[P] extends object
		? F[P] extends readonly any[]
			? F[P][number]
			: keyof F[P]
		: D[P];
};

/**
 * Creates typed element config in one object.
 *
 * Expects element config ex: typeof theme.elements.icon
 */
export type TypedElement<
	T extends Record<string, any>,
	K extends keyof T | true | undefined = undefined
> = {
	base: T['base'];
	features: TypedFeatures<T['features'], K>;
	defaults: TypedDefaults<T['defaults'], T['features']>;
};

export type TypedProps<
	T extends Record<string, any>,
	K extends keyof T | true | undefined = undefined
> = TypedElement<T, K>['features'];

// Element Attributes Helper for Picking Typed Options

export type ExclcludedAttributes<T extends HTMLElement> =
	| keyof svelte.JSX.DOMAttributes<T>
	| 'class'
	| 'classname'
	| 'inputmode'
	| 'unselectable';

export type ElementAttributes<T extends HTMLElement> = Omit<
	svelte.JSX.HTMLAttributes<T>,
	ExclcludedAttributes<T>
> &
	Partial<{
		inputmode:
			| 'search'
			| 'none'
			| 'text'
			| 'tel'
			| 'url'
			| 'email'
			| 'numeric'
			| 'decimal';
		classname: string;
		class: string;
	}>;

// Nested Omit Type

export type NestedKey<O> = {
	[K in Extract<keyof O, string>]: O[K] extends Array<any>
		? K
		: O[K] extends Record<string, unknown>
		? `${K}` | `${K}.${NestedKey<O[K]>}`
		: K;
}[Extract<keyof O, string>];

export type UnDot<T extends string> = T extends `${infer A}.${infer B}`
	? [A, ...UnDot<B>]
	: [T];

export type Tail<T extends any[]> = ((...t: T) => void) extends (
	h: any,
	...r: infer R
) => void
	? R
	: never;

export type DeepOmitBase<T, Path extends string[]> = T extends object
	? Path['length'] extends 1
		? Omit<T, Path[0]>
		: {
				[K in keyof T]: K extends Path[0] ? DeepOmitBase<T[K], Tail<Path>> : T[K];
		  }
	: T;

export type DeepOmit<T, Path extends NestedKey<T>> = DeepOmitBase<T, UnDot<Path>>;

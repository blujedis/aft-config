import type { shades, defaultPalette } from './main/palette';

// Common

export type BaseType = string | number | boolean | undefined | null;

export type ClassType = BaseType | Record<string, any>;

export type ClassProp = ClassType | ClassType[];

export type TypeOrValue<Keys extends string | number | symbol> =
	| Keys
	| (string & { value?: any });

// Pick, Optional, Omit, Partial

export type OptionalProps<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type RequiredProps<T, K extends keyof T> = Pick<Required<T>, K> &
	Partial<Omit<T, K>>;

export type DeepPartial<T extends Record<string, any>> = {
	[K in keyof T]?: T[K] extends Array<any>
	? T[K]
	: T[K] extends object
	? DeepPartial<T[K]>
	: T[K];
};

export type NestedKey<O> = {
	[K in Extract<keyof O, string>]: O[K] extends Array<any>
	? K
	: O[K] extends Record<string, unknown>
	? `${K}` | `${K}.${NestedKey<O[K]>}`
	: K;
}[Extract<keyof O, string>];

type UnDot<T extends string> = T extends `${infer A}.${infer B}`
	? [A, ...UnDot<B>]
	: [T];

type Tail<T extends any[]> = ((...t: T) => void) extends (
	h: any,
	...r: infer R
) => void
	? R
	: never;

type DeepOmitBase<T, Path extends string[]> = T extends object
	? Path['length'] extends 1
	? Omit<T, Path[0]>
	: { [K in keyof T]: K extends Path[0] ? DeepOmitBase<T[K], Tail<Path>> : T[K]; }
	: T;

export type DeepOmit<T, Path extends NestedKey<T>> = DeepOmitBase<T, UnDot<Path>>;

export type ParsePath<T, Key extends keyof T> = Key extends string
	? T[Key] extends Record<string, any>
	?
	| `${Key}.${ParsePath<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
	| `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
	: never
	: never;

export type ParsePathKey<T> = ParsePath<T, keyof T> | keyof T;

export type Path<T> = ParsePathKey<T> extends string | keyof T
	? ParsePathKey<T>
	: keyof T;

export type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
	? Key extends keyof T
	? Rest extends Path<T[Key]>
	? PathValue<T[Key], Rest>
	: never
	: never
	: P extends keyof T
	? T[P]
	: never;

// Palette.

export type TailwindColor =
	| 'slate'
	| 'gray'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';

export type TailwindOpacity =
	| 10
	| 20
	| 25
	| 30
	| 40
	| 50
	| 60
	| 70
	| 80
	| 90
	| 95
	| 100;

export type Shade = typeof shades[number];

export type ShadeDefault = Shade & 'DEFAULT';

export type DefaultKeys = keyof typeof defaultPalette;

export type PaletteColor = Partial<Record<Shade | 'DEFAULT', string>>;

export type PaletteInit = Record<DefaultKeys, string | Partial<PaletteColor>>;

export type Palette<T extends PaletteInit = PaletteInit> = Record<
	keyof T,
	PaletteColor
>;

export type ColorVariable<
	T extends PaletteInit = PaletteInit,
	P extends string = 'color',
	K extends string = Extract<keyof T, string>
> = `--${P}-${K}` | `--${P}-${K}-${Shade}`;

export type ColorName<T extends PaletteInit = PaletteInit> =
	| keyof T
	| `${Extract<keyof T, string>}-${Shade}`;

export type VariantThemes = Record<string, string | Record<string, string>>;

export interface Variant {
	base?: string | Record<string, any>;
	// default?: string | Record<string, any>;
	filters?: string | RegExp | (string | RegExp)[];
	themes?: VariantThemes;
}

export type Features = Record<string, any> & {
	variant?: Record<string, Variant>;
};

export type FeaturesDefined<
	F extends Features,
	VKey extends keyof Required<F['variant']> = keyof Required<F['variant']>
> = {
	[P in keyof Required<F>]: F[P] extends (...args: any[]) => any
	? LookupHandler<F[P]>
	: F[P];
} & {
	variant: Record<VKey, Required<Variant>>;
};

export type FeaturesTheme<
	V extends Record<string, Variant>,
	K extends keyof V
> = keyof Required<V[K]>['themes'];

// Builder

type TypedDefaultsBase<F extends Record<string, any>> = {
	[P in keyof F]: F[P] extends (...args: any) => any
	? boolean
	: F[P] extends readonly any[]
	? TypeOrValue<F[P][number]>
	: F[P] extends object
	? TypeOrValue<keyof F[P]>
	: boolean;
};

// If no required keys make all optional.
export type TypedDefaults<F extends Record<string, any>> = TypedDefaultsBase<F>;

export type LookupHandler<
	T extends (...args: any[]) => string | Record<string, string>
> = (...args: Parameters<T>) => string | Record<string, string>;

// Plugin

export type ShadeLight = Shade | `${Shade}/${TailwindOpacity}`;

export type ShadeDark = Shade | `${Shade}/${TailwindOpacity}` | null;

export type ShadesTuple = [string, ShadeLight, ShadeDark?];

export interface PluginOutput {
	outdir?: string | boolean;
	outtype?: 'esm' | 'cjs' | 'json';
	outext?: 'js' | 'cjs' | 'mjs' | 'ts' | 'json';
	output?: boolean;
}

export interface PluginOptions extends PluginOutput {
	dynamic?: boolean; // when true css variables used for theme colors.
	prefix?: 'color';
	colors?: PaletteInit;
}

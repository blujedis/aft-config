import { getProperty, deleteProperty } from 'dot-prop';
import { classnames, filterClasses, mergeTailwind, ensureArray } from './helpers';
import type {
	ClassProp,
	TypedDefaults,
	Variant,
	FeaturesTheme,
	Palette,
	RequiredProps,
	LookupHandler,
	TypeOrValue
} from '../types';

export class Builder<
	F extends Record<string, any>,
	P extends Palette | undefined = undefined
> {
	palette?: P;
	features!: F;
	featureClasses = [] as ClassProp[];
	themeClasses = [] as ClassProp[];
	userClasses = [] as ClassProp[];
	themeFilters = [] as (string | RegExp)[];
	filters = [] as (string | RegExp)[];
	requiredKeys = [] as any[];
	tmpconf?: any;

	/**
	 * Constructs new component builder.
	 *
	 * @param features the features or options that apply to the component.
	 */
	constructor(features: F, palette = undefined as unknown as P) {
		this.features = features;
		this.palette = palette;
	}

	private isFeature(key: keyof F) {
		return Object.keys(this.features).includes(key as string);
	}

	/**
	 * Cleans props from object, by default removes $$slots and
	 * $$scope from $$Props if they exist.
	 */
	cleanProps<T extends Record<string, any>>(props: T): Required<T>;

	/**
	 * Cleans props from object, by default removes $$slots and
	 * $$scope from $$Props if they exist.
	 *
	 * @param props the props to be cleaned.
	 */
	cleanProps<T extends Record<string, any>, K extends keyof T>(
		props: T,
		...keys: K[]
	): Required<Pick<T, Exclude<keyof T, K>>>;

	cleanProps<T extends Record<string, any>, K extends keyof T>(
		props: T,
		...keys: K[]
	) {
		keys = ['$$slots' as K, '$$scope' as K, ...keys];
		return Object.entries(props).reduce((result, [k, v]) => {
			if (keys.includes(k as K)) return result;
			result[k as keyof typeof result] = v;
			return result;
		}, {} as Pick<T, Exclude<keyof T, K>>);
		// keys.forEach(k => delete props[k]);
		// return props as Pick<T, Exclude<keyof T, K>>;
	}

	/**
	 * Gets a feature using dot nation path.
	 *
	 * @param key the dot notation key to get value for.
	 */
	getFeature<K extends keyof F>(key: K) {
		return getProperty(this.features, key as string) as F[K];
	}

	/**
	 * Defines default values returning typed defaults.
	 *
	 * @param defaults the default values for the props.
	 */
	defaults<E extends keyof F = never, R extends keyof F = never>(
		defaults: Partial<TypedDefaults<F>>,
		exclude = [] as E[],
		required = [] as Exclude<R, E>[]
	) {
		type Result = Partial<Pick<TypedDefaults<F>, Exclude<keyof F, E>>>;
		this.requiredKeys = required;
		const clone = { ...defaults };
		(exclude || []).forEach((key) => deleteProperty(clone, key as string));
		return clone as RequiredProps<Result, Exclude<R, E>>;
	}

	/**
	 * Picks a features value if "when" arg is true. If when arg is string
	 * assumes we are looking for a nested value.
	 *
	 * @param key the feature's dot notation key to retrieve value for.
	 * @param when when false the class is is ignored, when true acced to collection.
	 */
	addFeature(key: keyof F, when?: boolean | string) {
		if (!when || !this.isFeature(key)) return this;
		const path = (
			typeof when === 'string' ? `${key as string}.${when}` : key
		) as string;
		const classes = getProperty(this.features, path);
		this.featureClasses = [...this.featureClasses, classes];
		return this;
	}

	/**
	 * Adds a class or collection of classes or object classes to the instance class store.
	 *
	 * @param value the class or classes to add, can be string, array object with key vals.
	 * @param when when false the class is is ignored, when true acced to collection.
	 */
	addClass(value: ClassProp, when?: boolean | null) {
		if (when === false || typeof value === 'undefined') return this;
		if (!Array.isArray(value)) value = [value];
		this.featureClasses = [...this.featureClasses, ...(value as any[])];
		return this;
	}

	/**
	 * Adds a class, collection of classes, object classes which are applied w/o filtering.
	 *
	 * @param value the class or classes to add, can be string, array object with key vals.
	 * @param when when false the class is is ignored, when true acced to collection.
	 */
	addUserClass(value: ClassProp, when?: boolean | null) {
		if (when === false || typeof value === 'undefined') return this;
		if (!Array.isArray(value)) value = [value];
		this.userClasses = [...this.userClasses, ...(value as any[])];
		return this;
	}

	/**
	 * Looks up classes by calling a lookup handler.
	 *
	 * @param key the key to lookup handler.
	 * @param when if true handler is called and styles are looked up.
	 * @param args the arguments needed for the handler.
	 */
	addHandlerClass<K extends keyof F>(
		key: K,
		when?: boolean,
		...args: Parameters<F[K]>
	) {
		if (!when) return this;
		const handler = this.features[key] as LookupHandler<F[K]>;
		const result = handler(...args);
		this.featureClasses = [...this.featureClasses, result];
		return this;
	}

	/**
	 * Adds glob path filters to be added to local store collection.
	 *
	 * @param filters the filter or filters to be added.
	 * @param when when false filter is ignored if true or undefined the filter(s) added.
	 */
	addFilter(filters: string | RegExp | (string | RegExp)[], when?: boolean) {
		if (!Array.isArray && typeof filters !== 'undefined')
			filters = [filters as string | RegExp];
		filters = filters || [];
		if (
			(when || typeof when === 'undefined') &&
			(filters as (string | RegExp)[]).length
		)
			this.filters = [...this.filters, ...(filters as (string | RegExp)[])];

		return this;
	}

	/**
	 * Gets a component's theme with variant including base values and filter patterns.
	 *
	 * @param theme the theme name to get.
	 * @param variant the theme's variant to get.
	 */
	addVariant<K extends keyof V, V = F['variant']>(
		variant: TypeOrValue<K>,
		theme?: TypeOrValue<FeaturesTheme<Required<V> & Record<keyof V, V[keyof V]>, K>>
	) {
		try {
			const variants = (this.features['variant'] || {}) as Record<
				K,
				Required<Variant>
			>;
			const varConf = {
				base: '',
				filters: [],
				themes: {},
				...(variants[(variant || 'default') as K] as Variant)
			};
			const themeClasses = [varConf.base];
			if (theme) {
				const themeConf = varConf.themes[theme as keyof typeof varConf];
				themeClasses.push(themeConf || '');
			} else {
				themeClasses.push(varConf.default || ''); // default class styling.
			}
			this.themeClasses = themeClasses;
			this.themeFilters = [...this.themeFilters, ...ensureArray(varConf.filters)];
		} catch (ex) {
			console.warn(`Invalid variant or theme: ${(ex as Error).message}`);
		}
		return this;
	}

	/**
	 * Merges css classes purges falsey values parses objects.
	 *
	 * @param classes the classes to be merged.
	 */
	mergeClasses(...classes: ClassProp[]) {
		return classnames(...classes);
	}

	/**
	 * Merges css classes purges falsey values parses objects, cleans dupes within Tailwind
	 *
	 * @param classes the classes to be merged.
	 */
	mergeTailwind(...classes: ClassProp[]) {
		return mergeTailwind(classnames(...classes));
	}

	/**
	 * Bundles classes optionally filtering and running through Tailwind Merge.
	 *
	 * @param filter when true apply filters cleaning classes (default: true).
	 * @param tailwindPurge when true run through Tailwind Merge (default: true).
	 */
	bundle(tailwindPurge = true) {
		// Apply all filters against features and base classes.
		const allFilters = [...this.filters, ...this.themeFilters];
		const filteredClasses = allFilters.length
			? filterClasses(classnames(this.featureClasses), allFilters).join(' ')
			: classnames(this.featureClasses);
		// Apply global filters against themes.
		const filteredThemes = filterClasses(
			classnames(this.themeClasses),
			this.filters
		).join(' ');
		// Compile all classes bundling all styles.
		const classes = [
			filteredClasses,
			filteredThemes,
			classnames(this.userClasses)
		].join(' ');
		if (!tailwindPurge) return classes;
		return mergeTailwind(...classes.split(' '));
	}

	/**
	 * Clones the current builder returning new instance.
	 */
	clone() {
		const features = structuredClone(this.features) as typeof this.features;
		const palette = structuredClone(this.palette) as typeof this.palette;
		return new Builder(features, palette);
	}

}

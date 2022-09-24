import type {
	ElementConfig,
	NormalizedElement,
	NormalizedElements,
	NormalizedTheme,
	ThemeConfig
} from '../types';

/**
 * Normalize element configuration.
 *
 * @param conf the configuration object containing defaults and features.
 */
export function normalizeElement<C extends ElementConfig>(conf: C) {
	const normalized = {
		base: '',
		defaults: {},
		features: {},
		...conf
	} as unknown as NormalizedElement<C>;
	return normalized;
}

/**
 * Iterates configuration files normalizing types.
 *
 * @param confs the configuration files to normalize.
 */
export function normalizeElements<C extends Record<string, ElementConfig>>(
	confs: C
) {
	return Object.entries(confs).reduce((a, [key, val]) => {
		a[key as keyof C] = normalizeElement(val) as any;
		return a;
	}, {} as NormalizedElements<C>);
}

/**
 * Normalizes a complete theme ensuring defaults and types.
 *
 * @param conf the full theme configuration to be normalized.
 */
export function normalizeTheme<C extends ThemeConfig>(conf: C) {
	const result = {
		global: { bg: '', color: '', ...conf.global },
		elements: normalizeElements(conf.elements)
	};
	return result as typeof result & NormalizedTheme<C>;
}

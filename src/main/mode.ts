/**
 * Initializes theme mode dark or light
 * based on localStorage value or preferred user mode.
 * This should be directly imported/used in the head of
 * your main HTML document.
 */

export type ThemeMode = 'light' | 'dark';

export const windowLoaded = typeof window !== 'undefined';

export const THEME_KEY = '__forewind_mode__';

/**
 * Gets boolean returning true if user prefers dark color mode.
 */
const prefersDark = () => {
	if (!windowLoaded) return false;
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark;
};

/**
 * Returns true if current mode is dark.
 */
const isDark = () => windowLoaded && localStorage.getItem(THEME_KEY) === 'dark';

/**
 * Gets the current localStorage mode if any.
 */
const getStorageMode = () => (windowLoaded ? localStorage.getItem(THEME_KEY) : '');

/**
 * Gets the current mode falling back to window.matchMedia "prefers-color-scheme"
 *
 * @param fallback if no mode in storage override fallback to matchMedia.
 */
const getCurrentMode = (fallback?: ThemeMode): ThemeMode => {
	if (!windowLoaded) return fallback || 'light';
	let current = getStorageMode();
	if (!current && prefersDark()) current = fallback || 'dark';
	return (current || fallback || 'light') as ThemeMode;
};

/**
 * Sets the mode in localStorage and the documentElement.classList.
 *
 * @param mode the mode you wish to set.
 */
const set = (mode: ThemeMode) => {
	if (!windowLoaded) return;
	localStorage.setItem(THEME_KEY, mode);
	if (mode === 'light') document.documentElement.classList.remove('dark');
	else document.documentElement.classList.add('dark');
};

/**
 * Toggles the current mode to light or dark.
 */
const toggle = () => {
	const current = getCurrentMode();
	set(current === 'light' ? 'dark' : 'light');
};

/**
 * Resets the mode both in localStorage and documentElement.classList.
 */
const reset = () => {
	if (!windowLoaded) return;
	localStorage.removeItem(THEME_KEY);
	document.documentElement.classList.remove('dark');
};

/**
 * Initializes theme mode and assigns to localStorage and documentElement.classList.
 *
 * @param mode the mode to initialize theme with.
 */
export const init = (mode?: ThemeMode) => set(mode || getCurrentMode());

/**
 * Creates hook api for managing mode.
 */
export const useMode = () => {
	return {
		get mode() {
			return getCurrentMode();
		},
		get isDark() {
			return isDark();
		},
		set,
		toggle,
		init,
		reset
	};
};

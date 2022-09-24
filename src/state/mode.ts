export type ThemeMode = 'light' | 'dark';

const Storage = localStorage as typeof localStorage & { mode: string };

const prefersDark = () => {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
};

const setMode = (mode: ThemeMode) => {
	if (mode === 'dark') {
		document.documentElement.classList.add('dark');
		localStorage.setItem('mode', mode);
	} else {
		localStorage.setItem('mode', 'light');
		document.documentElement.classList.remove('dark');
	}
};

export const useMode = () => {
	if (typeof window === 'undefined') {
		const _api = {
			get dark() {
				return false;
			},
			get current() {
				return 'light';
			},
			prefersDark,
			toggle: () => {
				return false;
			},
			reset: () => {
				return _api;
			}
		};
		return _api;
	}

	const api = {
		get dark() {
			return Storage.mode === 'dark';
		},

		get current() {
			return Storage.mode;
		},

		prefersDark,

		toggle: () => {
			const nextMode = Storage.mode === 'dark' ? 'light' : 'dark';
			setMode(nextMode);
			return nextMode;
		},

		reset: () => {
			localStorage.removeItem('mode');
			document.documentElement.classList.remove('dark');
			return api;
		}
	};

	return api;
};

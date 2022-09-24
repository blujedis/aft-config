const browser = typeof window !== 'undefined';

export type StorageApi = ReturnType<typeof createStorageApi>;

function createStorageApi() {
	const api = {
		exists,
		getOrCreate,
		get,
		set,
		remove
	};

	/**
	 * Checks if a key exists in localStorage.
	 *
	 * @param key the key to check if exists.
	 */
	function exists(key: string) {
		return localStorage.getItem(key) !== null;
	}

	/**
	 * Gets a key from localStorage with optional default value creation.
	 *
	 * @param key the key to get from local storage.
	 * @param def the default value if key does not exist.
	 */
	function getOrCreate<T>(key: string, def?: T): T | null {
		try {
			if (typeof def !== 'undefined') {
				if (!exists(key)) {
					const result = set(key, def);
					if (result) return def;
				}
				return null;
			}
			const currentValue = localStorage.getItem(key);
			if (!currentValue) return null;
			return JSON.parse(currentValue) as T;
		} catch (err) {
			console.log(err);
			return def || null;
		}
	}

	/**
	 * Gets a value from localStorage.
	 *
	 * @param key the key to get from localStorage.
	 */
	function get<T>(key: string): T | null {
		return getOrCreate(key);
	}

	/**
	 * Sets a value in localStorage.
	 *
	 * @param key The key in localStorage to be set.
	 * @param value the the value to be set.
	 */
	function set<T>(key: string, value: T) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	/**
	 * Remove key from localStorage.
	 *
	 * @param key the key to be removed from localStorage.
	 */
	function remove(key: string) {
		localStorage.removeItem(key);
	}

	return api;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const mock: StorageApi = {
	exists: (_v) => false,
	get: (_k) => null,
	getOrCreate: (_k, _d) => null,
	set: (_k, _v) => false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	remove: (_) => {}
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export const storage: StorageApi = !browser ? mock : createStorageApi();

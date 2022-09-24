import {
	writable,
	type Readable,
	type Unsubscriber,
	type Writable
} from 'svelte/store';
import merge from 'lodash.merge';
import { storage } from './storage';
import { normalizeTheme } from '../utils/normalize';
import type { ThemeConfig } from '../types';

interface Store<T> {
	subscribe: Readable<T>['subscribe'];
	set: Writable<T>['set'];
}

export interface PersistentStore<T> extends Store<T> {
	enable<U>(value?: U): PersistentStore<U & T>;
	disable: () => void;
}

export function createStore<T extends ThemeConfig>(key: string, initial: T) {
	const normalized = normalizeTheme(initial);

	const { subscribe, set } = writable(normalized);
	let unsubscriber: Unsubscriber;

	const api = {
		subscribe,
		set,
		enable,
		disable
	} as PersistentStore<typeof normalized>;

	/**
	 * Clears storage and unsubscribes
	 */
	function disable() {
		storage.remove(key);
		unsubscriber();
	}

	/**
	 * Enables store with optionally extended values.
	 *
	 * @param value the optional value to extend store with.
	 */
	function enable<U extends ThemeConfig>(value = {} as U) {
		if (typeof unsubscriber !== 'undefined')
			return api as unknown as PersistentStore<U & T>;
		const storageValue = storage.get<T>(key);
		const mergedValue = normalizeTheme(merge(storageValue, value));
		if (storageValue) set(mergedValue);
		unsubscriber = subscribe((storeValue) => {
			storage.set(key, storeValue);
		});
		return api as unknown as PersistentStore<U & T>;
	}

	return api;
}

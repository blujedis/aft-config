import { createStore } from './state';
import { baseTheme } from './config';

export * from './types';
export * from './state';
export * from './utils';

export const store = createStore('theme', baseTheme);

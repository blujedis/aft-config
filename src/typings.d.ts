import type { useMode } from './main/mode';

declare global {
	interface Window {
		forewind: {
			mode: ReturnType<typeof useMode>;
		};
	}
}

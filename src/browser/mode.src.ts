import { init, useMode, windowLoaded } from '../main/mode';

if (!windowLoaded) {
	console.error(
		`Forewind "mode" should only be loaded in browser. Import in head element in "index.html" or "app.html" using <script src="node_modules/@forewind/util/dist/browser/mode.js"></script>`
	);
} else {
	if (!window.forewind) init();
	window.forewind = {
		mode: useMode()
	};
}

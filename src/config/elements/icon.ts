import { shadow, rounded } from './_shared';

export const icon = {
	base: '',
	defaults: {
		theme: 'default',
		size: 'sm'
	},
	features: {
		rounded: { ...rounded },
		shadow: { ...shadow },
		size: {
			xs: 'h-4 w-4',
			sm: 'h-6 w-6',
			md: 'h-8 w-8',
			lg: 'h-10 w-10',
			xl: 'h-12 w-12',
			'2xl': 'h-14 w-14'
		},
		theme: {
			default: 'text-slate-500 dark:text-slate-300',
			primary: 'text-indigo-600 dark:text-indigo-300',
			secondary: 'text-indigo-600 dark:text-indigo-300',
			dark: 'text-slate-900',
			error: 'text-rose-600 dark:text-rose-400',
			warn: 'text-amber-600 dark:text-amber-300',
			success: 'text-emerald-600 dark:text-emerald-300',
			info: 'text-cyan-600 dark:text-cyan-300'
		}
	}
};

import { shadow, rounded } from './_shared';

export const input = {
	base: '',
	defaults: {
		theme: 'default',
		variant: 'outline',
		size: 'md'
	},
	features: {
		shadow: { ...shadow },
		rounded: { ...rounded },
		full: 'w-full',
		size: {
			xs: 'px-4 py-1 text-xs',
			sm: 'px-5 py-1.5 text-sm',
			md: 'px-6 py-2.5 text-sm',
			lg: 'px-7 py-2.5 text-md',
			xl: 'px-8 py-3.5 text-md',
			'2xl': 'px-9 py-4 text-lg',
			'3xl': 'px-10 py-6 text-lg'
		},
		theme: {
			default: {
				solid: {
					bg: 'bg-slate-200',
					color: 'text-slate-500',
					border: 'border border-transparent'
				},
				outline: {
					color: 'text-slate-500 dark:text-slate-300',
					border: 'border border-slate-300 dark:border-slate-400'
				},
				ghost: {
					color: 'text-slate-500',
					border: 'border border-transparent'
				},
				flush: {}
			},
			primary: {
				solid: {
					bg: 'bg-indigo-600',
					color: 'text-indigo-50',
					border: 'border border-transparent'
				},
				outline: {
					color: 'text-indigo-600 dark:text-indigo-300',
					border: 'border border-indigo-600'
				},
				ghost: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent'
				},
				flush: {}
			},
			secondary: {
				solid: {
					bg: 'bg-indigo-600',
					color: 'text-indigo-50',
					border: 'border border-transparent'
				},
				outline: {
					color: 'text-indigo-600 dark:text-indigo-300',
					border: 'border border-indigo-600'
				},
				ghost: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent'
				},
				flush: {}
			},
			dark: {
				solid: {
					bg: 'bg-slate-900',
					color: 'text-slate-50',
					border: 'border border-transparent'
				},
				outline: {
					bg: '',
					color: 'text-slate-900',
					border: 'border border-slate-900'
				},
				ghost: {
					color: 'text-slate-900',
					border: 'border border-transparent'
				},
				flush: {}
			},
			danger: {
				solid: {
					bg: 'bg-rose-600',
					color: 'text-rose-50',
					border: 'border border-transparent'
				},
				outline: {
					bg: '',
					color: 'text-rose-600 dark:text-rose-300',
					border: 'border border-rose-600'
				},
				ghost: {
					color: 'text-rose-600',
					border: 'border border-transparent'
				},
				flush: {}
			},
			warning: {
				solid: {
					bg: 'bg-amber-600',
					color: 'text-amber-50',
					border: 'border border-transparent'
				},
				outline: {
					bg: '',
					color: 'text-amber-600 dark:text-amber-300',
					border: 'border border-amber-600'
				},
				ghost: {
					color: 'text-amber-600',
					border: 'border border-transparent'
				},
				flush: {}
			},
			success: {
				solid: {
					bg: 'bg-emerald-600',
					color: 'text-emerald-50',
					border: 'border border-transparent'
				},
				outline: {
					bg: '',
					color: 'text-emerald-600 dark:text-emerald-300',
					border: 'border border-emerald-600'
				},
				ghost: {
					color: 'text-emerald-600',
					border: 'border border-transparent'
				},
				flush: {}
			},
			info: {
				solid: {
					bg: 'bg-cyan-600',
					color: 'text-cyan-50',
					border: 'border border-transparent'
				},
				outline: {
					bg: '',
					color: 'text-cyan-600 dark:text-cyan-300',
					border: 'border border-cyan-600'
				},
				ghost: {
					color: 'text-cyan-600',
					border: 'border border-transparent'
				},
				flush: {}
			}
		}
	}
};

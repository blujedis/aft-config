import { shadow, rounded } from './_shared';

export const box = {
	base: '',
	defaults: {
		theme: 'default',
		variant: 'solid',
		size: 'md'
	},
	features: {
		rounded: { ...rounded },
		shadow: { ...shadow },
		full: 'w-full',
		size: {
			xs: 'p-2 text-sm',
			sm: 'p-3 text-sm',
			md: 'p-4 text-sm',
			lg: 'p-4 text-base',
			xl: 'p-5 text-base',
			'2xl': 'p-6 text-base'
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
				}
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
				}
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
				}
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
				}
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
				}
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
				}
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
				}
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
				}
			}
		}
	}
};

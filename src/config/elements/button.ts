import { shadow, rounded } from './_shared';

export const button = {
	base: 'inline-flex items-center font-medium focus:outline-none text-sm',
	defaults: {
		theme: 'default',
		variant: 'solid',
		size: 'md'
	},
	features: {
		rounded: { ...rounded },
		shadow: { ...shadow },
		ring: 'focus:ring-2 focus:ring-offset-2 focus:outline-none',
		full: 'w-full',
		size: {
			none: '',
			xs: 'px-2.5 py-1.5',
			sm: 'px-3 py-2',
			md: 'px-4 py-2',
			lg: 'px-4 py-2 text-base',
			xl: 'px-6 py-3 text-base',
			'2xl': 'px-8 py-4 text-base'
		},
		theme: {
			default: {
				solid: {
					bg: 'bg-slate-200',
					color: 'text-slate-500',
					hover: 'hover:bg-slate-200/80',
					border: 'border border-transparent',
					ring: 'focus:ring-slate-100'
				},
				outline: {
					color: 'text-slate-500 dark:text-slate-300',
					border: 'border border-slate-300 dark:border-slate-400',
					hover: 'hover:bg-slate-200/80 dark:hover:bg-slate-200/[.03]',
					ring: 'focus:ring-slate-100'
				},
				ghost: {
					color: 'text-slate-500',
					border: 'border border-transparent',
					hover: 'hover:bg-slate-200/80 dark:hover:bg-slate-200/[.03]',
					ring: 'focus:ring-slate-100'
				},
				link: {
					color: 'text-slate-500',
					border: 'border border-transparent'
				}
			},
			primary: {
				solid: {
					bg: 'bg-indigo-600',
					color: 'text-indigo-50',
					hover: 'hover:bg-indigo-600/90',
					border: 'border border-transparent',
					ring: 'focus:ring-indigo-600'
				},
				outline: {
					color: 'text-indigo-600 dark:text-indigo-300',
					border: 'border border-indigo-600',
					hover: 'hover:bg-indigo-600/10',
					ring: 'focus:ring-indigo-600'
				},
				ghost: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent',
					hover: 'hover:bg-indigo-600/10',
					ring: 'focus:ring-indigo-600'
				},
				link: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent'
				}
			},
			secondary: {
				solid: {
					bg: 'bg-indigo-600',
					color: 'text-indigo-50',
					hover: 'hover:bg-indigo-600/90',
					border: 'border border-transparent',
					ring: 'focus:ring-indigo-600'
				},
				outline: {
					color: 'text-indigo-600 dark:text-indigo-300',
					border: 'border border-indigo-600',
					hover: 'hover:bg-indigo-600/10',
					ring: 'focus:ring-indigo-600'
				},
				ghost: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent',
					hover: 'hover:bg-indigo-600/10',
					ring: 'focus:ring-indigo-600'
				},
				link: {
					color: 'text-indigo-600 dark:text-indigo-400',
					border: 'border border-transparent'
				}
			},
			dark: {
				solid: {
					bg: 'bg-slate-900',
					color: 'text-slate-50',
					border: 'border border-transparent',
					hover: 'hover:bg-slate-900/80',
					ring: 'focus:ring-slate-900'
				},
				outline: {
					bg: '',
					color: 'text-slate-900',
					border: 'border border-slate-900',
					hover: 'hover:bg-slate-900/10',
					ring: 'focus:ring-slate-900'
				},
				ghost: {
					color: 'text-slate-900',
					border: 'border border-transparent',
					hover: 'hover:bg-slate-900/10',
					ring: 'focus:ring-slate-900'
				},
				link: {
					color: 'text-slate-900',
					border: 'border border-transparent'
				}
			},
			danger: {
				solid: {
					bg: 'bg-rose-600',
					color: 'text-rose-50',
					border: 'border border-transparent',
					hover: 'hover:bg-rose-600/90',
					ring: 'focus:ring-rose-600'
				},
				outline: {
					bg: '',
					color: 'text-rose-600 dark:text-rose-300',
					border: 'border border-rose-600',
					hover: 'hover:bg-rose-600/10',
					ring: 'focus:ring-rose-600'
				},
				ghost: {
					color: 'text-rose-600',
					border: 'border border-transparent',
					hover: 'hover:bg-rose-600/10',
					ring: 'focus:ring-rose-600'
				},
				link: {
					color: 'text-rose-600',
					border: 'border border-transparent'
				}
			},
			warning: {
				solid: {
					bg: 'bg-amber-600',
					color: 'text-amber-50',
					border: 'border border-transparent',
					hover: 'hover:bg-amber-600/90',
					ring: 'focus:ring-amber-600'
				},
				outline: {
					bg: '',
					color: 'text-amber-600 dark:text-amber-300',
					border: 'border border-amber-600',
					hover: 'hover:bg-amber-600/10',
					ring: 'focus:ring-amber-600'
				},
				ghost: {
					color: 'text-amber-600',
					border: 'border border-transparent',
					hover: 'hover:bg-amber-600/10',
					ring: 'focus:ring-amber-600'
				},
				link: {
					color: 'text-amber-600',
					border: 'border border-transparent'
				}
			},
			success: {
				solid: {
					bg: 'bg-emerald-600',
					color: 'text-emerald-50',
					border: 'border border-transparent',
					hover: 'hover:bg-emerald-600/90',
					ring: 'focus:ring-emerald-600'
				},
				outline: {
					bg: '',
					color: 'text-emerald-600 dark:text-emerald-300',
					border: 'border border-emerald-600',
					hover: 'hover:bg-emerald-600/10',
					ring: 'focus:ring-emerald-600'
				},
				ghost: {
					color: 'text-emerald-600',
					border: 'border border-transparent',
					hover: 'hover:bg-emerald-600/10',
					ring: 'focus:ring-emerald-600'
				},
				link: {
					color: 'text-emerald-600',
					border: 'border border-transparent'
				}
			},
			info: {
				solid: {
					bg: 'bg-cyan-600',
					color: 'text-cyan-50',
					border: 'border border-transparent',
					hover: 'hover:bg-cyan-600/90',
					ring: 'focus:ring-cyan-600'
				},
				outline: {
					bg: '',
					color: 'text-cyan-600 dark:text-cyan-300',
					border: 'border border-cyan-600',
					hover: 'hover:bg-cyan-600/10',
					ring: 'focus:ring-cyan-600'
				},
				ghost: {
					color: 'text-cyan-600',
					border: 'border border-transparent',
					hover: 'hover:bg-cyan-600/10',
					ring: 'focus:ring-cyan-600'
				},
				link: {
					color: 'text-cyan-600',
					border: 'border border-transparent',
					hover: 'hover:shadow-b-sm'
				}
			}
		},
		variant: ['solid', 'outline', 'ghost', 'link'] as const
	}
};

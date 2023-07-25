import { cva } from 'class-variance-authority';

export const button = cva(
	'inline-block text-center rounded-lg border-border border transition-all duration-200',
	{
		variants: {
			intent: {
				primary: ['bg-black-jet', 'text-white', 'hover:bg-black-dull'],
				secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
			},
			size: {
				small: ['text-sm', 'py-1', 'px-2'],
				medium: ['text-base', 'py-2', 'px-4'],
				large: ['text-lg', 'py-2', 'px-6']
			}
		},
		defaultVariants: {
			intent: 'primary',
			size: 'medium'
		}
	}
);

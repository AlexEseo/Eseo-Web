// cn: joins CSS class names and resolves Tailwind conflicts. Used by shadcn components.
// It is told our Figma token names (text sizes, radii, shadows), so that, for example,
// "text-button-13" is understood as a size and does not remove the text colour.
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-520', 'display-220', 'display-72', 'display-64', 'display-48', 'display-40',
        'header-32', 'header-24', 'header-20',
        'body-16', 'body-14', 'body-12',
        'label-16', 'label-14', 'label-14-medium', 'label-12',
        'caption-12', 'caption-10',
        'button-16', 'button-15', 'button-13',
      ],
      radius: ['4', '8', '16', '24', '40'],
      shadow: ['card', 'glass-card', 'device', 'chip', 'pricing', 'pricing-hover', 'pricing-selected', 'pricing-selected-hover', 'pricing-focus', 'pricing-selected-focus'],
    },
  },
})

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

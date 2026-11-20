// cn: joins CSS class names and resolves Tailwind conflicts. Used by shadcn components.
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

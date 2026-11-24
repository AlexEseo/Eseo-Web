// Logo: ESEO logomark + wordmark, as in Figma "Logo". Links to the top of the home page.
// The picture is src/assets/logo.svg (brand colours are inside the file).
// Props: href ("/" by default), alt (text for screen readers, from site.json), className.
import logoSrc from '@/assets/logo.svg'
import { cn } from '@/lib/utils'

function Logo({ href = '/', alt, className }) {
  return (
    <a
      href={href}
      data-slot="logo"
      className={cn('inline-flex shrink-0 rounded-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-brand-600', className)}
    >
      <img src={logoSrc} alt={alt} width="127" height="28" />
    </a>
  )
}

export { Logo }

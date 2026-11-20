// Design check: finds raw colours, pixel sizes and hand-set sizes outside src/styles/tokens.css.
// Run: npm run check:design. Add the comment "design-ok" on a line to allow it on purpose.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const skip = [join('src', 'styles', 'tokens.css')]

const rules = [
  { name: 'raw colour', re: /#[0-9a-fA-F]{3,8}\b|\b(rgb|rgba|hsl|hsla|oklch)\(/ },
  { name: 'pixel value', re: /\b\d+(\.\d+)?px\b/ },
  { name: 'hand-set Tailwind value', re: /\b[a-z-]+-\[[^\]]*\d[^\]]*\]/ },
  { name: 'fixed width or height', re: /\b(w|h|min-w|min-h)-(\d+)\b/ },
]

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return files(full)
    return /\.(jsx?|css)$/.test(name) ? [full] : []
  })
}

let count = 0
for (const file of files(join(root, 'src'))) {
  const rel = relative(root, file)
  if (skip.includes(rel)) continue
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (line.includes('design-ok')) return
    for (const rule of rules) {
      if (rule.re.test(line)) {
        count++
        console.log(`${rel}:${i + 1}  ${rule.name}:  ${line.trim()}`)
      }
    }
  })
}

console.log(count ? `\n${count} finding(s). Move these values to tokens.css or explain them.` : 'No findings. All values come from tokens.')
process.exitCode = count ? 1 : 0

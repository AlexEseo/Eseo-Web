// Checks for the "Let's talk" form. Each check returns the key of a specific error message (texts in site.json → form.fields)
// or null when the value is fine. Kept separate from the form so the rules are easy to read and change.

// Public email services: personal addresses, not company ones.
const personalDomains = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.es', 'yahoo.it', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de', 'hotmail.it', 'hotmail.es', 'outlook.com', 'outlook.fr', 'outlook.de',
  'live.com', 'live.co.uk', 'live.fr', 'msn.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com', 'aim.com',
  'proton.me', 'protonmail.com', 'pm.me', 'tutanota.com', 'tuta.io', 'gmx.com', 'gmx.net', 'gmx.de', 'gmx.at', 'gmx.ch', 'web.de',
  't-online.de', 'freenet.de', 'mail.com', 'email.com', 'zoho.com', 'zohomail.com', 'yandex.com', 'yandex.ru', 'ya.ru',
  'mail.ru', 'bk.ru', 'inbox.ru', 'list.ru', 'rambler.ru', 'ukr.net', 'qq.com', '163.com', '126.com', 'sina.com',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'laposte.net', 'sfr.fr', 'libero.it', 'virgilio.it', 'alice.it', 'tiscali.it',
  'btinternet.com', 'sky.com', 'virginmedia.com', 'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net', 'shaw.ca',
  'rogers.com', 'sympatico.ca', 'seznam.cz', 'wp.pl', 'o2.pl', 'interia.pl', 'onet.pl', 'hey.com', 'fastmail.com', 'duck.com',
])

// Temporary ("throwaway") email services.
const disposableDomains = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', '10minutemail.net',
  'tempmail.com', 'temp-mail.org', 'tempmail.net', 'tempmailo.com', 'yopmail.com', 'yopmail.fr', 'trashmail.com',
  'getnada.com', 'nada.email', 'dispostable.com', 'maildrop.cc', 'throwawaymail.com', 'fakeinbox.com', 'mohmal.com',
  'emailondeck.com', 'mintemail.com', 'spamgourmet.com', 'mailnesia.com', 'mytemp.email', 'tempinbox.com', 'burnermail.io',
])

/** Email format: returns null or one of
 * "required" | "spaces" | "missingAt" | "manyAt" | "missingName" | "missingDomain" | "badEnding" | "badCharacters".
 * These stop the form: such an address can't receive a reply. */
export function checkEmail(raw) {
  const value = String(raw ?? '').trim()
  if (!value) return 'required'
  if (/\s/.test(value)) return 'spaces'
  const at = value.split('@').length - 1
  if (at === 0) return 'missingAt'
  if (at > 1) return 'manyAt'
  const [local, domainRaw] = value.split('@')
  const domain = domainRaw.toLowerCase()
  if (!local) return 'missingName'
  if (!domain) return 'missingDomain'
  // Domain needs a dot and an ending of 2+ letters (".com", ".co.uk", ".agency").
  if (!/\.[a-z]{2,}$/i.test(domain)) return 'badEnding'
  // Allowed: letters, digits and . _ % + - before "@"; letters, digits, - and dots in the domain; no double dots or dots at the edges.
  const localOk = /^[a-z0-9._%+-]+$/i.test(local) && !/^\.|\.$|\.\./.test(local)
  const domainOk = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain) && !/(^|\.)-|-(\.|$)/.test(domain)
  if (!localOk || !domainOk) return 'badCharacters'
  return null
}

/** Soft note for a correct address that isn't a company one: null | "personal" | "disposable".
 * It does NOT stop the form (owner's choice: any working email can be sent). */
export function emailNote(raw) {
  const domain = emailDomain(raw)
  if (personalDomains.has(domain)) return 'personal'
  if (disposableDomains.has(domain)) return 'disposable'
  return null
}

/** Name: returns null or one of "required" | "tooShort" | "onlyDigits" | "noLetters" | "notAName" | "tooLong" */
export function checkName(raw) {
  const value = String(raw ?? '').trim().replace(/\s+/g, ' ')
  if (!value) return 'required'
  if (value.length < 3) return 'tooShort'
  if (/^[\d\s]+$/.test(value)) return 'onlyDigits'
  if (!/\p{L}/u.test(value)) return 'noLetters'
  if (/@|https?:|www\./i.test(value)) return 'notAName'
  if (value.length > 80) return 'tooLong'
  return null
}

/** The part after "@", for messages like "addresses at gmail.com". */
export const emailDomain = (raw) => String(raw ?? '').trim().split('@')[1]?.toLowerCase() ?? ''

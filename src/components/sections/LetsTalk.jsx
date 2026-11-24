// LetsTalk: the "Let's talk" form in a window. Figma "Let's talk modal" (State=Form / State=Success, Desktop / Mobile).
// Fields from Figma: name, work email, company website, "What would you like to improve?".
// Checks (src/lib/form-checks.js): name — 3+ characters with letters; email — a correct address.
// Each problem has its own message (site.json → form.fields.*.errors). A personal (Gmail etc.) or temporary address
// is accepted, with a soft grey note under the field (form.fields.email.notes).
// Fields are checked on leaving them (if something was typed) and on submit; an error disappears as soon as the person edits the field.
// Sending: after the checks the request goes to Web3Forms (src/lib/send-form.js, settings in site.json → form).
// While it is sending the button shows a spinner; if sending fails, a coral message appears above the button
// and the filled fields stay, so the person can try again. A hidden trap field (botcheck) stops spam bots.
// Props:
//   text:         site.form (from site.json)
//   open / onOpenChange: whether the window is shown
//   initialStep:  "form" (default) | "success" — only for /styleguide
import { useState } from 'react'
import IconCheckCircle from '@/components/icons/IconCheckCircle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select-field'
import { sendForm } from '@/lib/send-form'
import { checkEmail, checkName, emailDomain, emailNote } from '@/lib/form-checks'

function LetsTalk({ text, open, onOpenChange, initialStep = 'form' }) {
  const [step, setStep] = useState(initialStep)
  const [errors, setErrors] = useState({})
  const [note, setNote] = useState()
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const f = text.fields

  // An error disappears as soon as the person starts fixing the field.
  const clearError = (key) => () => setErrors((old) => (old[key] ? { ...old, [key]: undefined } : old))

  // Turns a check result into the message text.
  const nameError = (v) => f.name.errors[checkName(v)]
  const emailError = (v) => f.email.errors[checkEmail(v)]
  const noteFor = (v) => f.email.notes[emailNote(v)]?.replace('{domain}', emailDomain(v))

  // A field is checked as soon as the person leaves it (only if something was typed).
  const checkOnLeave = (key, toError) => (e) => {
    if (e.target.value.trim()) setErrors((old) => ({ ...old, [key]: toError(e.target.value) }))
    if (key === 'email') setNote(noteFor(e.target.value))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const found = { name: nameError(data.get('name')), email: emailError(data.get('email')) }
    setErrors(found)
    if (Object.values(found).some(Boolean)) return
    setSending(true)
    setSendFailed(false)
    try {
      await sendForm(text, data)
      setStep('success')
    } catch {
      setSendFailed(true)
    } finally {
      setSending(false)
    }
  }

  function handleOpenChange(next) {
    onOpenChange?.(next)
    // Start fresh next time the window opens.
    if (!next) {
      setStep('form')
      setErrors({})
      setNote(undefined)
      setSendFailed(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent closeLabel={text.close} className={step === 'form' ? 'px-5 pt-7 pb-6 md:p-8' : 'items-center px-5 pt-9 pb-6 md:px-8 md:pt-12 md:pb-8'}>
        {step === 'form' ? (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col">
            <DialogTitle className="pr-8 whitespace-pre-line">{text.title}</DialogTitle>
            <div className="mt-5 flex flex-col gap-3 md:mt-8 md:gap-5">
              <Field id="lt-name" label={f.name.label} required error={errors.name}>
                <Input
                  id="lt-name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  placeholder={f.name.placeholder}
                  onChange={clearError('name')}
                  onBlur={checkOnLeave('name', nameError)}
                />
              </Field>
              <Field id="lt-email" label={f.email.label} required error={errors.email} note={note}>
                <Input
                  id="lt-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={f.email.placeholder}
                  onChange={(e) => {
                    clearError('email')()
                    setNote(undefined)
                  }}
                  onBlur={checkOnLeave('email', emailError)}
                />
              </Field>
              <Field id="lt-website" label={f.website.label}>
                <Input id="lt-website" name="website" type="url" autoComplete="url" placeholder={f.website.placeholder} />
              </Field>
              <Field id="lt-goal" label={f.goal.label}>
                <SelectField id="lt-goal" name="goal" options={f.goal.options} defaultValue={f.goal.options[0]} />
              </Field>
            </div>
            {/* Trap for spam bots: hidden from people and screen readers, bots tick it */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {sendFailed && (
              <p role="alert" className="mt-6 text-body-12 text-coral-500">
                {text.sendError}
              </p>
            )}
            <Button type="submit" variant="primary" size="l" loading={sending} className={sendFailed ? 'mt-4 w-full' : 'mt-12 w-full'}>
              {text.submit}
            </Button>
            <p className="mt-6 text-center text-body-12 text-gray-500">{text.note}</p>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-50">
                <IconCheckCircle width="36" height="36" className="text-brand-600" />
              </span>
              <DialogTitle className="whitespace-pre-line">{text.success.title}</DialogTitle>
              <DialogDescription>{text.success.body}</DialogDescription>
            </div>
            <Button variant="white" className="mt-14 w-full px-4 md:w-auto" onClick={() => handleOpenChange(false)}>
              {text.success.back}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { LetsTalk }

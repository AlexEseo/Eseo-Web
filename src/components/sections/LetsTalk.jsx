// LetsTalk: the "Let's talk" form in a window. Figma "Let's talk modal" (State=Form / State=Success, Desktop / Mobile).
// Fields from Figma: name, work email, company website, "What would you like to improve?".
// NOT CONNECTED YET: "Preview my request" only checks the fields and shows the "Thanks" screen.
// Sending to Web3Forms (site.form.endpoint + accessKey) is added later, when the owner sends the key.
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

const emailLooksRight = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function LetsTalk({ text, open, onOpenChange, initialStep = 'form' }) {
  const [step, setStep] = useState(initialStep)
  const [errors, setErrors] = useState({})
  const f = text.fields

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const found = {}
    if (!name) found.name = f.name.required
    if (!email) found.email = f.email.required
    else if (!emailLooksRight(email)) found.email = f.email.invalid
    setErrors(found)
    if (Object.keys(found).length) return
    // Web3Forms sending goes here later.
    setStep('success')
  }

  function handleOpenChange(next) {
    onOpenChange?.(next)
    // Start fresh next time the window opens.
    if (!next) {
      setStep('form')
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent closeLabel={text.close} className={step === 'form' ? 'px-5 pt-7 pb-6 md:p-8' : 'items-center px-5 pt-9 pb-6 md:px-8 md:pt-12 md:pb-8'}>
        {step === 'form' ? (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col">
            <DialogTitle className="pr-8 whitespace-pre-line">{text.title}</DialogTitle>
            <div className="mt-5 flex flex-col gap-3 md:mt-8 md:gap-5">
              <Field id="lt-name" label={f.name.label} error={errors.name}>
                <Input id="lt-name" name="name" autoComplete="name" placeholder={f.name.placeholder} />
              </Field>
              <Field id="lt-email" label={f.email.label} error={errors.email}>
                <Input id="lt-email" name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} />
              </Field>
              <Field id="lt-website" label={f.website.label}>
                <Input id="lt-website" name="website" type="url" autoComplete="url" placeholder={f.website.placeholder} />
              </Field>
              <Field id="lt-goal" label={f.goal.label}>
                <SelectField id="lt-goal" name="goal" options={f.goal.options} defaultValue={f.goal.options[0]} />
              </Field>
            </div>
            <Button type="submit" variant="primary" size="l" className="mt-12 w-full">
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

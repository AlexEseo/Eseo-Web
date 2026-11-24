// sendForm: sends the "Let's talk" request to Web3Forms (a form service: it emails the request to the owner).
// Settings come from site.json → form: endpoint, accessKey (public key, safe to keep in the site), subject.
// Returns when the request was accepted; throws an error if it was not (no internet, service problem, bad key).
export async function sendForm(form, data) {
  const body = {
    access_key: form.accessKey,
    subject: form.subject,
    from_name: form.fromName,
    name: data.get('name'),
    email: data.get('email'),
    website: data.get('website') || '',
    goal: data.get('goal') || '',
    botcheck: data.get('botcheck') ? true : '', // hidden trap field: real people never tick it, spam bots do
  }
  const response = await fetch(form.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || !result.success) throw new Error(result.message || `Form service answered ${response.status}`)
}

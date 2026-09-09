/**
 * Unit tests for business email validation.
 * Run: node helpers/businessEmail.test.js
 */
const assert = require('assert')
const {
  validateBusinessEmail,
  isBusinessEmail,
  isPersonalOrFreeEmailDomain,
  BUSINESS_EMAIL_ERROR,
} = require('./businessEmail')

function expectOk(email) {
  const result = validateBusinessEmail(email)
  assert.strictEqual(result.ok, true, `expected valid: ${email} -> ${JSON.stringify(result)}`)
}

function expectFail(email, messageIncludes) {
  const result = validateBusinessEmail(email)
  assert.strictEqual(result.ok, false, `expected invalid: ${email}`)
  if (messageIncludes) {
    assert.ok(
      String(result.error || '').includes(messageIncludes),
      `expected error to include "${messageIncludes}", got "${result.error}"`
    )
  }
}

// VALID business emails
expectOk('john@company.com')
expectOk('sales@abc.in')
expectOk('user@company.co.uk')
expectOk('contact@business.org')
expectOk('  user@AcmeCorp.com  ')
expectOk('user@gmail.company.com') // "gmail" in subdomain of company — allowed

// INVALID personal emails
expectFail('user@gmail.com', 'business email')
expectFail('user@yahoo.com', 'business email')
expectFail('user@hotmail.com', 'business email')
expectFail('user@outlook.com', 'business email')
expectFail('user@icloud.com', 'business email')
expectFail('user@rediffmail.com', 'business email')
expectFail('USER@GMAIL.COM', 'business email')
expectFail('user@Gmail.com', 'business email')
expectFail('user@yahoo.co.in', 'business email')
expectFail('  user@gmail.com  ', 'business email')
expectFail('name@mail.yahoo.com', 'business email')
expectFail('user@googlemail.com', 'business email')
expectFail('user@live.com', 'business email')
expectFail('user@protonmail.com', 'business email')

// Format / empty
expectFail('', 'required')
expectFail('not-an-email', 'invalid')
expectFail('user@', 'invalid')
expectFail('@company.com', 'invalid')

assert.strictEqual(isBusinessEmail('ok@refex.co.in'), true)
assert.strictEqual(isBusinessEmail('bad@gmail.com'), false)
assert.strictEqual(isPersonalOrFreeEmailDomain('gmail.com'), true)
assert.strictEqual(isPersonalOrFreeEmailDomain('company.com'), false)
assert.ok(BUSINESS_EMAIL_ERROR.length > 20)

// Simulates API route custom validator rejection for direct Gmail submission
function assertApiRejectsPersonalEmail(email) {
  const result = validateBusinessEmail(email)
  assert.strictEqual(result.ok, false)
  assert.strictEqual(result.error, BUSINESS_EMAIL_ERROR)
}
assertApiRejectsPersonalEmail('user@gmail.com')
assertApiRejectsPersonalEmail('USER@YAHOO.COM')

console.log('businessEmail.test.js: all assertions passed')

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const page = await readFile(new URL('../src/RequirementPlatformLanding.jsx', import.meta.url), 'utf8')
const styles = await readFile(new URL('../src/RequirementPlatformLanding.css', import.meta.url), 'utf8')
const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')

assert.match(page, /fetch\(`\/api\/sourcing-requests\?\$\{query\}`/)
assert.match(page, /requirementsGrid/)
assert.match(page, /Live hiring opportunities/)
assert.doesNotMatch(page, /Recruiters &amp; HR|Post a Requirement|Join network|rpMarketplaceSidebar|rpMarketplaceTopbar/)
assert.doesNotMatch(page, /<main/)
assert.match(styles, /var\(--text-primary\)/)
assert.match(styles, /linear-gradient\(180deg, #07101f/)
assert.match(styles, /@media \(max-width: 680px\)/)
assert.doesNotMatch(app, />Candidate Sourcing<\/Link>/)
assert.match(app, /href="\/requirement-platform">Requirements<\/Link>/)

console.log('Requirements-only page validation passed.')

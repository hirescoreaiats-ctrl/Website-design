import assert from 'node:assert/strict'
import { buildJobPostingSchema, buildJobSeo, categoriesForJob, preparePublicJobs } from '../src/jobSeo.js'

const source = {
  id: 'job-12345678',
  title: 'Data Analyst',
  company_name: 'Techno',
  company_website: 'https://example.com',
  department: 'Engineering',
  location: 'Noida',
  work_mode: 'Remote',
  employment_type: 'Full Time',
  salary_range: '₹4 LPA',
  experience_required: 'Fresher / 0-2 Years',
  primary_skills: ['SQL', 'Excel', 'Power BI'],
  secondary_skills: ['Python'],
  description: 'About the Role\nAnalyze business data.\nKey Responsibilities\nCreate dashboards and reports.\nRequired Skills\nStrong SQL and Excel.\nEducation\nBachelor degree in a related field.\nExperience\n0-2 years.',
  application_deadline: '2026-09-05',
  published_at: '2026-08-23T09:12:25Z',
  apply_url: 'https://api.hirescoreai.com/apply/data-analyst-techno-job1234',
}

const [job] = preparePublicJobs([source])
assert.equal(job.seo_slug, 'data-analyst-noida')
assert.equal(job.canonical_path, '/jobs/data-analyst-noida')
assert.ok(job.categories.includes('it-jobs'))
assert.ok(categoriesForJob({ title: 'Sales Executive', description: 'Outbound calling and customer sales' }).includes('sales-jobs'))

const seo = buildJobSeo(job)
assert.equal(seo.canonical, 'https://hirescoreai.com/jobs/data-analyst-noida/')
assert.match(seo.title, /Data Analyst Jobs in Noida/)
assert.match(seo.description, /Techno is hiring/)

const schema = buildJobPostingSchema(job)
assert.equal(schema['@type'], 'JobPosting')
assert.equal(schema.title, 'Data Analyst')
assert.equal(schema.hiringOrganization.name, 'Techno')
assert.equal(schema.jobLocationType, 'TELECOMMUTE')
assert.deepEqual(schema.applicantLocationRequirements, { '@type': 'AdministrativeArea', name: 'Noida' })
assert.equal(schema.employmentType, 'FULL_TIME')
assert.equal(schema.directApply, true)
assert.equal(schema.validThrough, '2026-09-05T00:00:00.000Z')
assert.match(schema.responsibilities, /Create dashboards/)
assert.match(schema.qualifications, /Strong SQL/)
assert.match(schema.educationRequirements, /Bachelor degree/)
assert.equal('baseSalary' in schema, false, 'unparsed salary must not be invented in structured data')

const collisions = preparePublicJobs([source, { ...source, id: 'job-87654321', company_name: 'Another Company' }])
assert.notEqual(collisions[0].seo_slug, collisions[1].seo_slug)
assert.notEqual(buildJobSeo(collisions[0]).title, buildJobSeo(collisions[1]).title)

console.log('Public jobs SEO validation passed.')

const test = require('tape')
const proxyquire = require('proxyquire')
const issuesMock = require('./fixtures/issues.json')

const GithubMock = {
  getIssues: function () {
    return { listIssues: function () {
      return Promise.resolve({ data: issuesMock })
    }}
  }
}

const getPullRequests = proxyquire('../lib/pr', {
  './github': GithubMock
})

test('exports function', (t) => {
  t.equals(typeof getPullRequests, 'function')
  t.end()
})

test('when called correctly returns only pull requests', (t) => {
  t.plan(1)
  const user = ''
  const repo = ''
  const labels = 'needs review'

  getPullRequests(user, repo, labels)
    .then((issues) => {
      t.equals(issues.length, 2)
    })
})

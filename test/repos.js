const test = require('tape')
const proxyquire = require('proxyquire')
const reposMock = require('./fixtures/repos.json')

const GithubMock = {
  getUser: function () {
    return { listRepos: function () {
      return Promise.resolve({ data: reposMock })
    }}
  }
}

const getUserRepos = proxyquire('../lib/repos', {
  './github': GithubMock
})

test('exports function', (t) => {
  t.equals(typeof getUserRepos, 'function')
  t.end()
})

test('when called correctly returns only user repos', (t) => {
  t.plan(3)
  const user = 'rogeriopvl'

  getUserRepos(user)
    .then((repos) => {
      t.equals(repos.length, 2)
      t.equals(repos[0].name, 'Hello-World')
      t.equals(repos[1].name, 'Hello-World-2')
    })
})

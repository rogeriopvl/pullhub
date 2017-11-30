const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const pullhubStub = sinon.stub().callsFake(() => {
  return Promise.resolve([])
})

const getUserReposStub = sinon.stub().callsFake(() => {
  return Promise.resolve(['rogeriopvl/pullhub'])
})

const cli = proxyquire('../lib/cli', {
  '../': pullhubStub,
  './repos': getUserReposStub
})

test('when passing a repo it calls pullhub as expected', (t) => {
  t.plan(1)

  cli({ _: ['user/somerepo'] })

  t.ok(pullhubStub.calledWith(['user/somerepo']))
})

test('when passing --user it calls getUserRepos', (t) => {
  t.plan(1)

  cli({ user: 'rogeriopvl' })

  t.ok(getUserReposStub.calledWith('rogeriopvl'))
})

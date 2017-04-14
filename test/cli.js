const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

test('when passing a repo it calls pullhub as expected', (t) => {
  t.plan(1)

  const pullhubStub = sinon.stub().callsFake(() => {
    return Promise.resolve([])
  })
  const cli = proxyquire('../lib/cli', { '../': pullhubStub })

  cli({ _: ['user/somerepo'] })

  t.ok(pullhubStub.calledWith(['user/somerepo']))
})

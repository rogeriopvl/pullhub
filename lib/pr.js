const gh = require('./github')

module.exports = function getPullRequests (user, repo, labels) {
  const remoteIssues = gh.getIssues(user, repo)
  return remoteIssues.listIssues({ labels })
    .then((resp) => {
      return resp.data.filter((repo) => repo.pull_request)
    })
    .catch((err) => {
      // this kinda sucks because github-api gives a
      // "cannot read property 'status' of undefined" when network is
      // unreachable, so we have to catch that TypeError.
      if (err instanceof TypeError) {
        throw new Error('Could not contact Github. Are you offline?')
      } else { throw err }
    })
}

const config = require('./config')
const Github = require('github-api')

let gh = false

function github () {
  gh = new Github({ token: config.githubToken })
}

module.exports = function getPullRequests (user, repo, labels) {
  if (!gh) { github() }

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

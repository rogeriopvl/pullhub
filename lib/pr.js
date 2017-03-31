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
}

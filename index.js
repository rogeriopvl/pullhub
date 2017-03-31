const getPullRequests = require('./lib/pr')
const _flatten = require('lodash.flatten')

/**
 * Get a list of pull requests for all configured repos.
 *
 * @param {Array} repos - list of repos.
 * @param {string} labels - (optional) comma separared labels to filter PRs.
 * @param {Function} cb - (optional) callback function.
 *
 * @return {Promise} - a promise that resolves to the list of PRs.
 */
module.exports = function getAllPullRequests (repos, labels, cb) {
  if (typeof labels === 'function' && !cb) {
    cb = labels
    labels = undefined
  }

  const promises = repos.map((repo) => {
    const [ repoUser, repoName ] = repo.split('/')
    return getPullRequests(repoUser, repoName, labels)
      .then((issues) => {
        return issues
      })
  })

  return Promise.all(promises).then((values) => {
    const prs = _flatten(values)

    return typeof cb !== 'undefined' ? cb(undefined, prs) : prs
  }).catch((err) => {
    if (typeof cb !== 'undefined') {
      return cb(err)
    } else { throw err }
  })
}

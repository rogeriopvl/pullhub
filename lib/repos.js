const gh = require('./github')

module.exports = function getUserRepos (username) {
  const user = gh.getUser(username)
  return user.listRepos()
    .then((resp) => resp.data)
    .catch((err) => {
      if (err instanceof TypeError) {
        throw new Error('Could not contact Github. Are you offline?')
      } else { throw err }
    })
}

const pullhub = require('../')
const getUserRepos = require('./repos')
const meta = require('../package.json')

module.exports = function (args) {
  if (args.help) {
    showUsage()
    process.exit(0)
  } else if (args.version) {
    showVersion()
    process.exit(0)
  } else if (args.user) {
    const labels = args.labels

    getUserRepos(args.user)
      .then((repos) => {
        const parsedRepos = repos
          .filter((repo) => repo.owner.login === args.user)
          .map((repo) => repo.full_name)
        return pullhub(parsedRepos, labels)
      })
      .then(outputFormatter)
      .catch(errorFormatter)
  } else if (args._.length < 1) {
    showUsage()
    process.exit(-1)
  } else {
    const repos = args._
    const labels = args.labels

    pullhub(repos, labels)
      .then(outputFormatter)
      .catch(errorFormatter)
  }
}

function showUsage () {
  console.log(meta.name + ' <repos> [--labels] [--version] [--help]\n')
  console.log(
    '\t<repos>            space separated repos in the user/repo format'
  )
  console.log('\t--user <username>  get all repos for given username')
  console.log('\t--labels           comma separated labels to filter PRs by')
  console.log('\t--version          show version info')
  console.log('\t--help             show this usage info')
}

function showVersion () {
  console.log(meta.name + ' version ' + meta.version)
}

function outputFormatter (prs) {
  prs.map(pr => {
    console.log('#' + pr.number + ' ' + pr.title + ' | ' + pr.html_url)
  })
}

function errorFormatter (err) {
  console.log('Error: ', err.message)
}

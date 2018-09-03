# pullhub [![Build Status](https://travis-ci.org/rogeriopvl/pullhub.svg?branch=master)](https://travis-ci.org/rogeriopvl/pullhub)

[![Greenkeeper badge](https://badges.greenkeeper.io/rogeriopvl/pullhub.svg)](https://greenkeeper.io/)

## About

Pullhub is a cli and lib tool that lists all pull requests from one or more repos. It supports filtering by label.

## Install

    npm install --save pullhub

## Authentication

Pullhub authenticates the user via a github token. To get your token visit this [github help page](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

For public repos the token is optional but recommended. Private repos need token to enable access.

You can set the token in your shell enviroment, just add to your `.bashrc`, `.zshrc` etc. the following line:

    export GH_TOKEN=mypersonaltoken

This will work for both cli and lib usage.

## Cli usage

```shell
pullhub <repos> [--labels] [--version] [--help]

  <repos>            space separated repos in the user/repo format
  --user <username>  search all repos for given username
  --labels           comma separated labels to filter PRs by
  --version          show version info
  --help             show this usage info
```

### Examples

- Get all open pull requests from two repos

```shell
pullhub user/repo1 user/repo2
```

- Get all open pull requests labeled "needs review" from two repos

```shell
pullhub user/repo1 user/repo2 --labels "needs review"
```

- Get all open pull requests labeled "in progress" and "reviewed" from one repo

```shell
pullhub user/repo1 --labels "in progress,reviewed"
```

- Get all open pull requests from all the repos of a user

```shell
pullhub --user rogeriopvl
```

## Lib usage

You can use pullhub as a library, and what it will allow you to get all PRs in given repositories with given labels.

You can use promises:

```javascript
const pullhub = require('pullhub')

pullhub(['rogeriopvl/http.cat'], 'needs review,reviewed')
  .then((prs) => console.log(prs))
  .catch(err) => console.error(err)
```
Or callbacks:

```javascript
const pullhub = require('pullhub')

pullhub(['rogeriopvl/http.cat'], 'needs review', function (err, repos) {
  console.log(err, repos)
})
```

# PR Police

## Install

    npm install --save pr-police

## Cli usage

Soon...

## Lib usage

You can use PR Police as a library, and what it will allow you to get all PRs in given repositories with given labels.

You can use promises:

```javascript
const getAllPullRequests = require('pr-police')

getAllPullRequests(['rogeriopvl/http.cat'], 'needs review,reviewed')
  .then((prs) => console.log(prs))
  .catch(err) => console.error(err)
```
Or callbacks:

```javascript
const getAllPullRequests = require('pr-police')

getAllPullRequests(['rogeriopvl/http.cat'], 'needs review', function (err, repos) {
  console.log(err, repos)
})
```

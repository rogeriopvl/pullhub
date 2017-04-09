# pullhub

## Install

    npm install --save pullhub

## Cli usage

Soon...

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

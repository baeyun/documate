# Getting Started

Documate is a simple _static documentation generator_ that renders your Markdown files
into a beautiful HTML site that you could then deploy to a server or some serverless
cloud.

```javascript
import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

```

# Installation

To be able to use Documate, you just have to install it globally:

```
$ npm install -g documate
  # or
$ yarn add documate --global
```

# Usage

The basic commands include:

```bash
# Create an empty project
$ documate init my-cool-docs

# Run your awesome docs (run from project root)
$ documate start

# Build your docs (run from project root)
$ documate build
```

Your docs should appear in the `./documate/` folder. You can reference any Markdown file to
include in your docs. Just don't edit any file/folder that is created during runtime.

## The `nav.md` file

Okay. So this is your main file you'll be referencing quite much. It is so simple to say that it's
just but a tweakable (fully-responsive) navbar that is docked to the left side of your screen. It's
a list of Markdown links that could point to any given URL. Sweet right?

Furthermore, only links that have been interacted with will load particular content (we call _partials_ - long story why we called it such) at a time. If your user's browser is smart enough to cache fetched content, they are gonna have an excellent experience.

## Offline capabilities? (PWA strategies, service workers, etc)

Implementing `ServiceWorker` is a priceless feature we will be adding soon. Keep up with the updates and
your site will be given offline support (on user-prompt included as well)!

## Deploying

This feature is yet to come. Please support us to have this feature ready in sooner.

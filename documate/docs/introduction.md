# Welcome to Documate v0.1.0

Documate is a minimal static site generator for docs that takes your Markdown-based code and
outputs a beautiful site (like this). The reason for using Markdown is simply because HTML-based
docs (JSX, EJS, etc as well) seem to be cluttery with all the unnecessary tags that remove
brevity and make readability a pain.

![Balshazzar](./img/balshazzar.png)

Another bonus of using Markdown is that any GitHub docs of your previous projects (in Markdown)
can be put into a site with Documate. All you need is to run two commands and then you deploy.
Although Documate can't deploy your builds for you, your builds are made production-ready and
your readers can enjoy reading along.

## Features

- **Markdown-only** - You can embed HTML content in your Markdown files as usual
- **Minimal** - Documate is not opinionated about how you lay out or format your docs. In any case,
  it knows how to transpile your Markdown 1-1 to HTML.
- **Responsive** - Your site will look stunningly responsive and immersive across different viewports
- **Blazing fast serving** - Run `documate start` and view your docs locally in no time
- **Production-ready builds** - Your builds are minified and scripts uglified. Thanks to [ParcelJS](https://parceljs.org/)

> Note
>
> Documate doesn't generate docs or static content from code comments. Instead, you can copy and paste your docs into Markdown with a few tweaks and your site should be ready in no time.

## Code Demo

The demo below tries to show how cool [Documate](/) code tags appear. We use [HighlightJS](/)

```jsx
import { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Without much further to say, [let's get started](/getting-started)!

Made with ❤ by [@bukharim96](https://twitter.com/bukharim96) and [@undefinedbuddy](https://twitter.com/undefinedbuddy).

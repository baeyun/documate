<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/bukharim96/documate/master/documate/public/favicons/android-icon-144x144.png" alt="Documate Logo" />
</p>

<h1 align="center">Documate</h1>
<p align="center"><i>Converting your Markdown-docs into a fancy React-ish site.</i></p>

Documate is a minimal static site generator that takes your Markdown-based code and outputs a whimsy React-ish site.

## Short history

So we've been working on some Open Source projects and after all the struggles, we decided to have a website. Consequently, we needed to maintain the site somehow and we found it to be very clumsy and caused us a lot of maintainability issues. That aside, how could we possibly cater for different viewports? We thought of trying [Docusaurus](https://docusaurus.io/) and/or other similar tools but they never met the standards of accessibility we needed.

Eventually, we decided to make a new static site generator that uses [Bootstrap 4](https://getbootstrap.com/) (for the base layout), [Create React App v2.1.2](https://github.com/facebook/create-react-app/releases/tag/v2.1.2) (ejected) and bit of [React's official site]() UI.

## Why Markdown?

The reason for using Markdown is simply because docs written in HTML, JSX, Handlebars or any other markup that uses angle brackets seem to be cluttery with all the unnecessary tags that remove brevity and make readability a pain. Documate puts developer experience into consideration.

Another bonus of using Markdown is that any GitHub docs of your previous projects (in Markdown) can be put into a site with Documate.

All you need is to run two commands and then you deploy. Although Documate can't deploy your builds for you, your builds are made production-ready and your readers can enjoy reading along.

## Features

- **Markdown-only** - Access to full routes based on your folder layout is granted by default. These URLs trigger a helper function that fetches your docs on demand. You can embed HTML content in your Markdown files as usual. You can also link to HTML files which are fetched as stringified partials.
- **Code-Splitting** - Your docs are made to load much more efficiently by using ES6 dynamic `import()` with [webpack](https://webpack.js.org/).
- **Minimal** - Documate is not opinionated about how you lay out or format your docs. In any case, it knows how to transpile your Markdown/HTML 1-1 to HTML.
- **Responsive** - Your site will look stunningly responsive and immersive across different viewports and will inherently get a React-ish feel.
- **Blazing fast serving** - Run `documate start` and view your docs locally in no time. Check Documate's [README.md](https://github.com/bukharim96/documate) for more details on dependency versions.
- **Production-ready builds** - Your builds are minified and scripts uglified for good.

> Note
>
> Documate doesn't generate docs or static content from code comments. Instead, you can copy and paste your code comments into Markdown with a few formattings and your docs should ready to get *documated*.
> Please read the [Components](/docs/components) to enable Documate to render your docs properly.

Without much further to say, [let's get started](/getting-started)!

Made with ❤ by [@bukharim96](https://twitter.com/bukharim96) and [@undefinedbuddy](https://twitter.com/undefinedbuddy). If you liked Documate, consider buying us a cup of coffee.

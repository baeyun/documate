# Representing docs in the sidebar

For your docs to be available in your site, you need to tell Documate where it should be placed and Documate will handle all the routes, placements, accordion states, etc.

If you navigate to `/documate/navs.js`, you will encounter a structure like this:

```javascript
/**
 * Documate navigation
 */

module.exports = {
  TOPNAV: {
    Home: "./index.html",
    Docs: "./docs/"
  },
  DOCS: {
    Introduction: "./docs/introduction.md",
    "Getting Started": {
      Installation: "./docs/getting-started/installation.md",
      "Creating your first project":
        "./docs/getting-started/creating-your-first-project.md",
      Configuration: "./docs/config.md",
      "Connecting your docs": "./docs/config.md"
    },
    Components: "./docs/components.md",
    Contributing: "./docs/contributing.md"
  }
};
```

> Note
>
> None of these fields are required.

This structure is what will define how your docs will be placed. Meaning, you cannot have a link to a file which isn't listed in the `navs.js` file. Furthermore, the general layout would be something of this sort:

```javascript
module.exports = {
  TOPNAV: {
    NavItemTitle: "/link/to/html/file-or-slug.html"
  },
  DOCS: {
    DocItemName: 'link/to/markdown/or/html/file.md'
  }
};
```

## The `TOPNAV` property

The `TOPNAV` property is an object that contains a *key-value* representation of what would appear in the navbar on top. The key of this property defines the text that will be displayed in the navbar on top. The value of this property must point to either:

- A local HTML file that exists on your disk, or
- A complete/relative URL link (i.e. `https://google.com` and `./my-docs/my-api/my-func` are all possible).

This is how it should appear in your `navs.js` file:

```javascript
TOPNAV: {
    "My Blog": "./blog.html",
    "Some Twitter Link": "https://twitter.com/undefinedbuddy/"
}
```

> Note
>
> If your key needs a space in between characters, wrap it in a string (JavaScript object keys are strings)

## The `DOCS` property

The `DOCS` property is an object that represents the contents of the sidebar. The key of this property is the text that will be displayed in the sidebar. The value of this property must point to either:

- A local Markdown file that exists on your disk, or
- A local HTML file that exists on your disk.

This is how it should appear in your `navs.js` file:

```javascript
DOCS: {
    "Welcome to My App": "./link/to/my/welcome-page.html",
    "Integrating with webpack": "./link/to/my/cool/pages/webpack.md"
}
```

> Note
>
> 1. In both `TOPNAV` and `DOCS`, you must define proper values to your keys.
> 2. For a custom sidebar, you can contribute to Documate to support features like:
>
>   - Alignment of the sidebar to the left
>   - Expand all accordions
>   - Sidebar dropdown button to appear in the topbar (on mobile)
>   - Remove accordion feature from the sidebar

Check the next section to make a quick build of your docs.

# Documate `config` file

The configuration file contains a few settings that can help you change the feel and behaviour of your app. Feel free to mess around with it. You can find it in the `/documate/config.js` file (relative to your project's root path).

You might've noticed that there is a config file in your project's documate folder. This file will define some parts of your app that are open to changes. That includes the title, logo, repository URL (all version control managers supported. You can even have a custom link), theme, etc.

A typical Documate config would look something like this:

```javascript
/**
 * Documate site settings
 */

module.exports = {
  // Website's HTML title tag value
  title: "Documate",

  // Path to site logo, this will be placed in the Topbar
  logo: "./logo.png",

  // Topbar and (documentation's) Sidebar navigation links
  navs: require("./navs"),

  // GitHub repository
  repoUrl: "http://github.com/bukharim96/documate",

  // Main theme colors
  themeColors: {
    primary: "#61dafb",
    secondary: "#20232a"
  },

  // Syntax highlighting theme in code blocks
  // Check [https://documate.netlify.com/docs/config] for more themes
  codeBlockTheme: "default",
  
  // This will apear in the footer throughout the site
  footerContent: `Copyright ${new Date().getFullYear()}`
};

```

### config.title

This is the title of your docs that you'll be seeing across all pages of your docs. It is dynamic so make sure not to edit your app's title from Create React App's `/public/index.html` file.
  
```javascript
title: "Documate"
```

### config.logo

This property defines the site's logo path which is placed in the navbar on top, just before your site's name.

```javascript
logo: "./logo.png"
```

### config.navs

Defines the layout for the links in the sidebar. Also responsible for introducing/removing docs into/from your site. For more details on the `navs` object, [check this link](/docs/navs).

```javascript
navs: require("./navs")
```

### config.repoUrl

Link to your projects's repository. It could be GitHub, GitLab, BitBucket or just a custom link since no interactions with external APIs are made.

```javascript
repoUrl: "https://github.com/my-username/that-awesome-documate-project"
```

### config.themeColors

Defines the theme of your app. It has a `primaryColor` and `secondaryColor` properties which indicate the base and secondary color schemes respectively. By default, the React theme uses `#61dafb` and `#20232a` as primary and secondary colors and your site is configured that way by default. The value provided to any of these fields must be a string representation of any standard CSS color format (`hex`, `rgb`, `hsl`, etc).

```javascript
themeColors: {
  primary: "#61dafb",
  secondary: "#20232a"
}
```

### config.codeBlockTheme

Syntax highlighting theme in code blocks. The name must match one of [Prism's](https://prismjs.com/) official themes or a custom theme. In our case, we modified the [Tomorrow Night](https://prismjs.com/index.html?theme=prism-tomorrow) theme to match React's site code block theme. 

```javascript
codeBlockTheme: "coy"
```

The following values are possible: `default`, `coy`, `dark`, `funky`, `okaidia`, `solarizedlight`, `tomorrow`, `twilight`, `prism`.

### config.footerContent

The footer content will appear throughout every page of the site.

```javascript
footerContent: `Copyright ${new Date().getFullYear()}`
```

> Tip
>
> Ideally, if your footer grows larger (with all the Bootstrap classes, inline styles etc) it would be in your
> best interest to place the content in a different file (as `/documate/footer.html` for instance) and read it
> synchronously.
>

If you have any issues, feel free to file an issue or submit a Pull Request for an update approval.

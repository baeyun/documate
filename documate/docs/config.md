# Documate `config`

### config.title

Website's HTML title tag value.
  
  `title: "Documate"`

### config.logo

Path to site logo, this will be placed in topbar.

  `logo: "./logo.png"`

### config.navs

Topbar and (documentation's) Sidebar navigation links.

  `navs: require("./navs")`

### config.repoUrl

Link to projects's GitHub repository.

  `repoUrl: "https://github.com/{USERNAME/ORG}/{PROJECT}"`

### config.theme

Main theme colors.

```javascript
theme: {
  primaryColor: "#20232a",
  secondaryColor: "#61dafb"
}
```

### config.codeBlockTheme

Syntax highlighting theme in code blocks.

  `codeBlockTheme: "coy"`

The following values are possible: `default`, `coy`, `dark`, `funky`, `okaidia`, `solarizedlight`, `tomorrow`, `twilight`, `prism`

### config.footerContent

This will apear in the footer throughout the site.

```javascript
footerContent: `<div style="color: #fff; text-align: center;">&copy; Copyright ${new Date().getFullYear()}</div>`
```

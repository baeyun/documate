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
    primary: "#e966ff",
    secondary: "#460950"
  },

  // Syntax highlighting theme in code blocks
  // Check [https://documate.netlify.com/docs/config] for more themes
  codeBlockTheme: "default",
  
  // This will apear in the footer throughout the site
  footerContent: `
  <div style="color: #fff;text-align: left;">
    Made with <span style="color: #ff6398;">❤</span> by <a 
    style="color: #61dafb" href="https://twitter.com/bukharim96">@bukharim96</a> and <a 
    style="color: #61dafb" href="https://twitter.com/undefinedbuddy">@undefinedbuddy</a> <a class="github-button" href="https://github.com/bukharim96/documate" data-icon="octicon-star" data-show-count="true" aria-label="Star bukharim96/documate on GitHub">Star</a>
  </div>`
};

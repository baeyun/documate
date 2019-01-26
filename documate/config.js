/**
 * Documate site settings
 */

module.exports = {
  // Website's HTML title tag value
  title: "Documate",
  
  // Path to site logo, this will be
  // placed in topbar
  logo: "./logo.png",
  
  // Topbar and (documentation's) Sidebar
  // navigation links
  navs: require("./navs"),
  
  // GitHub repository
  repoUrl: "http://github.com/bukharim96/documate",
  
  // Main theme colors
  theme: {
    primaryColor: "#20232a",
    secondaryColor: "#61dafb"
  },
  
  // Syntax highlighting theme in code
  // blocks. Check [https://prismjs.com/]
  // for more themes
  codeBlockTheme: "coy",
  
  // This will apear in the footer
  // throughout the site
  footerContent: `<div style="color: #fff; text-align: center;">&copy; Copyright ${new Date().getFullYear()}</div>`
};

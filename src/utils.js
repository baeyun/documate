module.exports = {
  pathToUri: path => {
    let match = path.match(/[\.]?[\/]?(.*)\.\w+$/);
    if (match && match[1] === "index") return "/";
    return match && match[1] ? "/" + match[1] : null;
  },
  titleCase: title =>
    title
      .split(/[\-\s]/g)
      .map(word => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
      .join(" "),
  loadCodeLanguages: codeLangs => {
    for (let i = 0; i < codeLangs.length; i++) {
      let lang = codeLangs[i];
      let script = document.createElement("script");

      script.type = "text/javascript";
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-${lang}.min.js`;
      document.head.appendChild(script);
    }
  }
};

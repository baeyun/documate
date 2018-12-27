// Check 'hashchange' on window load as well
window.addEventListener("load", urlStateChange);

function urlStateChange(e) {
  hljs.initHighlighting();

  if (!location.hash) {
    // Handle appropriately
    return;
  }

  var hashLink = location.hash.split("#")[1];

  // Permalink Routing
  if (hashLink.indexOf("~") > -1) {
    // Make its partial active first
    var partialID =
      urlRewriteMap[
        hashLink
          .split("~")[0]
          .split("")
          .splice(1)
          .join("")
      ];

    // If partial not active, fetch it
    if (!document.getElementById(partialID)) {
      var partialLink = hashLink
        .split("~")[0]
        .split("")
        .splice(1)
        .join("");

      fetchPartial(urlRewriteMap[partialLink]);

      // @undefinedbuddy still working on making
      // permalinks scroll into view on page load
      window.CHECK_PARTIAL_LOADED = setInterval(function() {
        var currentPartial = document.getElementById(
          urlRewriteMap[partialLink]
        );

        if (currentPartial) {
          var permalinkElements = currentPartial.querySelectorAll(
            "[data-path]"
          );

          document
            .querySelector("#main-content > div.content.active")
            .classList.remove("active");
          currentPartial.classList.add("active");

          permalinkElements.forEach(function(permalinkElement) {
            if (permalinkElement.getAttribute("data-path") === hashLink) {
              permalinkElement.scrollIntoView();
            }
          });

          clearInterval(window.CHECK_PARTIAL_LOADED);
        }
      }, 60); // 60 FPS
    }

    // Make relevant partial active
    if (document.getElementById(partialID)) {
      document
        .querySelector("#main-content > div.content.active")
        .classList.remove("active");
      document.getElementById(partialID).classList.add("active");
    }
    // else {
    // 	return;
    // }

    var permalinkElements = document.querySelectorAll("[data-path]");

    permalinkElements.forEach(function(permalinkElement) {
      if (permalinkElement.getAttribute("data-path") === hashLink) {
        permalinkElement.scrollIntoView();
      }
    });

    // Reset original hashlink (without permalink)
    // to get accurate link from urlRewriteMap
    // without the permalink part
    hashLink = hashLink.split("~")[0];
  }

  if (!(hashLink in urlRewriteMap)) {
    return;
  }

  // On URL change, if requested URL is defined in one of the
  // links in the sidenav
  var sidenavLinks = document.querySelectorAll("#sidenav a");

  if (!!sidenavLinks) {
    sidenavLinks.forEach(function(link) {
      if (link.getAttribute("href") === hashLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // TODO: Abstract this section
  var requestedPartialID = urlRewriteMap[hashLink];
  var activeContent = document.querySelector(
    "main#main-content > div.content.active"
  );
  var cachedPartial = document.getElementById(requestedPartialID);

  // Do nothing if already active
  if (activeContent && activeContent.getAttribute("id") == requestedPartialID)
    return;

  if (cachedPartial) {
    activeContent.classList.remove("active");
    cachedPartial.classList.add("active");

    return;
  }

  fetchPartial(requestedPartialID);
}

function fetchPartial(id) {
  fetch(location.origin + "/partials/" + id + ".html", { method: "GET" })
    .then(function(res) {
      return res.text();
    })
    .then(function(partial) {
      document
        .querySelector("#main-content > div.content.active")
        .classList.remove("active");
      var temp = document.createElement("div");
      temp.innerHTML = partial;
      document.getElementById("main-content").appendChild(temp.children[0]);
      
      var script = document.createElement("script");
      var resolvedScripts = []

      script.type = "text/javascript";
      script.async = true;
      document
        .querySelectorAll("#main-content > div#" + id + " > .highlight-langs")
        .forEach(function(hiddenSpan) {
          fetch(hiddenSpan.getAttribute("data-src"))
            .then(function(data) {
              return data.text();
            })
            .then(function(scriptText) {
              hiddenSpan.remove();

              resolvedScripts.push(scriptText);
              
              return Promise.all(resolvedScripts);
            })
            .then(function(finalScript) {
              script.innerHTML += finalScript.pop();
              highlightScriptsReady();
            });
          });
        
        function highlightScriptsReady() {
          script.innerHTML += ';document.querySelectorAll("pre > code").forEach(function(b) {hljs.initHighlighting(b)});';
          document.body.appendChild(script);
          hljs.initHighlighting();
        }
    })
    .catch(function(e) {
      console.log("<h1>Error: Unable to obtain document.</h1>");
    });
}

window.addEventListener("hashchange", urlStateChange);

var topnav = document.getElementById("topnav");
var sidenav = document.querySelector("#sidenav");

// Menu link click (mobile)
document.querySelector("#menu-link").onclick = function(e) {
  e.preventDefault();

  if (
    String(document.body.getAttribute("class")).indexOf("sidenav-active") > -1
  ) {
    document.body.classList.remove("sidenav-active");
  } else {
    document.body.classList.add("sidenav-active");
    document.getElementById("topnav").classList.remove("search-active");

    // document.body.onclick = function(e) {
    //   if (!e.target.id || e.target.id !== "sidenav" || e.target.id !== "menu-link") {
    //     document.body.classList.remove("sidenav-active");
    //   } else {
    //     document.body.onclick = null;
    //   }
    // };
  }

  return;
};

// Search capabilities
document.querySelector("nav#topnav #search > input").oninput = function(e) {
  var inputVal = e.target.value;
  var searchListContainer = document.getElementById("search-results");

  if (inputVal !== "" && inputVal.length > 1) {
    searchListContainer.classList.add("active");

    // document.body.addEventListener('click', function(e) {
    //   e.preventDefault();
    //   if (!e.target.id || e.target.id !== "search-results" || e.target.id !== "search") {
    //     document.getElementById("topnav").classList.remove("search-active");
    //   }
    // });
  } else {
    searchListContainer.classList.remove("active");
    return;
  }

  var matches = window.searchables.filter(function(searchableObj) {
    return searchableObj.title.toLowerCase().indexOf(inputVal) > -1;
  });

  if (matches.length < 1) {
    searchListContainer.innerHTML =
      '<a href="#"><span>No results found.</span></a>';
    return;
  }

  var listHTML = "";

  for (let i = 0; i < matches.length; i++) {
    var match = matches[i];
    var title = match.title;
    var re = new RegExp(inputVal, "gi");
    var toBold = title.match(re)[0];
    var boldenTitle = title.replace(toBold, "<b>" + toBold + "</b>");

    // Changed from '/#/' to '#/'. Same.
    listHTML +=
      '<a href="#/' +
      match.permalink +
      '"><span>' +
      boldenTitle +
      "</span><small>" +
      match.permalink +
      "</small></a>";
  }

  searchListContainer.innerHTML = listHTML;
};

document.querySelector("nav#topnav #search > a").onclick = function(e) {
  e.preventDefault();

  if (String(topnav.getAttribute("class")).indexOf("search-active") > -1) {
    topnav.classList.remove("search-active");
  } else {
    topnav.classList.add("search-active");
    document.querySelector("nav#topnav #search > input").focus();
  }

  return;
};

// Sidenav links
document.querySelectorAll("#sidenav a").forEach(function(el) {
  el.onclick = function(e) {
    e.preventDefault();

    // Set hash path
    location.hash = el.getAttribute("href");

    document.querySelectorAll("#sidenav a").forEach(function(a) {
      a.classList.remove("active");
    });
    el.classList.add("active");
  };
});

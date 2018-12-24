// 
// === Documate WebSocket Client ===
// 
// Ensure that the WebSocket API is supported
// or just suppress the dev server. None of these
// must be shipped with the production builds.
// Just abstract this section into a new file in
// the assets directory and inject at will.
if (!('WebSocket' in self)) {
  throw new Error('[Documate] WebSocket is not supported on your browser.');
}

// Defining a common endpoint is important
var endpoint = 'ws://localhost:8080';
var connection = new WebSocket(endpoint);

connection.onopen = function() {
  console.log('[Documate] "Connection ready..."');
}

connection.onmessage = function(e) {
  var payload = JSON.parse(e.data);

  // Update navbar
  if (payload.type == 'navUpdate') {
    var navbar = document.querySelector('nav#navbar');

    navbar.innerHTML = payload.updatedContents;
  }
  
  // Regular updates
  if (payload.type == 'regularUpdate') {
    var cachedPartial = document.querySelector('#' + payload.id);

    if (!cachedPartial) {
      var container = document.querySelector('#main-content');
      var activeContent = container.querySelector('div.active.content');
      var target = document.createElement('div');
      
      target.id = payload.id;
      target.className = 'active content';
      target.innerHTML = payload.content;

      if (!!activeContent) {
        activeContent.classList.remove('active');
        container.appendChild(target);
        document.querySelectorAll('#navbar a').forEach(function(link) {
          // Update class names with link id (payload id)
          link.className = link.href.match(/partials\/(.+).html/)[1];
        });
        document.querySelector('.' + payload.id).classList.add('active');
      } else {
        // Run the fetch function. For now, I'll manually fetch content.
        // Not the best but still fast.
        console.log('[else] It is not active. It should be fetched now then appended.');
      }
    } else {
      // Just update content regularly
      document.querySelector('#main-content > #' + payload.id).innerHTML = payload.content;
    }
  }
}

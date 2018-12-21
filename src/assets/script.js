document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		fetch(el.href, {method: 'GET'})
		.then(function(res) {
      return res.text();
    })
		.then(function(partial) {
			document.querySelector('#main-content > div.content.active').classList.remove('active');

			var contentDiv = document.createElement('div');
			contentDiv.className = 'content active';
			contentDiv.innerHTML = partial;
			document.getElementById('main-content').appendChild(contentDiv);
			
			// highlight only if contains code
			let regex = new RegExp('\<\/code\>');
			if (regex.test(partial))
				hljs.initHighlighting();
    })
    .catch(function(e) {
      document.getElementById('main-content').innerHTML = "<h2>Error: Unable to obtain document.</h2>"
    });
	}
});

document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		var activeContent = document.querySelector('#main-content > div.content.active');
		var requestedPartialID = el.href.match(/partials\/(.+).html/)[1];
		var cachedPartial = document.getElementById(requestedPartialID);

		// do nothing if already active
		if (requestedPartialID == activeContent.id) return;

		if (!!cachedPartial) {
			activeContent.classList.remove('active');
			cachedPartial.classList.add('active');

			return;
		}

		fetch(el.href, {method: 'GET'})
		.then(function(res) {
      return res.text();
    })
		.then(function(partial) {
			activeContent.classList.remove('active');
			var temp = document.createElement('div');
			temp.innerHTML = partial;
			document.getElementById('main-content').appendChild(temp.children[0]);
			
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

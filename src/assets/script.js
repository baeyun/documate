document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		document.querySelectorAll('#navbar a').forEach(function(a) {
			a.classList.remove('active');
		});
		el.classList.add('active');

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
			document.querySelectorAll('#main-content > div#' + requestedPartialID + ' > .highlight-langs')
				.forEach(function(hiddenSpan) {
					fetch(hiddenSpan.getAttribute('data-src'))
					.then(function(data) { return data.text(); })
					.then(function(scriptText) {
						hiddenSpan.remove();

						let script = document.createElement('script');
						script.type = 'text/javascript';
						script.innerHTML = scriptText;
						document.body.appendChild(script);
						hljs.initHighlighting();
					});
				});
  	  })
			.catch(function(e) {
				console.log("<h1>Error: Unable to obtain document.</h1>");
			});
	}
});

document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		fetch(el.href, {method: 'GET'})
		.then(function(res) {
      return res.text();
    })
		.then(function(partial) {	
			document.querySelector('#main-content').innerHTML = partial;
			document.querySelectorAll('#main-content .highlight-langs').forEach(function(hiddenSpan) {
				// console.log(hiddenSpan.getAttribute('data-src'))
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
      document.getElementById('main-content').innerHTML = "<h1>Error: Unable to obtain document.</h1>"
    });
	}
});

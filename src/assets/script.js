document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		fetch(el.href, {method: 'GET'})
		.then(function(res) {
      return res.text();
    })
		.then(function(textResult) {
			document.getElementById('main-content').innerHTML = textResult;
    })
    .catch(function(e) {
      document.getElementById('main-content').innerHTML = "<h2>Error: Failed to connect to server.</h2>"
    });
	}
});

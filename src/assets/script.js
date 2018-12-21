document.querySelectorAll('#navbar a').forEach(function(el) {
	el.onclick = function(e) {
		e.preventDefault();

		fetch(el.href, {method: 'GET'})
		.then(function(res) {
      return res.text();
    })
		.then(function(textResult) {
			document.getElementById('main-content').innerHTML = textResult;
		});
	}
});

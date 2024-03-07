<div class="container">
	<h1>Grandma Ann</h1>
	<slot/>
</div>

<style>
	*, *::before, *::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}

	.container {
		padding: 1em;
		font-family: sans-serif;
	}

	h1 {
		font-size: 120%;
	}
</style>

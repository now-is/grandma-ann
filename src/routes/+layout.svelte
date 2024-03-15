<div class="container">
	<h1>Grandma Ann · That vimsical domwager</h1>
	<slot/>
</div>

<style>
	*, *::before, *::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}

	:root {
		--tile-gap: 0.35em;
		--tile-width: 1.5em;
		--tile-row-size: 11;
	}

	.container {
		font-family: sans-serif;
		padding: 1em;
	}

	h1 {
		color: #fe0;
		font-size: 110%;
		font-weight: normal;
		letter-spacing: 0.03em;
		margin-bottom: 12px;
		text-transform: uppercase;
		word-spacing: 0.07em;
	}
</style>

<script>
	import { initState, moveRight, moveLeft, toggleMode } from '$lib/state.ts';

	let state = initState;

	function handleKeydown (ev) {
		switch (ev.key) {
		case 'H':
		case 'h':
			state = moveLeft(state);
			break;
		case 'L':
		case 'l':
			state = moveRight(state);
			break;
		case ' ':
			state = toggleMode(state);
			break;
		default:
		}
	}
</script>

<div class="app" on:keydown={handleKeydown} role="grid" tabindex="0">
	<p class="letters">
		{#each state.string as letter, i}
			<span class="letter {i == state.cursor ? 'cursor' : ''}">{letter}</span>
		{/each}
	</p>

	<p class="status">
		<span class="mode">{state.mode}</span>
		<span class="moves">{state.moves}</span>
	</p>
</div>

<style>
	.app {
		width: calc(16 * 1.5em + 15 * 0.35em);
		padding: 0.35em;
	}

	.letters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35em;
	}

	.letter {
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;

		height: 1.5em;
		width: 1.5em;
		border-width: 1px;
		border-style: solid;
		border-color: #aaa;
	}

	.letter.cursor {
		font-weight: bold;
		border-color: black;
		background-color: #cccccc;
	}

	.status {
		margin-block-start: 1em;
		display: flex;
		justify-content: space-between;
	}
</style>

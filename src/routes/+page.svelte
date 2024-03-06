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

	<p>
		<button on:click={() => state = moveLeft(state)}>move left</button>
		<button on:click={() => state = moveRight(state)}>move right</button>
	</p>

	<p>
		current mode: {state.mode} <button on:click={() => state = toggleMode(state)}>change</button>
	</p>

	<p>
		moves: {state.moves}
	</p>
</div>

<style>
	.letters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35em;
	}
	.letter {
		display: inline-block;
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
</style>

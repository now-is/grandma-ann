<script>
	import { initState, moveRight, moveLeft } from '$lib/state.ts';

	let state = initState;
</script>

<div class="app">
<p>
	{#each state.string as letter, i}
		<span class="letter {i == state.cursor ? 'cursor' : ''}">{letter}</span>
	{/each}
</p>
<p>MOVES: {state.moves}</p>

<button on:click={() => state = moveLeft(state)}>move left</button>
<button on:click={() => state = moveRight(state)}>move right</button>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>

<style>
	.letter {
		display: inline-block;
		height: 1.5em;
		width: 1.5em;
		border-width: 1px;
		border-style: solid;
		border-color: #aaa;
		margin-inline: 4px;
	}
	.letter.cursor {
		font-weight: bold;
		border-color: black;
	}
</style>

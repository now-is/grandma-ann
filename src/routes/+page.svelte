<script>
	import { initState, moveRight, moveLeft, setModeDrag, setModePan } from '$lib/state.ts';
	import { onMount } from 'svelte';

	let appNode;
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
		case 'd':
		case 'D':
			state = setModeDrag(state);
			break;
		case 'p':
		case 'P':
			state = setModePan(state);
			break;
		default:
		}
	}

	onMount(() => appNode.focus());
</script>

<div class="app" bind:this={appNode} on:keydown={handleKeydown} role="grid" tabindex="0">
	<p class="letters">
		{#each state.board as letter, i}
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
		padding: var(--tile-gap);
		width: calc(var(--tile-row-size) * var(--tile-width) + (var(--tile-row-size) + 1) * var(--tile-gap));
	}

	.app:focus {
		outline: 1px solid #eeeeee;
		background-color: #3b3b38;
	}

	.letters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--tile-gap);
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
		border-color: #e4e4e4;
		background-color: #707070;
	}

	.status {
		margin-block-start: 1em;
		display: flex;
		justify-content: space-between;
	}
</style>

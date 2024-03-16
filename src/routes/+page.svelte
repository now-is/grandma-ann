<script>
	import { initState, moveRight, moveLeft, setModeDrag, setModePan, scrambled, done } from '$lib/state.ts';
	import { onMount } from 'svelte';

	let appNode;
	let state = scrambled(initState);

	$: finished = done(state);

	function handleKeydown (ev) {
		if (finished) {
			return;
		}

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

<div class="app" class:finished={finished} bind:this={appNode} on:keydown={handleKeydown} role="grid" tabindex="0">
	<p class="letters">
		{#each state.board as letter, i}
			<span class="letter {state.cursorL <= i && i <= state.cursorR ? 'cursor' : ''}">{letter}</span>
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

	.app.finished {
		background-color: #331111;
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

	.finished .letter.cursor {
		background-color: initial;
		font-weight: initial;
		border-color: #aaa;
	}

	.status {
		margin-block-start: 1em;
		display: flex;
		justify-content: space-between;
	}

	.mode, .moves {
		text-transform: uppercase;
		font-size: 0.75em;
	}
</style>

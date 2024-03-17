<script>
	import * as S from '$lib/state.ts';
	import { titles } from '$lib/titles.ts';

	let appNode;
	let state = S.scrambled(S.initState(
		titles[S.uniform(titles.length)]
	));

	$: finished = S.done(state);

	function handleKeydown (ev) {
		if (finished) {
			return;
		}

		switch (ev.key) {
		case 'H':
		case 'h':
			state = S.moveLeft(state);
			break;
		case 'L':
		case 'l':
			state = S.moveRight(state);
			break;
		case 'd':
		case 'D':
			state = S.setModeDrag(state);
			break;
		case 'p':
		case 'P':
			state = S.setModePan(state);
			break;
		case 's':
		case 'S':
			state = S.setModeResizeLeft(state);
			break;
		case 'z':
		case 'Z':
			state = S.setModeResizeRight(state);
			break;
		case ' ':
			state = S.toggleMode(state);
			break;
		default:
		}
	}
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

<div class="help">
	<p>
	This word game is a variant an old vim-based anagram tool. So yeah, you
	need a keyboard ...
	</p>

	<p>
	Focus on the grid to start the game—tab or click. It has vim-like modes,
	vim-like movement, and a movie title to guess.
	</p>

	<p>
	Modes are drag, pan, resize-left and resize-right, activated by d, p, s,
	and z. Actual movement is done by h and l, for left and right moves.
	</p>

	<p>
	The space key toggles drag/pan, and resize left/right. That's it,
	experiment and rearrange the tiles!
	</p>
</div>

<style>
	.app, .help {
		width: calc(var(--tile-row-size) * var(--tile-width) + (var(--tile-row-size) + 1) * var(--tile-gap));
	}

	.app {
		padding: var(--tile-gap);
		outline: 1px solid #eeeeee;
		filter: blur(0.15em);
	}

	.help {
		margin-top: 2em;
		color: white;
	}

	.help p {
		margin: 1em 0;
	}

	.app:focus {
		background-color: #3b3b38;
		filter: blur(0);
	}

	.app.finished {
		background-color: #201818;
		outline: 1px solid #ffcc00;
		filter: blur(0);
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

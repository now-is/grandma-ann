import { describe, expect, it } from 'vitest';
import * as L from './state';

// length is 15, this will be used below
const initBoard = 'the quick brown'.split('');

const initState = {
	... L.initState,
	board: initBoard,
	target: initBoard,
}

interface State {
	cursorL: number;
	cursorR: number;
	board: string[];
}

interface Histogram {
	[index: string]: number;
}

function expectCursorInvariant (st: State) {
	expect(0 <= st.cursorL && st.cursorL <= st.cursorR && st.cursorR < st.board.length).toBeTruthy();
}

describe('Initialization', () => {
	it('should be a permutation', () => {
		expectCursorInvariant(initState);
		const state = L.scrambled(initState);
		function histogram (board: string[]): Histogram {
			const h: Histogram = {};
			for (let i = 0; i < board.length; i++) {
				h[board[i]] ??= 0;
				h[board[i]]++;
			}
			return h;
		}
		expect(histogram(state.board)).toEqual(histogram(initState.board));
		expectCursorInvariant(state);
	});
});

describe('Doneness', () => {
	it('should be true of initState', () => {
		expect(L.done(initState)).toEqual(true);
	});
	it('should be false of a typical state', () => {
		const state = L.moveRight(L.setModeDrag(initState));
		expect(L.done(state)).toEqual(false);
	});
});

describe('Pans', () => {
	it('should stop leftmost', () => {
		let state = initState;
		expect(L.moveLeft(state)).toEqual(state);
		state = L.setModeDrag(state);
		expect(L.moveLeft(state)).toEqual(state);
		expectCursorInvariant(state);
	});

	it('should stop rightmost', () => {
		let state = {
			...initState,
			cursorL: initBoard.length - 1,
			cursorR: initBoard.length - 1,
		};
		expect(L.moveRight(state)).toEqual(state);
		state = L.setModeDrag(state);
		expect(L.moveRight(state)).toEqual(state);
		expectCursorInvariant(state);
	});

	it('should pan right from initial state', () => {
		const state = initState;
		expect(L.moveRight(state)).toEqual({
			... state,
			cursorL: 1,
			cursorR: 1,
			moves: 1,
		});
		expectCursorInvariant(state);
	});
});

describe('Drags', () => {
	it('should drag right', () => {
		const state = L.setModeDrag(initState);
		expect(L.moveRight(state)).toEqual({
			... state,
			board: 'hte quick brown'.split(''),
			mode: 'drag',
			cursorL: 1,
			cursorR: 1,
			moves: 1,
		});
		expectCursorInvariant(state);
	});

	it('should drag left', () => {
		let state = initState;
		for (let i = 0; i < 5; i++) {
			state = L.moveRight(state);
		}
		expect(state).toEqual({
			... initState,
			cursorL: 5,
			cursorR: 5,
			moves: 5,
		});
		expectCursorInvariant(state);

		state = L.setModeDrag(state);
		expect(state).toEqual({
			... initState,
			mode: 'drag',
			cursorL: 5,
			cursorR: 5,
			moves: 5,
		});

		state = L.moveLeft(state);
		expect(state).toEqual({
			... initState,
			mode: 'drag',
			board: 'the uqick brown'.split(''),
			cursorL: 4,
			cursorR: 4,
			moves: 6,
		});
		expectCursorInvariant(state);
	});
});

import { describe, expect, it } from 'vitest';
import * as L from './state';

// length is 15, this will be used below
const initState = L.initState('the quick brown');

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
			cursorL: initState.board.length - 1,
			cursorR: initState.board.length - 1,
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

describe('Resizes', () => {
	let state = initState;
	it('should not move left on init', () => {
		state = L.setModeResizeLeft(state);
		state = L.moveLeft(state);
		expect(state).toEqual({
			...initState,
			mode: 'resizeleft',
		});
		state = L.moveRight(state);
		expect(state).toEqual({
			...initState,
			mode: 'resizeleft',
		});
	});
	it('should resize right on init', () => {
		state = L.setModeResizeRight(state);
		for (let i = 0; i < 3; i++) {
			state = L.moveRight(state);
		}
		expect(state).toEqual({
			...initState,
			mode: 'resizeright',
			cursorR: 3,
			moves: 3,
		});
	});
	it('should pan right', () => {
		state = L.setModePan(state);
		for (let i = 0; i < 3; i++) {
			state = L.moveRight(state);
		}
		expect(state).toEqual({
			...initState,
			mode: 'pan',
			cursorL: 3,
			cursorR: 6,
			moves: 6,
		});
	});
	it('should pan left', () => {
		state = L.moveLeft(state);
		expect(state).toEqual({
			...initState,
			mode: 'pan',
			cursorL: 2,
			cursorR: 5,
			moves: 7,
		});
	});
	it('should drag right', () => {
		state = L.setModeDrag(state);
		for (let i = 0; i < 3; i++) {
			state = L.moveRight(state);
		}
		expect(state).toEqual({
			...initState,
			board: 'thicke qu brown'.split(''),
			mode: 'drag',
			cursorL: 5,
			cursorR: 8,
			moves: 10,
		});
	});
	it('should drag left', () => {
		for (let i = 0; i < 2; i++) {
			state = L.moveLeft(state);
		}
		expect(state).toEqual({
			...initState,
			board: 'thie quck brown'.split(''),
			mode: 'drag',
			cursorL: 3,
			cursorR: 6,
			moves: 12,
		});
	});
});

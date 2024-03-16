import { describe, it, expect } from 'vitest';
import * as L from './state';

// length is 15, this will be used below
const initBoard = 'the quick brown'.split('');

const initState = {
	... L.initState,
	board: initBoard,
}

interface Histogram {
	[index: string]: number;
}

describe('Scrambling', () => {
	it('should be a permutation', () => {
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
	});
});

describe('A state transition', () => {
	it('should stop leftmost', () => {
		let state = initState;
		expect(L.moveLeft(state)).toEqual(state);
		state = L.setModeDrag(state);
		expect(L.moveLeft(state)).toEqual(state);
	});

	it('should stop rightmost', () => {
		let state = { ...initState, cursor: initBoard.length - 1 };
		expect(L.moveRight(state)).toEqual(state);
		state = L.setModeDrag(state);
		expect(L.moveRight(state)).toEqual(state);
	});

	it('should pan right from initial state', () => {
		const state = initState;
		expect(L.moveRight(state)).toEqual({
			... state,
			cursor: 1,
			moves: 1,
		});
	});

	it('should drag right in drag mode', () => {
		const state = L.setModeDrag(initState);
		expect(L.moveRight(state)).toEqual({
			... state,
			board: 'hte quick brown'.split(''),
			mode: 'drag',
			cursor: 1,
			moves: 1,
		});
	});

	it('should drag left in drag mode', () => {
		let state = initState;
		for (let i = 0; i < 5; i++) {
			state = L.moveRight(state);
		}
		expect(state).toEqual({
			... initState,
			cursor: 5,
			moves: 5,
		});

		state = L.setModeDrag(state);
		expect(state).toEqual({
			... initState,
			mode: 'drag',
			cursor: 5,
			moves: 5,
		});

		state = L.moveLeft(state);
		expect(state).toEqual({
			... initState,
			mode: 'drag',
			board: 'the uqick brown'.split(''),
			cursor: 4,
			moves: 6,
		});
	});
});

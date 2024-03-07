import { describe, it, expect } from 'vitest';
import * as L from './state';

// length is 15, this will be used below
const initString = 'the quick brown'.split('');

const initState = {
	... L.initState,
	string: initString,
}

describe('A state transition', () => {
	// XXX move count will be made more lenient
	it('should stop leftmost', () => {
		const state = initState;
		expect(L.moveLeft(state)).toEqual({
			... state,
			moves: 1,
		});
	});

	it('should stop rightmost', () => {
		const state = { ...initState, cursor: initString.length - 1 };
		expect(L.moveRight(state)).toEqual({
			... state,
			moves: 1,
		});
	});

	it('should pan right from initial state', () => {
		const state = initState;
		expect(L.moveRight(state)).toEqual({
			... state,
			cursor: 1,
			moves: 1,
		});
	});

	it('should drag right after toggling mode', () => {
		const state = L.toggleMode(initState);
		expect(L.moveRight(state)).toEqual({
			... state,
			string: 'hte quick brown'.split(''),
			cursor: 1,
			moves: 1,
		});
	});
});

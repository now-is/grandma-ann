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

	it('should drag right in drag mode', () => {
		const state = L.setModeDrag(initState);
		expect(L.moveRight(state)).toEqual({
			... state,
			string: 'hte quick brown'.split(''),
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
			string: 'the uqick brown'.split(''), // NO!
			cursor: 4,
			moves: 6,
		});
	});
});

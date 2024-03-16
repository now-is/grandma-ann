// place files you want to import through the `$lib` alias in this folder.

enum Mode {
	Drag = 'drag',
	Pan = 'pan',
	ResizeLeft = 'resizeleft',
	ResizeRight = 'resizeright',
}

type State = {
	target: string[];
	board: string[];
	cursorL: number;
	cursorR: number;
	mode: Mode;
	moves: number;
}

export const initState: State = {
	target: 'the quick brown fox'.split(''),
	board:  'the quick brown fox'.split(''),
	cursorL: 0,
	cursorR: 0,
	mode:   Mode.Pan,
	moves:  0,
};

function uniform(max: number): number {
	return Math.floor(Math.random() * max);
}

export function done(st: State): boolean {
	for (let i = 0; i < st.target.length; i++) {
		if (st.target[i] !== st.board[i]) {
			return false;
		}
	}
	return true;
}

// Fisher-Yates
export function scrambled(st: State): State {
	const n = st.board.length;
	const new_board: string[] = [];
	for (let i = 0; i < n; i++) {
		new_board[i] = st.board[i];
	}
	for (let i = 0; i <= n - 2; i++) {
		const j = i + uniform(n-i);
		const tmp = new_board[j];
		new_board[j] = new_board[i];
		new_board[i] = tmp;
	}
	return {
		...st,
		board: new_board,
	};
}

export function dragRight(st: State) : State {
	if (st.cursorL >= st.board.length - 1) {
		return st;
	}
	const new_board = [];
	for (let i = 0; i < st.board.length; i++) {
		new_board[i] = st.board[i];
	}
	new_board[st.cursorL+1] = st.board[st.cursorL];
	new_board[st.cursorL] = st.board[st.cursorL+1];
	return {
		... st,
		cursorL: st.cursorL + 1,
		cursorR: st.cursorR + 1,
		board: new_board,
		moves: st.moves + 1,
   	};
}

export function dragLeft(st: State) : State {
	if (st.cursorL <= 0) {
		return st;
	}
	const new_board = [];
	for (let i = 0; i < st.board.length; i++) {
		new_board[i] = st.board[i];
	}
	new_board[st.cursorL-1] = st.board[st.cursorL];
	new_board[st.cursorL] = st.board[st.cursorL-1];
	return {
		... st,
		board: new_board,
		cursorL: st.cursorL - 1,
		cursorR: st.cursorR - 1,
		moves: st.moves + 1,
	};
}

export function panRight(st: State) : State {
	const isMoveable = st.cursorR < st.board.length - 1;
	return {
		...st,
		cursorL: isMoveable ? st.cursorL + 1 : st.cursorL,
		cursorR: isMoveable ? st.cursorR + 1 : st.cursorR,
		moves: isMoveable ? st.moves + 1 : st.moves,
	};
}

export function panLeft(st: State) : State {
	const isMoveable = st.cursorL > 0;
	return {
		...st,
		cursorL: isMoveable ? st.cursorL - 1 : 0,
		cursorR: isMoveable ? st.cursorR - 1 : 0,
		moves:  isMoveable ? st.moves + 1 : st.moves,
	};
}

export function moveRight(st: State) : State {
	return st.mode === Mode.Drag ? dragRight(st) : panRight(st);
}

export function moveLeft(st: State) : State {
	return st.mode === Mode.Drag ? dragLeft(st) : panLeft(st);
}

function setMode(st: State, mode: Mode) : State {
	return {...st, mode: mode };
}

export function setModeDrag(st: State) : State {
	return setMode(st, Mode.Drag);
}

export function setModePan(st: State) : State {
	return setMode(st, Mode.Pan);
}

export function setModeResizeLeft(st: State) : State {
	return setMode(st, Mode.ResizeLeft);
}

export function setModeResizeRight(st: State) : State {
	return setMode(st, Mode.ResizeRight);
}

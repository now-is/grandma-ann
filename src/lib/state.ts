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

export function initState(targetString: string): State {
	const board = targetString.split('');
	return {
		target: board,
		board:  board,
		cursorL: 0,
		cursorR: 0,
		mode:   Mode.Pan,
		moves:  0,
	}
};

export function uniform(max: number): number {
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
	if (st.cursorR >= st.board.length - 1) {
		return st;
	}
	const new_board = [];
	for (let i = 0; i < st.board.length; i++) {
		if (i == st.cursorL) {
			new_board[i] = st.board[st.cursorR+1];
		}
		else if (st.cursorL < i && i <= st.cursorR + 1) {
			new_board[i] = st.board[i-1];
		}
		else {
			new_board[i] = st.board[i];
		}
	}
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
		if (i == st.cursorR) {
			new_board[i] = st.board[st.cursorL-1];
		}
		else if (st.cursorL - 1 <= i && i < st.cursorR) {
			new_board[i] = st.board[i+1];
		}
		else {
			new_board[i] = st.board[i];
		}
	}
	return {
		... st,
		board: new_board,
		cursorL: st.cursorL - 1,
		cursorR: st.cursorR - 1,
		moves: st.moves + 1,
	};
}

export function panRight(st: State) : State {
	if (st.cursorR >= st.board.length - 1) {
		return st;
	}
	return {
		...st,
		cursorL: st.cursorL + 1,
		cursorR: st.cursorR + 1,
		moves: st.moves + 1,
	};
}

export function panLeft(st: State) : State {
	if (st.cursorL <= 0) {
		return st;
	}
	return {
		...st,
		cursorL: st.cursorL - 1,
		cursorR: st.cursorR - 1,
		moves: st.moves + 1,
	};
}

export function resizeRightRight(st: State) : State {
	if (st.cursorR >= st.board.length - 1) {
		return st;
	}
	return {
		...st,
		cursorR: st.cursorR + 1,
		moves: st.moves + 1,
	};
	return st;
}

export function resizeRightLeft(st: State) : State {
	if (st.cursorR <= st.cursorL) {
		return st;
	}
	return {
		...st,
		cursorR: st.cursorR - 1,
		moves: st.moves + 1,
	};
	return st;
}

export function resizeLeftRight(st: State) : State {
	if (st.cursorL >= st.cursorR) {
		return st;
	}
	return {
		...st,
		cursorL: st.cursorL + 1,
		moves: st.moves + 1,
	};
	return st;
}

export function resizeLeftLeft(st: State) : State {
	if (st.cursorL <= 0) {
		return st;
	}
	return {
		...st,
		cursorL: st.cursorL - 1,
		moves: st.moves + 1,
	};
	return st;
}

export function moveRight(st: State) : State {
	switch (st.mode) {
	case Mode.Drag:
		return dragRight(st);
		break;
	case Mode.Pan:
		return panRight(st);
		break;
	case Mode.ResizeRight:
		return resizeRightRight(st);
		break;
	case Mode.ResizeLeft:
		return resizeLeftRight(st);
		break;
	default:
		return st;
	}
}

export function moveLeft(st: State) : State {
	switch (st.mode) {
	case Mode.Drag:
		return dragLeft(st);
		break;
	case Mode.Pan:
		return panLeft(st);
		break;
	case Mode.ResizeRight:
		return resizeRightLeft(st);
		break;
	case Mode.ResizeLeft:
		return resizeLeftLeft(st);
		break;
	default:
		return st;
	}
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

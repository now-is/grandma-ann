// place files you want to import through the `$lib` alias in this folder.

// XXX move declarations away?
enum Mode {
	Drag = "drag",
	Pan = "pan",
}

type State = {
	string: string[];
	height: number;
	width: number;
	cursor: number;
	mode: Mode;
	moves: number;
}

export const initState: State = {
	string: 'the quick brown fox jumped over the lazy dog'.split(''),
	height: 4,
	width: 8,
	cursor: 0,
	mode: Mode.Pan,
	moves: 0,
};

export function dragRight(st: State) : State {
	if (st.cursor >= st.string.length - 1) {
		return st;
	}
	const letter = st.string[st.cursor];
	st.string[st.cursor] = st.string[st.cursor+1];
	st.string[st.cursor+1] = letter;
	st.cursor += 1;
	return st;
}

export function dragLeft(st: State) : State {
	if (st.cursor <= 0) {
		return st;
	}
	const letter = st.string[st.cursor];
	st.string[st.cursor] = st.string[st.cursor-1];
	st.string[st.cursor-1] = letter;
	st.cursor -= 1;
	return st;
}

export function panRight(st: State) : State {
	return {
		...st,
		cursor: st.cursor >= st.string.length - 1 ? st.cursor : st.cursor + 1
	};
}

export function panLeft(st: State) : State {
	return {
		...st,
		cursor: st.cursor <= 0 ? 0 : st.cursor - 1
	};
}

export function moveRight(st: State) : State {
	st = st.mode === Mode.Drag ? dragRight(st) : panRight(st);
	return {...st, moves: st.moves + 1 };
}

export function moveLeft(st: State) : State {
	st = st.mode === Mode.Drag ? dragLeft(st) : panLeft(st);
	return {...st, moves: st.moves + 1 };
}

export function toggleMode(st: State) : State {
	return {...st, mode: st.mode === Mode.Drag ? Mode.Pan : Mode.Drag };
}

// place files you want to import through the `$lib` alias in this folder.

// XXX move declarations away?
enum Mode {
	Drag,
	Pan,
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

export function moveRight(st: State) : State {
	if (st.cursor >= st.string.length - 1) {
		return st;
	}
	const letter = st.string[st.cursor];
	st.string[st.cursor] = st.string[st.cursor+1];
	st.string[st.cursor+1] = letter;
	st.cursor += 1;
	st.moves += 1;
	return st;
}

export function moveLeft(st: State) : State {
	if (st.cursor <= 0) {
		return st;
	}
	const letter = st.string[st.cursor];
	st.string[st.cursor] = st.string[st.cursor-1];
	st.string[st.cursor-1] = letter;
	st.cursor -= 1;
	st.moves += 1;
	return st;
}

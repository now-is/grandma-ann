// place files you want to import through the `$lib` alias in this folder.

// XXX move declarations away?
enum Mode {
	Drag = 'drag',
	Pan = 'pan',
	ResizeLeft = 'resizeleft',
	ResizeRight = 'resizeright',
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
	const new_string = [];
	for (let i = 0; i < st.string.length; i++) {
		new_string[i] = st.string[i];
	}
	new_string[st.cursor+1] = st.string[st.cursor];
	new_string[st.cursor] = st.string[st.cursor+1];
	return {... st, cursor: st.cursor + 1, string: new_string };
}

export function dragLeft(st: State) : State {
	if (st.cursor <= 0) {
		return st;
	}
	const new_string = [];
	for (let i = 0; i < st.string.length; i++) {
		new_string[i] = st.string[i];
	}
	new_string[st.cursor-1] = st.string[st.cursor];
	new_string[st.cursor] = st.string[st.cursor-1];
	return {... st, cursor: st.cursor - 1, string: new_string };
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

export function setMode(st: State, mode: Mode) : State {
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
	return setMode(st, Mode.ResizeLeft);
}

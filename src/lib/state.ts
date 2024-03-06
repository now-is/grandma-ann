// place files you want to import through the `$lib` alias in this folder.

// XXX move declarations away?
enum Mode {
	Drag,
	Pan,
}

type State = {
	string: string;
	height: number;
	width: number;
	cursor: number;
	mode: Mode;
	moves: number;
}

export const state: State = {
	string: 'the quick brown fox jumped over the lazy dog',
	height: 4,
	width: 8,
	cursor: 0,
	mode: Mode.Pan,
	moves: 0,
};

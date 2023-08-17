import type { Group, Study, Year } from './db/schema';

export const yearNames = {
	1: '1. trinn',
	2: '2. trinn',
	3: '3. trinn',
	4: '4. trinn',
	5: '5. trinn'
} satisfies Record<Year, string>;

export const studyNames = {
	DTEK: 'Datateknologi',
	DSIK: 'Datasikkerhet',
	DVIT: 'Datavitenskap',
	BINF: 'Bioinformatikk',
	IMO: 'Informatikk-matematikk-økonomi',
	INF: 'Master i Informatikk',
	PROG: 'Felles master i programvareutvikling',
	DSC: 'Master i Data Science',
	OTHER: 'Annet (ikke på listen)'
} satisfies Record<Study, string>;

export const groupNames = {
	webkom: 'Webkom',
	tilde: 'Tilde',
	bedkom: 'Bedkom',
	makerspace: 'Makerspace',
	hyggkom: 'Hyggkom',
	gnist: 'Gnist',
	esc: 'echo Sports Club',
	bar: 'Programmerbar'
} satisfies Record<Group, string>;

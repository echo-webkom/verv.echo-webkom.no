import type { studyEnum, yearEnum } from './db/schema';

type Study = (typeof studyEnum.enumValues)[number];
type Year = (typeof yearEnum.enumValues)[number];

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

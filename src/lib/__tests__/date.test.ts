import { getSemesterCode } from '$lib/date';
import { describe, it, expect } from 'vitest';

const cases = [
	{ date: new Date('2021-03-01'), expected: '21V' },
	{ date: new Date('2034-07-01'), expected: '34H' },
	{ date: new Date('2021-07-01'), expected: '21H' },
	{ date: new Date('2021-01-01'), expected: '21V' },
	{ date: new Date('2021-06-30'), expected: '21V' },
	{ date: new Date('2021-07-01'), expected: '21H' },
	{ date: new Date('2021-12-31'), expected: '21H' },
	{ date: new Date('2021-08-01'), expected: '21H' }
];

describe('getSemesterCode', () => {
	cases.forEach(({ date, expected }) => {
		it(`returns ${expected} for ${date}`, () => {
			expect(getSemesterCode(date)).toBe(expected);
		});
	});
});

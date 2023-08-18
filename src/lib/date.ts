export const { format } = new Intl.DateTimeFormat('nb-NO', {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
});

export const getSemesterCode = (date: Date = new Date()) => {
	const month = date.getMonth();
	const year = date.getFullYear().toString().slice(-2);

	const semester = month < 6 ? 'V' : 'H';

	return `${year}${semester}`;
};

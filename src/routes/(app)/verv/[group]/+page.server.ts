import { groupNames } from '$lib/constants';
import { db } from '$lib/db/drizzle';
import { applications, groupEnum, type Group } from '$lib/db/schema';
import { applicationFormSchema } from '$lib/validators';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import postgres from 'postgres';
import { setError, superValidate } from 'sveltekit-superforms/server';

// Hack to get around the fact that the PostgresError class is not exported
const { PostgresError } = postgres;

const isValidGroup = (group: string): group is Group => {
	return groupEnum.enumValues.includes(group as Group);
};

export const load = (async ({ params }) => {
	const { group } = params;

	if (!isValidGroup(group)) {
		throw error(404, 'Not found');
	}

	const form = await superValidate(applicationFormSchema);

	const groupName = groupNames[group as Group];

	return { groupName, form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ params, request, getClientAddress }) => {
		const { group } = params;

		const form = await superValidate(request, applicationFormSchema);

		if (!isValidGroup(group)) {
			setError(form, '', 'Ikke en gyldig undergruppe');
			return fail(400, {
				form
			});
		}

		const clientAddress = getClientAddress();
		const ip = clientAddress === '::1' ? 'localhost' : clientAddress;

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.insert(applications).values({
				...form.data,
				ip,
				group
			});
		} catch (error) {
			console.log('error', error);

			if (error instanceof PostgresError) {
				if (error.code === '23505') {
					setError(form, 'email', 'Du kan ikke søke flere ganger');
					return fail(400, { form });
				}

				// Unknown error
				console.error(error);
			}

			setError(form, '', 'Noe gikk galt.');
			return fail(400, { form });
		}

		return { form };
	}
} satisfies Actions;

import { db } from '$lib/db/drizzle';
import { applications } from '$lib/db/schema';
import { applicationFormSchema } from '$lib/validators';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { PostgresError } from 'postgres';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = (async () => {
	const form = await superValidate(applicationFormSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const form = await superValidate(request, applicationFormSchema);

		const clientAddress = getClientAddress();
		const ip = clientAddress === '::1' ? 'localhost' : clientAddress;

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.insert(applications).values({
				...form.data,
				ip
			});
		} catch (error) {
			if (error instanceof PostgresError) {
				console.log(error.code);

				setError(form, 'email', 'Du kan ikke søke flere ganger');
				return fail(400, { form });
			}

			console.log(error);

			setError(form, '', 'Noe gikk galt');
			return fail(500, { form });
		}

		return { form };
	}
} satisfies Actions;

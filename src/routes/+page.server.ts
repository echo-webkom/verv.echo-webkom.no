import { db } from '$lib/db/drizzle';
import { applications } from '$lib/db/schema';
import { applicationFormSchema } from '$lib/validators';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

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

		await db.insert(applications).values({
			...form.data,
			ip
		});

		return { form };
	}
};

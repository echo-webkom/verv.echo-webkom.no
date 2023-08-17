import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { updatePasswordFormSchema } from '$lib/validators';

export const load = (async ({ locals }) => {
	const { getSession } = locals;

	const session = await getSession();

	if (!session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(updatePasswordFormSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const form = await superValidate(request, updatePasswordFormSchema);

		const session = await getSession();

		if (!session) {
			throw redirect(302, '/');
		}

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { password } = form.data;

		const { error } = await supabase.auth.updateUser({
			password
		});

		if (error) {
			setError(form, 'password', 'Kunne ikke oppdatere passordet.');
			return fail(500, {
				form
			});
		}

		return {
			form
		};
	}
};

import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { forgotPasswordFormSchema } from '$lib/validators';

export const load = (async ({ locals }) => {
	const { getSession } = locals;

	const session = await getSession();

	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(forgotPasswordFormSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ url, request, locals: { supabase } }) => {
		const form = await superValidate(request, forgotPasswordFormSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email } = form.data;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/callback?redirectTo=/update-password`
		});

		if (error) {
			setError(form, 'email', 'Kunne ikke sende e-post.');
			return fail(500, {
				form
			});
		}

		return {
			form
		};
	}
};

import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from '$lib/validators';

export const load = (async ({ locals }) => {
	const { getSession } = locals;

	const session = await getSession();

	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(loginFormSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, url, locals: { supabase } }) => {
		const form = await superValidate(request, loginFormSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			console.error(error);
			setError(form, 'email', 'Fikk ikke til å lage en bruker.');
			return fail(500, {
				form
			});
		}

		return {
			form
		};
	},

	signin: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, loginFormSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			setError(form, 'email', 'Fikk ikke til å logge deg inn.');
			return fail(500, {
				form
			});
		}

		return {
			form,
			signin: true
		};
	}
};

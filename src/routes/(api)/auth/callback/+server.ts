import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	const redirectTo = url.searchParams.get('redirectTo');

	throw redirect(303, redirectTo ? `/${redirectTo.slice(1)}` : '/');
}) satisfies RequestHandler;

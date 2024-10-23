import { feide } from '$lib/server/auth';
import { generateState } from '$lib/server/providers/oauth2';
import type { RequestEvent } from './$types';

export const GET = async ({ cookies }: RequestEvent) => {
	const state = generateState();
	const url = feide.createAuthorizationURL(state, ['email', 'openid', 'profile']);

	cookies.set('feide_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};

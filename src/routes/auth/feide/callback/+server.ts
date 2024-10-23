import { dev } from '$app/environment';
import { feide, generateSessionToken, sessionCookieName } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { accounts, sessions, users } from '$lib/server/db/schemas';
import { getFeideUser } from '$lib/server/providers/feide';
import { nanoid } from 'nanoid';
import type { RequestHandler } from './$types';
import { addDays } from 'date-fns';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('feide_oauth_state') ?? null;

	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	const tokens = await feide.validateAuthorizationCode(code);
	const feideUser = await getFeideUser(tokens.accessToken());

	const existingAccount = await db.query.accounts.findFirst({
		where: (row, { and, eq }) =>
			and(eq(row.provider, 'feide'), eq(row.providerAccountId, feideUser.id))
	});

	if (existingAccount) {
		const sessionToken = generateSessionToken();
		await db.insert(sessions).values({
			id: sessionToken,
			expiresAt: addDays(new Date(), 7),
			userId: existingAccount.userId
		});

		cookies.set(sessionCookieName, sessionToken, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			secure: !dev
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const userId = nanoid();

	await db.insert(users).values({
		id: userId,
		email: feideUser.email,
		name: feideUser.name
	});

	await db.insert(accounts).values({
		provider: 'feide',
		providerAccountId: feideUser.id,
		userId
	});

	const sessionToken = generateSessionToken();

	await db.insert(sessions).values({
		id: sessionToken,
		expiresAt: addDays(new Date(), 7),
		userId
	});

	cookies.set(sessionCookieName, sessionToken, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		secure: !dev
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
};

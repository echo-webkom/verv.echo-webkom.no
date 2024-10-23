import { db } from './db';
import { isPast } from 'date-fns';
import { sessions } from './db/schemas';
import { eq } from 'drizzle-orm';
import { Feide } from './providers/feide';
import { env } from '$env/dynamic/private';

export const feide = new Feide(
	env.FEIDE_CLIENT_ID,
	env.FEIDE_CLIENT_SECRET,
	env.FEIDE_REDIRECT_URI
);

export const sessionCookieName = '__auth_session';

export type ValidateSessionResult = Awaited<ReturnType<typeof validateSession>>;

export const validateSession = async (sessionId: string) => {
	const session = await db.query.sessions.findFirst({
		where: (row, { eq }) => eq(row.id, sessionId),
		with: {
			user: true
		}
	});

	if (!session || !session.user) {
		return {
			user: null,
			session: null
		};
	}

	if (isPast(session.expiresAt)) {
		await db.delete(sessions).where(eq(sessions.id, sessionId)).execute();

		return {
			user: null,
			session: null
		};
	}

	const user = session.user;
	const zession = {
		id: session.id,
		userId: session.userId,
		expiresAt: session.expiresAt
	};

	return {
		user,
		session: zession
	};
};

export const generateSessionToken = () => {
	return crypto.randomUUID();
};

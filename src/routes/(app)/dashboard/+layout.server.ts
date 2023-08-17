import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';

export const load = (async ({ depends, locals }) => {
	depends('supabase:auth');

	const { getSession } = locals;

	const session = await getSession();

	const id = session?.user.id;

	if (!id) {
		throw error(401, 'Du har ikke tilgang til denne siden.');
	}

	const profile = await db.query.profiles.findFirst({
		where: (profile) => eq(profile.id, id)
	});

	if (!profile?.role) {
		throw error(401, 'Du har ikke tilgang til denne siden.');
	}

	return {
		profile
	};
}) satisfies LayoutServerLoad;

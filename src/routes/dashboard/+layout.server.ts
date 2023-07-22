import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { getSession } = locals;

	const session = await getSession();

	if (!session) {
		throw redirect(302, '/login');
	}
}) satisfies LayoutServerLoad;

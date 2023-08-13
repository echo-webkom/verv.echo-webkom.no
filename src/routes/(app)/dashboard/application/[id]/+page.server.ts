import { db } from '$lib/db/drizzle';
import { error } from '@sveltejs/kit';

export const load = async ({ params, depends }) => {
	depends('supabase:auth');

	const { id } = params;

	const application = await db.query.applications.findFirst({
		where: (application, { eq }) => eq(application.id, id)
	});

	if (!application) {
		throw error(404, 'No application matching id');
	}

	return {
		application
	};
};

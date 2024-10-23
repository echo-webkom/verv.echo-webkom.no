import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users';
import { workspaces } from './workspaces';

export const usersToWorkspaces = sqliteTable(
	'users_to_workspaces',
	{
		userId: text('user_id').notNull(),
		workspaceId: text('workspace_id').notNull(),
		role: text('role', { enum: ['admin', 'member'] }).notNull()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.workspaceId] })
	})
);

export const usersToWorkspacesRelations = relations(usersToWorkspaces, ({ one }) => ({
	user: one(users, {
		fields: [usersToWorkspaces.userId],
		references: [users.id]
	}),
	workspace: one(workspaces, {
		fields: [usersToWorkspaces.workspaceId],
		references: [workspaces.id]
	})
}));

export type UsersToWorkspaces = InferSelectModel<typeof usersToWorkspaces>;
export type UsersToWorkspacesInsert = InferInsertModel<typeof usersToWorkspaces>;

export const UsersToWorkspacesSchema = createSelectSchema(usersToWorkspaces);
export const UsersToWorkspacesInsertSchema = createInsertSchema(usersToWorkspaces);

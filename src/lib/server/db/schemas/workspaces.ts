import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { nanoid } from 'nanoid';
import { usersToWorkspaces } from './users-to-workspaces';

export const workspaces = sqliteTable('workspace', {
	id: text('id').notNull().primaryKey().$defaultFn(nanoid),
	name: text('name').notNull()
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
	members: many(usersToWorkspaces)
}));

export type Workspace = InferSelectModel<typeof workspaces>;
export type WorkspaceInsert = InferInsertModel<typeof workspaces>;

export const WorkspaceSchema = createSelectSchema(workspaces);
export const WorkspaceInsertSchema = createInsertSchema(workspaces);

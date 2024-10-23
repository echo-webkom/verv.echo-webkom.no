import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const sessions = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export type Session = InferSelectModel<typeof sessions>;
export type SessionInsert = InferInsertModel<typeof sessions>;

export const SessionSchema = createSelectSchema(sessions);
export const SessionInsertSchema = createInsertSchema(sessions);

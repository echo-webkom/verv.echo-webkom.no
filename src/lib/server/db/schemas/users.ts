import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { nanoid } from 'nanoid';
import { sessions } from './sessions';
import { accounts } from './accounts';

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey().$defaultFn(nanoid),
	name: text('name').notNull(),
	email: text('email').notNull().unique()
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts)
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export const UserSchema = createSelectSchema(users);
export const UserInsertSchema = createInsertSchema(users);

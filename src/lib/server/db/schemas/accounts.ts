import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { createSelectSchema } from 'drizzle-zod';

export const accounts = sqliteTable(
	'account',
	{
		userId: text('user_id').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('provider_account_id').notNull(),
		accessToken: text('access_token')
	},
	(table) => ({
		pk: primaryKey({ columns: [table.provider, table.providerAccountId] })
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

export type Account = InferSelectModel<typeof accounts>;
export type AccountInsert = InferInsertModel<typeof accounts>;

export const AccountSchema = createSelectSchema(accounts);
export const AccountInsertSchema = createSelectSchema(accounts);

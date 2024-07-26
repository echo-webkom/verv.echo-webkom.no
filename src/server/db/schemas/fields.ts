import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { forms } from "./forms";

export const fieldTypes = ["text", "textarea", "checkbox", "radio", "select"] as const;

export const fields = sqliteTable("field", {
  id: text("id").notNull().primaryKey(),
  index: integer("index").notNull(),
  formId: text("form_id")
    .notNull()
    .references(() => forms.id, {
      onDelete: "cascade",
    }),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: fieldTypes }).notNull(),
  options: text("options", { mode: "json" }).$type<Array<string>>(),
  required: integer("required", { mode: "boolean" }).notNull(),
});

export const fieldsRelations = relations(fields, ({ one }) => {
  return {
    form: one(forms, {
      fields: [fields.formId],
      references: [forms.id],
    }),
  };
});

export type Field = InferSelectModel<typeof fields>;
export type FieldInsert = InferInsertModel<typeof fields>;

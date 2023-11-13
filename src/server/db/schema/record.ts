import { decimal, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from ".";
import { relations } from "drizzle-orm";

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  remark: text("remark"),
  monery: decimal("monery").notNull(),
  userId: uuid("user_id").references(() => users.id),
});

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));

export type Record = typeof records.$inferSelect;

export type NewRecord = typeof records.$inferInsert;

export const insertRecordSchema = createInsertSchema(records);

export const selectRecordSchema = createSelectSchema(records);

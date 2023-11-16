import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { records } from ".";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  nickName: text("nick_name").default(""),
  phone: varchar("phone", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

export type User = typeof users.$inferSelect;

export type NewUser = typeof users.$inferInsert;

export const selectUserSchema = createSelectSchema(users);

export const loginSchema = selectUserSchema.pick({
  phone: true,
  password: true,
}).merge(z.object({
  phone: z.string().length(11, {message: 'invalid phone number'}),
  password: z.string().min(6, 'Minimum 6 digits').max(16, 'Maximum 16 digits'),
}));

export const insertUserSchema = loginSchema.merge(
  z.object({
    confirmPassword: z.string(),
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "comfirm password didn't match the password",
  path: ["confirmPassword"],
});

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

export const insertUserSchema = createInsertSchema(users)
  .merge(
    z.object({
      confirmPassword: z.string(),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不一致",
    path: ["password"],
  });

export const selectUserSchema = createSelectSchema(users);

export const loginSchema = selectUserSchema.pick({
  phone: true,
  password: true,
});

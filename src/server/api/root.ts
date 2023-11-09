import { createTRPCRouter } from "~/server/api/trpc";
import { todoRouter } from "./routers/todo";
import {userRouter} from "~/server/api/routers/user";
import {recordRouter} from "~/server/api/routers/record";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  user: userRouter,
  record: recordRouter
});

export type AppRouter = typeof appRouter;

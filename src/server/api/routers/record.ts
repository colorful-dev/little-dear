import {authorizedProcedure, createTRPCRouter} from "~/server/api/trpc";
import {RecordSchema} from "~/server/api/schema";

const CreateSchema = RecordSchema.pick({name: true})
export const recordRouter = createTRPCRouter({
    create: authorizedProcedure.input(CreateSchema).mutation(async ({input, ctx}) => {
        return ctx.db.record.create({
            data: {
                name: input.name,
                authorId: ctx.userId!,
            }
        })
    })
})
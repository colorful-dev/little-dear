import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TodoScalarFieldEnumSchema = z.enum(['id','name','completed','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','password','nickName','createdAt','updatedAt','isDelete']);

export const RecordScalarFieldEnumSchema = z.enum(['id','name','authorId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Todo = z.infer<typeof TodoSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  nickName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isDelete: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

export const RecordSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  authorId: z.string(),
})

export type Record = z.infer<typeof RecordSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TODO
//------------------------------------------------------

export const TodoSelectSchema: z.ZodType<Prisma.TodoSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  completed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Record: z.union([z.boolean(),z.lazy(() => RecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Record: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  nickName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isDelete: z.boolean().optional(),
  Record: z.union([z.boolean(),z.lazy(() => RecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RECORD
//------------------------------------------------------

export const RecordIncludeSchema: z.ZodType<Prisma.RecordInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RecordArgsSchema: z.ZodType<Prisma.RecordDefaultArgs> = z.object({
  select: z.lazy(() => RecordSelectSchema).optional(),
  include: z.lazy(() => RecordIncludeSchema).optional(),
}).strict();

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  authorId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TodoWhereInputSchema: z.ZodType<Prisma.TodoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TodoOrderByWithRelationInputSchema: z.ZodType<Prisma.TodoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoWhereUniqueInputSchema: z.ZodType<Prisma.TodoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const TodoOrderByWithAggregationInputSchema: z.ZodType<Prisma.TodoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TodoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TodoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TodoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TodoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TodoSumOrderByAggregateInputSchema).optional()
}).strict();

export const TodoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TodoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isDelete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Record: z.lazy(() => RecordListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  nickName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isDelete: z.lazy(() => SortOrderSchema).optional(),
  Record: z.lazy(() => RecordOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    username: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isDelete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Record: z.lazy(() => RecordListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  nickName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isDelete: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nickName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isDelete: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const RecordWhereInputSchema: z.ZodType<Prisma.RecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RecordOrderByWithRelationInputSchema: z.ZodType<Prisma.RecordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RecordWhereUniqueInputSchema: z.ZodType<Prisma.RecordWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecordSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecordScalarWhereWithAggregatesInputSchema),z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordScalarWhereWithAggregatesInputSchema),z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TodoCreateInputSchema: z.ZodType<Prisma.TodoCreateInput> = z.object({
  name: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUncheckedCreateInputSchema: z.ZodType<Prisma.TodoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUpdateInputSchema: z.ZodType<Prisma.TodoUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoUncheckedUpdateInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoCreateManyInputSchema: z.ZodType<Prisma.TodoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUpdateManyMutationInputSchema: z.ZodType<Prisma.TodoUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  nickName: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isDelete: z.boolean().optional(),
  Record: z.lazy(() => RecordCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  nickName: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isDelete: z.boolean().optional(),
  Record: z.lazy(() => RecordUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.lazy(() => RecordUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.lazy(() => RecordUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  nickName: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isDelete: z.boolean().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordCreateInputSchema: z.ZodType<Prisma.RecordCreateInput> = z.object({
  name: z.string(),
  author: z.lazy(() => UserCreateNestedOneWithoutRecordInputSchema)
}).strict();

export const RecordUncheckedCreateInputSchema: z.ZodType<Prisma.RecordUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  authorId: z.string()
}).strict();

export const RecordUpdateInputSchema: z.ZodType<Prisma.RecordUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutRecordNestedInputSchema).optional()
}).strict();

export const RecordUncheckedUpdateInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordCreateManyInputSchema: z.ZodType<Prisma.RecordCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  authorId: z.string()
}).strict();

export const RecordUpdateManyMutationInputSchema: z.ZodType<Prisma.RecordUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TodoCountOrderByAggregateInputSchema: z.ZodType<Prisma.TodoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TodoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoMinOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoSumOrderByAggregateInputSchema: z.ZodType<Prisma.TodoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const RecordListRelationFilterSchema: z.ZodType<Prisma.RecordListRelationFilter> = z.object({
  every: z.lazy(() => RecordWhereInputSchema).optional(),
  some: z.lazy(() => RecordWhereInputSchema).optional(),
  none: z.lazy(() => RecordWhereInputSchema).optional()
}).strict();

export const RecordOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecordOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  nickName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isDelete: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  nickName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isDelete: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  nickName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isDelete: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const RecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecordAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecordSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RecordCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.RecordCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordCreateWithoutAuthorInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecordUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordCreateWithoutAuthorInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecordUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.RecordUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordCreateWithoutAuthorInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecordUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => RecordUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecordUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => RecordUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecordUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => RecordUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecordUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordCreateWithoutAuthorInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => RecordCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecordUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => RecordUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecordUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => RecordUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecordUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => RecordUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRecordInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRecordInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecordInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutRecordNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecordInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRecordInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRecordInputSchema),z.lazy(() => UserUpdateWithoutRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecordInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const RecordCreateWithoutAuthorInputSchema: z.ZodType<Prisma.RecordCreateWithoutAuthorInput> = z.object({
  name: z.string()
}).strict();

export const RecordUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const RecordCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.RecordCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const RecordCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.RecordCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecordCreateManyAuthorInputSchema),z.lazy(() => RecordCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecordUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecordUpdateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => RecordCreateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const RecordUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecordUpdateWithoutAuthorInputSchema),z.lazy(() => RecordUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const RecordUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => RecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecordUpdateManyMutationInputSchema),z.lazy(() => RecordUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const RecordScalarWhereInputSchema: z.ZodType<Prisma.RecordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutRecordInputSchema: z.ZodType<Prisma.UserCreateWithoutRecordInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  nickName: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isDelete: z.boolean().optional()
}).strict();

export const UserUncheckedCreateWithoutRecordInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRecordInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  nickName: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isDelete: z.boolean().optional()
}).strict();

export const UserCreateOrConnectWithoutRecordInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRecordInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecordInputSchema) ]),
}).strict();

export const UserUpsertWithoutRecordInputSchema: z.ZodType<Prisma.UserUpsertWithoutRecordInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecordInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecordInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRecordInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecordInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecordInputSchema) ]),
}).strict();

export const UserUpdateWithoutRecordInputSchema: z.ZodType<Prisma.UserUpdateWithoutRecordInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutRecordInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRecordInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isDelete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordCreateManyAuthorInputSchema: z.ZodType<Prisma.RecordCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const RecordUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUpdateWithoutAuthorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TodoFindFirstArgsSchema: z.ZodType<Prisma.TodoFindFirstArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TodoFindFirstOrThrowArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoFindManyArgsSchema: z.ZodType<Prisma.TodoFindManyArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoAggregateArgsSchema: z.ZodType<Prisma.TodoAggregateArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TodoGroupByArgsSchema: z.ZodType<Prisma.TodoGroupByArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithAggregationInputSchema.array(),TodoOrderByWithAggregationInputSchema ]).optional(),
  by: TodoScalarFieldEnumSchema.array(),
  having: TodoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TodoFindUniqueArgsSchema: z.ZodType<Prisma.TodoFindUniqueArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TodoFindUniqueOrThrowArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const RecordFindFirstArgsSchema: z.ZodType<Prisma.RecordFindFirstArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecordFindFirstOrThrowArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordFindManyArgsSchema: z.ZodType<Prisma.RecordFindManyArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordAggregateArgsSchema: z.ZodType<Prisma.RecordAggregateArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecordGroupByArgsSchema: z.ZodType<Prisma.RecordGroupByArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithAggregationInputSchema.array(),RecordOrderByWithAggregationInputSchema ]).optional(),
  by: RecordScalarFieldEnumSchema.array(),
  having: RecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecordFindUniqueArgsSchema: z.ZodType<Prisma.RecordFindUniqueArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecordFindUniqueOrThrowArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const TodoCreateArgsSchema: z.ZodType<Prisma.TodoCreateArgs> = z.object({
  select: TodoSelectSchema.optional(),
  data: z.union([ TodoCreateInputSchema,TodoUncheckedCreateInputSchema ]),
}).strict() ;

export const TodoUpsertArgsSchema: z.ZodType<Prisma.TodoUpsertArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
  create: z.union([ TodoCreateInputSchema,TodoUncheckedCreateInputSchema ]),
  update: z.union([ TodoUpdateInputSchema,TodoUncheckedUpdateInputSchema ]),
}).strict() ;

export const TodoCreateManyArgsSchema: z.ZodType<Prisma.TodoCreateManyArgs> = z.object({
  data: z.union([ TodoCreateManyInputSchema,TodoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TodoDeleteArgsSchema: z.ZodType<Prisma.TodoDeleteArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoUpdateArgsSchema: z.ZodType<Prisma.TodoUpdateArgs> = z.object({
  select: TodoSelectSchema.optional(),
  data: z.union([ TodoUpdateInputSchema,TodoUncheckedUpdateInputSchema ]),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoUpdateManyArgsSchema: z.ZodType<Prisma.TodoUpdateManyArgs> = z.object({
  data: z.union([ TodoUpdateManyMutationInputSchema,TodoUncheckedUpdateManyInputSchema ]),
  where: TodoWhereInputSchema.optional(),
}).strict() ;

export const TodoDeleteManyArgsSchema: z.ZodType<Prisma.TodoDeleteManyArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const RecordCreateArgsSchema: z.ZodType<Prisma.RecordCreateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  data: z.union([ RecordCreateInputSchema,RecordUncheckedCreateInputSchema ]),
}).strict() ;

export const RecordUpsertArgsSchema: z.ZodType<Prisma.RecordUpsertArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereUniqueInputSchema,
  create: z.union([ RecordCreateInputSchema,RecordUncheckedCreateInputSchema ]),
  update: z.union([ RecordUpdateInputSchema,RecordUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecordCreateManyArgsSchema: z.ZodType<Prisma.RecordCreateManyArgs> = z.object({
  data: z.union([ RecordCreateManyInputSchema,RecordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecordDeleteArgsSchema: z.ZodType<Prisma.RecordDeleteArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordUpdateArgsSchema: z.ZodType<Prisma.RecordUpdateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: RecordIncludeSchema.optional(),
  data: z.union([ RecordUpdateInputSchema,RecordUncheckedUpdateInputSchema ]),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordUpdateManyArgsSchema: z.ZodType<Prisma.RecordUpdateManyArgs> = z.object({
  data: z.union([ RecordUpdateManyMutationInputSchema,RecordUncheckedUpdateManyInputSchema ]),
  where: RecordWhereInputSchema.optional(),
}).strict() ;

export const RecordDeleteManyArgsSchema: z.ZodType<Prisma.RecordDeleteManyArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
}).strict() ;
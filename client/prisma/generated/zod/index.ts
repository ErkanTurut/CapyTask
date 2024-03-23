import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "image_uri",
  "email",
  "first_name",
  "last_name",
  "createdAt",
  "updatedAt",
  "external_id",
]);

export const TeamScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "image_uri",
  "created_at",
  "updated_at",
  "workspace_id",
  "identity",
]);

export const WorkspaceScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "created_at",
  "updated_at",
  "url_key",
  "created_by",
  "image_uri",
]);

export const User_teamScalarFieldEnumSchema = z.enum([
  "user_id",
  "team_id",
  "role_id",
]);

export const User_workspaceScalarFieldEnumSchema = z.enum([
  "user_id",
  "workspace_id",
  "role_id",
]);

export const RoleScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "permissions",
]);

export const Inspection_templateScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "created_at",
  "updated_at",
  "team_id",
]);

export const Inspection_template_snapshotScalarFieldEnumSchema = z.enum([
  "id",
  "version",
  "name",
  "description",
  "created_at",
  "updated_at",
  "inspection_template_id",
]);

export const Step_templateScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "created_at",
  "updated_at",
  "parent_step_id",
  "created_by_id",
  "order",
  "inspection_template_id",
  "inspection_template_snapshot_id",
]);

export const InspectionScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "created_at",
  "updated_at",
  "team_id",
  "status",
  "inspection_snapshot_id",
]);

export const StepScalarFieldEnumSchema = z.enum([
  "id",
  "inspection_id",
  "step_id",
  "status",
  "created_at",
  "updated_at",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const StatusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "ON_HOLD",
  "CANCELED",
]);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

export const RoleSchema = z.enum([
  "ADMIN",
  "MANAGER",
  "SUPERVISOR",
  "TECHNICIAN",
  "ENGINEER",
  "QUALITY_INSPECTOR",
  "OPERATOR",
  "OTHER",
]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const PermissionSchema = z.enum([
  "FULL_ACCESS",
  "CAN_EDIT",
  "CAN_COMMENT",
  "CAN_VIEW",
  "NO_ACCESS",
]);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`;

export const PrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export type PriorityType = `${z.infer<typeof PrioritySchema>}`;

export const inspectionTypeSchema = z.enum([
  "INSPECTION",
  "MAINTENANCE",
  "OTHER",
]);

export type inspectionTypeType = `${z.infer<typeof inspectionTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.string(),
  image_uri: z.string().nullable(),
  email: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  external_id: z.string().nullable(),
});

export type user = z.infer<typeof userSchema>;

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image_uri: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  workspace_id: z.string(),
  identity: z.string(),
});

export type team = z.infer<typeof teamSchema>;

/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  url_key: z.string(),
  created_by: z.string(),
  image_uri: z.string().nullable(),
});

export type workspace = z.infer<typeof workspaceSchema>;

/////////////////////////////////////////
// USER TEAM SCHEMA
/////////////////////////////////////////

export const user_teamSchema = z.object({
  user_id: z.string(),
  team_id: z.string(),
  role_id: z.string().nullable(),
});

export type user_team = z.infer<typeof user_teamSchema>;

/////////////////////////////////////////
// USER WORKSPACE SCHEMA
/////////////////////////////////////////

export const user_workspaceSchema = z.object({
  user_id: z.string(),
  workspace_id: z.string(),
  role_id: z.string().nullable(),
});

export type user_workspace = z.infer<typeof user_workspaceSchema>;

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const roleSchema = z.object({
  name: RoleSchema,
  permissions: PermissionSchema.array(),
  id: z.string(),
  description: z.string(),
});

export type role = z.infer<typeof roleSchema>;

/////////////////////////////////////////
// INSPECTION TEMPLATE SCHEMA
/////////////////////////////////////////

export const inspection_templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  team_id: z.string(),
});

export type inspection_template = z.infer<typeof inspection_templateSchema>;

/////////////////////////////////////////
// INSPECTION TEMPLATE SNAPSHOT SCHEMA
/////////////////////////////////////////

export const inspection_template_snapshotSchema = z.object({
  id: z.string(),
  version: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  inspection_template_id: z.string(),
});

export type inspection_template_snapshot = z.infer<
  typeof inspection_template_snapshotSchema
>;

/////////////////////////////////////////
// STEP TEMPLATE SCHEMA
/////////////////////////////////////////

export const step_templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  parent_step_id: z.string().nullable(),
  created_by_id: z.string().nullable(),
  order: z.number().int().nullable(),
  inspection_template_id: z.string(),
  inspection_template_snapshot_id: z.string().nullable(),
});

export type step_template = z.infer<typeof step_templateSchema>;

/////////////////////////////////////////
// INSPECTION SCHEMA
/////////////////////////////////////////

export const inspectionSchema = z.object({
  status: StatusSchema,
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  team_id: z.string(),
  inspection_snapshot_id: z.string().nullable(),
});

export type inspection = z.infer<typeof inspectionSchema>;

/////////////////////////////////////////
// STEP SCHEMA
/////////////////////////////////////////

export const stepSchema = z.object({
  status: StatusSchema,
  id: z.string(),
  inspection_id: z.string(),
  step_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type step = z.infer<typeof stepSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const userIncludeSchema: z.ZodType<Prisma.userInclude> = z
  .object({
    step_template: z
      .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
      .optional(),
    user_team: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    workspaces: z
      .union([z.boolean(), z.lazy(() => workspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const userArgsSchema: z.ZodType<Prisma.userDefaultArgs> = z
  .object({
    select: z.lazy(() => userSelectSchema).optional(),
    include: z.lazy(() => userIncludeSchema).optional(),
  })
  .strict();

export const userCountOutputTypeArgsSchema: z.ZodType<Prisma.userCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => userCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const userCountOutputTypeSelectSchema: z.ZodType<Prisma.userCountOutputTypeSelect> =
  z
    .object({
      step_template: z.boolean().optional(),
      user_team: z.boolean().optional(),
      user_workspace: z.boolean().optional(),
      workspaces: z.boolean().optional(),
    })
    .strict();

export const userSelectSchema: z.ZodType<Prisma.userSelect> = z
  .object({
    id: z.boolean().optional(),
    image_uri: z.boolean().optional(),
    email: z.boolean().optional(),
    first_name: z.boolean().optional(),
    last_name: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    external_id: z.boolean().optional(),
    step_template: z
      .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
      .optional(),
    user_team: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    workspaces: z
      .union([z.boolean(), z.lazy(() => workspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// TEAM
//------------------------------------------------------

export const teamIncludeSchema: z.ZodType<Prisma.teamInclude> = z
  .object({
    inspection_template: z
      .union([z.boolean(), z.lazy(() => inspection_templateFindManyArgsSchema)])
      .optional(),
    workspace: z
      .union([z.boolean(), z.lazy(() => workspaceArgsSchema)])
      .optional(),
    users: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    inspection: z
      .union([z.boolean(), z.lazy(() => inspectionFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeamCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const teamArgsSchema: z.ZodType<Prisma.teamDefaultArgs> = z
  .object({
    select: z.lazy(() => teamSelectSchema).optional(),
    include: z.lazy(() => teamIncludeSchema).optional(),
  })
  .strict();

export const teamCountOutputTypeArgsSchema: z.ZodType<Prisma.teamCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => teamCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const teamCountOutputTypeSelectSchema: z.ZodType<Prisma.teamCountOutputTypeSelect> =
  z
    .object({
      inspection_template: z.boolean().optional(),
      users: z.boolean().optional(),
      inspection: z.boolean().optional(),
    })
    .strict();

export const teamSelectSchema: z.ZodType<Prisma.teamSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    image_uri: z.boolean().optional(),
    created_at: z.boolean().optional(),
    updated_at: z.boolean().optional(),
    workspace_id: z.boolean().optional(),
    identity: z.boolean().optional(),
    inspection_template: z
      .union([z.boolean(), z.lazy(() => inspection_templateFindManyArgsSchema)])
      .optional(),
    workspace: z
      .union([z.boolean(), z.lazy(() => workspaceArgsSchema)])
      .optional(),
    users: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    inspection: z
      .union([z.boolean(), z.lazy(() => inspectionFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeamCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// WORKSPACE
//------------------------------------------------------

export const workspaceIncludeSchema: z.ZodType<Prisma.workspaceInclude> = z
  .object({
    team: z
      .union([z.boolean(), z.lazy(() => teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => WorkspaceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const workspaceArgsSchema: z.ZodType<Prisma.workspaceDefaultArgs> = z
  .object({
    select: z.lazy(() => workspaceSelectSchema).optional(),
    include: z.lazy(() => workspaceIncludeSchema).optional(),
  })
  .strict();

export const workspaceCountOutputTypeArgsSchema: z.ZodType<Prisma.workspaceCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => workspaceCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const workspaceCountOutputTypeSelectSchema: z.ZodType<Prisma.workspaceCountOutputTypeSelect> =
  z
    .object({
      team: z.boolean().optional(),
      user_workspace: z.boolean().optional(),
    })
    .strict();

export const workspaceSelectSchema: z.ZodType<Prisma.workspaceSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    created_at: z.boolean().optional(),
    updated_at: z.boolean().optional(),
    url_key: z.boolean().optional(),
    created_by: z.boolean().optional(),
    image_uri: z.boolean().optional(),
    team: z
      .union([z.boolean(), z.lazy(() => teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => WorkspaceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USER TEAM
//------------------------------------------------------

export const user_teamIncludeSchema: z.ZodType<Prisma.user_teamInclude> = z
  .object({
    role: z.union([z.boolean(), z.lazy(() => roleArgsSchema)]).optional(),
    team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
  })
  .strict();

export const user_teamArgsSchema: z.ZodType<Prisma.user_teamDefaultArgs> = z
  .object({
    select: z.lazy(() => user_teamSelectSchema).optional(),
    include: z.lazy(() => user_teamIncludeSchema).optional(),
  })
  .strict();

export const user_teamSelectSchema: z.ZodType<Prisma.user_teamSelect> = z
  .object({
    user_id: z.boolean().optional(),
    team_id: z.boolean().optional(),
    role_id: z.boolean().optional(),
    role: z.union([z.boolean(), z.lazy(() => roleArgsSchema)]).optional(),
    team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
  })
  .strict();

// USER WORKSPACE
//------------------------------------------------------

export const user_workspaceIncludeSchema: z.ZodType<Prisma.user_workspaceInclude> =
  z
    .object({
      role: z.union([z.boolean(), z.lazy(() => roleArgsSchema)]).optional(),
      user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
      workspace: z
        .union([z.boolean(), z.lazy(() => workspaceArgsSchema)])
        .optional(),
    })
    .strict();

export const user_workspaceArgsSchema: z.ZodType<Prisma.user_workspaceDefaultArgs> =
  z
    .object({
      select: z.lazy(() => user_workspaceSelectSchema).optional(),
      include: z.lazy(() => user_workspaceIncludeSchema).optional(),
    })
    .strict();

export const user_workspaceSelectSchema: z.ZodType<Prisma.user_workspaceSelect> =
  z
    .object({
      user_id: z.boolean().optional(),
      workspace_id: z.boolean().optional(),
      role_id: z.boolean().optional(),
      role: z.union([z.boolean(), z.lazy(() => roleArgsSchema)]).optional(),
      user: z.union([z.boolean(), z.lazy(() => userArgsSchema)]).optional(),
      workspace: z
        .union([z.boolean(), z.lazy(() => workspaceArgsSchema)])
        .optional(),
    })
    .strict();

// ROLE
//------------------------------------------------------

export const roleIncludeSchema: z.ZodType<Prisma.roleInclude> = z
  .object({
    user_team: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RoleCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const roleArgsSchema: z.ZodType<Prisma.roleDefaultArgs> = z
  .object({
    select: z.lazy(() => roleSelectSchema).optional(),
    include: z.lazy(() => roleIncludeSchema).optional(),
  })
  .strict();

export const roleCountOutputTypeArgsSchema: z.ZodType<Prisma.roleCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => roleCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const roleCountOutputTypeSelectSchema: z.ZodType<Prisma.roleCountOutputTypeSelect> =
  z
    .object({
      user_team: z.boolean().optional(),
      user_workspace: z.boolean().optional(),
    })
    .strict();

export const roleSelectSchema: z.ZodType<Prisma.roleSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    permissions: z.boolean().optional(),
    user_team: z
      .union([z.boolean(), z.lazy(() => user_teamFindManyArgsSchema)])
      .optional(),
    user_workspace: z
      .union([z.boolean(), z.lazy(() => user_workspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RoleCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// INSPECTION TEMPLATE
//------------------------------------------------------

export const inspection_templateIncludeSchema: z.ZodType<Prisma.inspection_templateInclude> =
  z
    .object({
      team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
      step_template: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection_template_snapshot: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Inspection_templateCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateArgsSchema: z.ZodType<Prisma.inspection_templateDefaultArgs> =
  z
    .object({
      select: z.lazy(() => inspection_templateSelectSchema).optional(),
      include: z.lazy(() => inspection_templateIncludeSchema).optional(),
    })
    .strict();

export const inspection_templateCountOutputTypeArgsSchema: z.ZodType<Prisma.inspection_templateCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => inspection_templateCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const inspection_templateCountOutputTypeSelectSchema: z.ZodType<Prisma.inspection_templateCountOutputTypeSelect> =
  z
    .object({
      step_template: z.boolean().optional(),
      inspection_template_snapshot: z.boolean().optional(),
    })
    .strict();

export const inspection_templateSelectSchema: z.ZodType<Prisma.inspection_templateSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      created_at: z.boolean().optional(),
      updated_at: z.boolean().optional(),
      team_id: z.boolean().optional(),
      team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
      step_template: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection_template_snapshot: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Inspection_templateCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// INSPECTION TEMPLATE SNAPSHOT
//------------------------------------------------------

export const inspection_template_snapshotIncludeSchema: z.ZodType<Prisma.inspection_template_snapshotInclude> =
  z
    .object({
      inspection_template: z
        .union([z.boolean(), z.lazy(() => inspection_templateArgsSchema)])
        .optional(),
      step_template: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection: z
        .union([z.boolean(), z.lazy(() => inspectionFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Inspection_template_snapshotCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotArgsSchema: z.ZodType<Prisma.inspection_template_snapshotDefaultArgs> =
  z
    .object({
      select: z.lazy(() => inspection_template_snapshotSelectSchema).optional(),
      include: z
        .lazy(() => inspection_template_snapshotIncludeSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCountOutputTypeArgsSchema: z.ZodType<Prisma.inspection_template_snapshotCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => inspection_template_snapshotCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const inspection_template_snapshotCountOutputTypeSelectSchema: z.ZodType<Prisma.inspection_template_snapshotCountOutputTypeSelect> =
  z
    .object({
      step_template: z.boolean().optional(),
      inspection: z.boolean().optional(),
    })
    .strict();

export const inspection_template_snapshotSelectSchema: z.ZodType<Prisma.inspection_template_snapshotSelect> =
  z
    .object({
      id: z.boolean().optional(),
      version: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      created_at: z.boolean().optional(),
      updated_at: z.boolean().optional(),
      inspection_template_id: z.boolean().optional(),
      inspection_template: z
        .union([z.boolean(), z.lazy(() => inspection_templateArgsSchema)])
        .optional(),
      step_template: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection: z
        .union([z.boolean(), z.lazy(() => inspectionFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Inspection_template_snapshotCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// STEP TEMPLATE
//------------------------------------------------------

export const step_templateIncludeSchema: z.ZodType<Prisma.step_templateInclude> =
  z
    .object({
      inspection_template: z
        .union([z.boolean(), z.lazy(() => inspection_templateArgsSchema)])
        .optional(),
      created_by: z
        .union([z.boolean(), z.lazy(() => userArgsSchema)])
        .optional(),
      parent_step: z
        .union([z.boolean(), z.lazy(() => step_templateArgsSchema)])
        .optional(),
      sub_steps: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection_template_snapshot: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotArgsSchema),
        ])
        .optional(),
      step: z
        .union([z.boolean(), z.lazy(() => stepFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Step_templateCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateArgsSchema: z.ZodType<Prisma.step_templateDefaultArgs> =
  z
    .object({
      select: z.lazy(() => step_templateSelectSchema).optional(),
      include: z.lazy(() => step_templateIncludeSchema).optional(),
    })
    .strict();

export const step_templateCountOutputTypeArgsSchema: z.ZodType<Prisma.step_templateCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => step_templateCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const step_templateCountOutputTypeSelectSchema: z.ZodType<Prisma.step_templateCountOutputTypeSelect> =
  z
    .object({
      sub_steps: z.boolean().optional(),
      step: z.boolean().optional(),
    })
    .strict();

export const step_templateSelectSchema: z.ZodType<Prisma.step_templateSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      created_at: z.boolean().optional(),
      updated_at: z.boolean().optional(),
      parent_step_id: z.boolean().optional(),
      created_by_id: z.boolean().optional(),
      order: z.boolean().optional(),
      inspection_template_id: z.boolean().optional(),
      inspection_template_snapshot_id: z.boolean().optional(),
      inspection_template: z
        .union([z.boolean(), z.lazy(() => inspection_templateArgsSchema)])
        .optional(),
      created_by: z
        .union([z.boolean(), z.lazy(() => userArgsSchema)])
        .optional(),
      parent_step: z
        .union([z.boolean(), z.lazy(() => step_templateArgsSchema)])
        .optional(),
      sub_steps: z
        .union([z.boolean(), z.lazy(() => step_templateFindManyArgsSchema)])
        .optional(),
      inspection_template_snapshot: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotArgsSchema),
        ])
        .optional(),
      step: z
        .union([z.boolean(), z.lazy(() => stepFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Step_templateCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// INSPECTION
//------------------------------------------------------

export const inspectionIncludeSchema: z.ZodType<Prisma.inspectionInclude> = z
  .object({
    team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
    inspection_snapshot: z
      .union([
        z.boolean(),
        z.lazy(() => inspection_template_snapshotArgsSchema),
      ])
      .optional(),
    step: z
      .union([z.boolean(), z.lazy(() => stepFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => InspectionCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const inspectionArgsSchema: z.ZodType<Prisma.inspectionDefaultArgs> = z
  .object({
    select: z.lazy(() => inspectionSelectSchema).optional(),
    include: z.lazy(() => inspectionIncludeSchema).optional(),
  })
  .strict();

export const inspectionCountOutputTypeArgsSchema: z.ZodType<Prisma.inspectionCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => inspectionCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const inspectionCountOutputTypeSelectSchema: z.ZodType<Prisma.inspectionCountOutputTypeSelect> =
  z
    .object({
      step: z.boolean().optional(),
    })
    .strict();

export const inspectionSelectSchema: z.ZodType<Prisma.inspectionSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    created_at: z.boolean().optional(),
    updated_at: z.boolean().optional(),
    team_id: z.boolean().optional(),
    status: z.boolean().optional(),
    inspection_snapshot_id: z.boolean().optional(),
    team: z.union([z.boolean(), z.lazy(() => teamArgsSchema)]).optional(),
    inspection_snapshot: z
      .union([
        z.boolean(),
        z.lazy(() => inspection_template_snapshotArgsSchema),
      ])
      .optional(),
    step: z
      .union([z.boolean(), z.lazy(() => stepFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => InspectionCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// STEP
//------------------------------------------------------

export const stepIncludeSchema: z.ZodType<Prisma.stepInclude> = z
  .object({
    inspection: z
      .union([z.boolean(), z.lazy(() => inspectionArgsSchema)])
      .optional(),
    step: z
      .union([z.boolean(), z.lazy(() => step_templateArgsSchema)])
      .optional(),
  })
  .strict();

export const stepArgsSchema: z.ZodType<Prisma.stepDefaultArgs> = z
  .object({
    select: z.lazy(() => stepSelectSchema).optional(),
    include: z.lazy(() => stepIncludeSchema).optional(),
  })
  .strict();

export const stepSelectSchema: z.ZodType<Prisma.stepSelect> = z
  .object({
    id: z.boolean().optional(),
    inspection_id: z.boolean().optional(),
    step_id: z.boolean().optional(),
    status: z.boolean().optional(),
    created_at: z.boolean().optional(),
    updated_at: z.boolean().optional(),
    inspection: z
      .union([z.boolean(), z.lazy(() => inspectionArgsSchema)])
      .optional(),
    step: z
      .union([z.boolean(), z.lazy(() => step_templateArgsSchema)])
      .optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const userWhereInputSchema: z.ZodType<Prisma.userWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => userWhereInputSchema),
        z.lazy(() => userWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => userWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => userWhereInputSchema),
        z.lazy(() => userWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    image_uri: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    first_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    last_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    external_id: z
      .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    step_template: z
      .lazy(() => Step_templateListRelationFilterSchema)
      .optional(),
    user_team: z.lazy(() => User_teamListRelationFilterSchema).optional(),
    user_workspace: z
      .lazy(() => User_workspaceListRelationFilterSchema)
      .optional(),
    workspaces: z.lazy(() => WorkspaceListRelationFilterSchema).optional(),
  })
  .strict();

export const userOrderByWithRelationInputSchema: z.ZodType<Prisma.userOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      last_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      external_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(() => step_templateOrderByRelationAggregateInputSchema)
        .optional(),
      user_team: z
        .lazy(() => user_teamOrderByRelationAggregateInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceOrderByRelationAggregateInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const userWhereUniqueInputSchema: z.ZodType<Prisma.userWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        email: z.string(),
        external_id: z.string(),
      }),
      z.object({
        id: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
        external_id: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        email: z.string(),
        external_id: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
      z.object({
        external_id: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          email: z.string().optional(),
          external_id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => userWhereInputSchema),
              z.lazy(() => userWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => userWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => userWhereInputSchema),
              z.lazy(() => userWhereInputSchema).array(),
            ])
            .optional(),
          image_uri: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          first_name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          last_name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          step_template: z
            .lazy(() => Step_templateListRelationFilterSchema)
            .optional(),
          user_team: z.lazy(() => User_teamListRelationFilterSchema).optional(),
          user_workspace: z
            .lazy(() => User_workspaceListRelationFilterSchema)
            .optional(),
          workspaces: z
            .lazy(() => WorkspaceListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const userOrderByWithAggregationInputSchema: z.ZodType<Prisma.userOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      last_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      external_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => userCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => userMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => userMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const userScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.userScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => userScalarWhereWithAggregatesInputSchema),
          z.lazy(() => userScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => userScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => userScalarWhereWithAggregatesInputSchema),
          z.lazy(() => userScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      image_uri: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      first_name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      external_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const teamWhereInputSchema: z.ZodType<Prisma.teamWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => teamWhereInputSchema),
        z.lazy(() => teamWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => teamWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => teamWhereInputSchema),
        z.lazy(() => teamWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    image_uri: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    workspace_id: z
      .union([z.lazy(() => UuidFilterSchema), z.string()])
      .optional(),
    identity: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    inspection_template: z
      .lazy(() => Inspection_templateListRelationFilterSchema)
      .optional(),
    workspace: z
      .union([
        z.lazy(() => WorkspaceRelationFilterSchema),
        z.lazy(() => workspaceWhereInputSchema),
      ])
      .optional(),
    users: z.lazy(() => User_teamListRelationFilterSchema).optional(),
    inspection: z.lazy(() => InspectionListRelationFilterSchema).optional(),
  })
  .strict();

export const teamOrderByWithRelationInputSchema: z.ZodType<Prisma.teamOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      identity: z.lazy(() => SortOrderSchema).optional(),
      inspection_template: z
        .lazy(() => inspection_templateOrderByRelationAggregateInputSchema)
        .optional(),
      workspace: z
        .lazy(() => workspaceOrderByWithRelationInputSchema)
        .optional(),
      users: z
        .lazy(() => user_teamOrderByRelationAggregateInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const teamWhereUniqueInputSchema: z.ZodType<Prisma.teamWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        identity_workspace_id: z.lazy(
          () => teamIdentityWorkspace_idCompoundUniqueInputSchema,
        ),
        name_workspace_id: z.lazy(
          () => teamNameWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string(),
        identity_workspace_id: z.lazy(
          () => teamIdentityWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string(),
        name_workspace_id: z.lazy(
          () => teamNameWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        identity_workspace_id: z.lazy(
          () => teamIdentityWorkspace_idCompoundUniqueInputSchema,
        ),
        name_workspace_id: z.lazy(
          () => teamNameWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        identity_workspace_id: z.lazy(
          () => teamIdentityWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        name_workspace_id: z.lazy(
          () => teamNameWorkspace_idCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          identity_workspace_id: z
            .lazy(() => teamIdentityWorkspace_idCompoundUniqueInputSchema)
            .optional(),
          name_workspace_id: z
            .lazy(() => teamNameWorkspace_idCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => teamWhereInputSchema),
              z.lazy(() => teamWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => teamWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => teamWhereInputSchema),
              z.lazy(() => teamWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          image_uri: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          workspace_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          identity: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          inspection_template: z
            .lazy(() => Inspection_templateListRelationFilterSchema)
            .optional(),
          workspace: z
            .union([
              z.lazy(() => WorkspaceRelationFilterSchema),
              z.lazy(() => workspaceWhereInputSchema),
            ])
            .optional(),
          users: z.lazy(() => User_teamListRelationFilterSchema).optional(),
          inspection: z
            .lazy(() => InspectionListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const teamOrderByWithAggregationInputSchema: z.ZodType<Prisma.teamOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      identity: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => teamCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => teamMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => teamMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const teamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.teamScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => teamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => teamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => teamScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => teamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => teamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      workspace_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      identity: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const workspaceWhereInputSchema: z.ZodType<Prisma.workspaceWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => workspaceWhereInputSchema),
          z.lazy(() => workspaceWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => workspaceWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => workspaceWhereInputSchema),
          z.lazy(() => workspaceWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      url_key: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      created_by: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      image_uri: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      team: z.lazy(() => TeamListRelationFilterSchema).optional(),
      user_workspace: z
        .lazy(() => User_workspaceListRelationFilterSchema)
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => userWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const workspaceOrderByWithRelationInputSchema: z.ZodType<Prisma.workspaceOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      url_key: z.lazy(() => SortOrderSchema).optional(),
      created_by: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      team: z.lazy(() => teamOrderByRelationAggregateInputSchema).optional(),
      user_workspace: z
        .lazy(() => user_workspaceOrderByRelationAggregateInputSchema)
        .optional(),
      user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const workspaceWhereUniqueInputSchema: z.ZodType<Prisma.workspaceWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        url_key: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        url_key: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          url_key: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => workspaceWhereInputSchema),
              z.lazy(() => workspaceWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => workspaceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => workspaceWhereInputSchema),
              z.lazy(() => workspaceWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          created_by: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          image_uri: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          team: z.lazy(() => TeamListRelationFilterSchema).optional(),
          user_workspace: z
            .lazy(() => User_workspaceListRelationFilterSchema)
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => userWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const workspaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.workspaceOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      url_key: z.lazy(() => SortOrderSchema).optional(),
      created_by: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => workspaceCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => workspaceMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => workspaceMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const workspaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.workspaceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => workspaceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => workspaceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => workspaceScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => workspaceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => workspaceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      url_key: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      created_by: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      image_uri: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamWhereInputSchema: z.ZodType<Prisma.user_teamWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_teamWhereInputSchema),
          z.lazy(() => user_teamWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_teamWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_teamWhereInputSchema),
          z.lazy(() => user_teamWhereInputSchema).array(),
        ])
        .optional(),
      user_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      role_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => RoleNullableRelationFilterSchema),
          z.lazy(() => roleWhereInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .union([
          z.lazy(() => TeamRelationFilterSchema),
          z.lazy(() => teamWhereInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => userWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_teamOrderByWithRelationInputSchema: z.ZodType<Prisma.user_teamOrderByWithRelationInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      role: z.lazy(() => roleOrderByWithRelationInputSchema).optional(),
      team: z.lazy(() => teamOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const user_teamWhereUniqueInputSchema: z.ZodType<Prisma.user_teamWhereUniqueInput> =
  z
    .object({
      user_id_team_id: z.lazy(
        () => user_teamUser_idTeam_idCompoundUniqueInputSchema,
      ),
    })
    .and(
      z
        .object({
          user_id_team_id: z
            .lazy(() => user_teamUser_idTeam_idCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => user_teamWhereInputSchema),
              z.lazy(() => user_teamWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => user_teamWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => user_teamWhereInputSchema),
              z.lazy(() => user_teamWhereInputSchema).array(),
            ])
            .optional(),
          user_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          team_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          role_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          role: z
            .union([
              z.lazy(() => RoleNullableRelationFilterSchema),
              z.lazy(() => roleWhereInputSchema),
            ])
            .optional()
            .nullable(),
          team: z
            .union([
              z.lazy(() => TeamRelationFilterSchema),
              z.lazy(() => teamWhereInputSchema),
            ])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => userWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const user_teamOrderByWithAggregationInputSchema: z.ZodType<Prisma.user_teamOrderByWithAggregationInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => user_teamCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => user_teamMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => user_teamMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const user_teamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.user_teamScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_teamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => user_teamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_teamScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_teamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => user_teamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      user_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      team_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      role_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceWhereInputSchema: z.ZodType<Prisma.user_workspaceWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_workspaceWhereInputSchema),
          z.lazy(() => user_workspaceWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_workspaceWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_workspaceWhereInputSchema),
          z.lazy(() => user_workspaceWhereInputSchema).array(),
        ])
        .optional(),
      user_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      workspace_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      role_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => RoleNullableRelationFilterSchema),
          z.lazy(() => roleWhereInputSchema),
        ])
        .optional()
        .nullable(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => userWhereInputSchema),
        ])
        .optional(),
      workspace: z
        .union([
          z.lazy(() => WorkspaceRelationFilterSchema),
          z.lazy(() => workspaceWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceOrderByWithRelationInputSchema: z.ZodType<Prisma.user_workspaceOrderByWithRelationInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      role: z.lazy(() => roleOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
      workspace: z
        .lazy(() => workspaceOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const user_workspaceWhereUniqueInputSchema: z.ZodType<Prisma.user_workspaceWhereUniqueInput> =
  z
    .object({
      user_id_workspace_id: z.lazy(
        () => user_workspaceUser_idWorkspace_idCompoundUniqueInputSchema,
      ),
    })
    .and(
      z
        .object({
          user_id_workspace_id: z
            .lazy(
              () => user_workspaceUser_idWorkspace_idCompoundUniqueInputSchema,
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => user_workspaceWhereInputSchema),
              z.lazy(() => user_workspaceWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => user_workspaceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => user_workspaceWhereInputSchema),
              z.lazy(() => user_workspaceWhereInputSchema).array(),
            ])
            .optional(),
          user_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          workspace_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          role_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          role: z
            .union([
              z.lazy(() => RoleNullableRelationFilterSchema),
              z.lazy(() => roleWhereInputSchema),
            ])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => userWhereInputSchema),
            ])
            .optional(),
          workspace: z
            .union([
              z.lazy(() => WorkspaceRelationFilterSchema),
              z.lazy(() => workspaceWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const user_workspaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.user_workspaceOrderByWithAggregationInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => user_workspaceCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => user_workspaceMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => user_workspaceMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const user_workspaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.user_workspaceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_workspaceScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => user_workspaceScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_workspaceScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_workspaceScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => user_workspaceScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      user_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      workspace_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      role_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const roleWhereInputSchema: z.ZodType<Prisma.roleWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => roleWhereInputSchema),
        z.lazy(() => roleWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => roleWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => roleWhereInputSchema),
        z.lazy(() => roleWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    name: z
      .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    permissions: z
      .lazy(() => EnumPermissionNullableListFilterSchema)
      .optional(),
    user_team: z.lazy(() => User_teamListRelationFilterSchema).optional(),
    user_workspace: z
      .lazy(() => User_workspaceListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const roleOrderByWithRelationInputSchema: z.ZodType<Prisma.roleOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
      user_team: z
        .lazy(() => user_teamOrderByRelationAggregateInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const roleWhereUniqueInputSchema: z.ZodType<Prisma.roleWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => roleWhereInputSchema),
              z.lazy(() => roleWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => roleWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => roleWhereInputSchema),
              z.lazy(() => roleWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([
              z.lazy(() => EnumRoleFilterSchema),
              z.lazy(() => RoleSchema),
            ])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          permissions: z
            .lazy(() => EnumPermissionNullableListFilterSchema)
            .optional(),
          user_team: z.lazy(() => User_teamListRelationFilterSchema).optional(),
          user_workspace: z
            .lazy(() => User_workspaceListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const roleOrderByWithAggregationInputSchema: z.ZodType<Prisma.roleOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => roleCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => roleMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => roleMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const roleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.roleScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => roleScalarWhereWithAggregatesInputSchema),
          z.lazy(() => roleScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => roleScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => roleScalarWhereWithAggregatesInputSchema),
          z.lazy(() => roleScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([
          z.lazy(() => EnumRoleWithAggregatesFilterSchema),
          z.lazy(() => RoleSchema),
        ])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      permissions: z
        .lazy(() => EnumPermissionNullableListFilterSchema)
        .optional(),
    })
    .strict();

export const inspection_templateWhereInputSchema: z.ZodType<Prisma.inspection_templateWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspection_templateWhereInputSchema),
          z.lazy(() => inspection_templateWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspection_templateWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspection_templateWhereInputSchema),
          z.lazy(() => inspection_templateWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      team: z
        .union([
          z.lazy(() => TeamRelationFilterSchema),
          z.lazy(() => teamWhereInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(() => Step_templateListRelationFilterSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(() => Inspection_template_snapshotListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const inspection_templateOrderByWithRelationInputSchema: z.ZodType<Prisma.inspection_templateOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      team: z.lazy(() => teamOrderByWithRelationInputSchema).optional(),
      step_template: z
        .lazy(() => step_templateOrderByRelationAggregateInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () => inspection_template_snapshotOrderByRelationAggregateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateWhereUniqueInputSchema: z.ZodType<Prisma.inspection_templateWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => inspection_templateWhereInputSchema),
              z.lazy(() => inspection_templateWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => inspection_templateWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => inspection_templateWhereInputSchema),
              z.lazy(() => inspection_templateWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          team_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          team: z
            .union([
              z.lazy(() => TeamRelationFilterSchema),
              z.lazy(() => teamWhereInputSchema),
            ])
            .optional(),
          step_template: z
            .lazy(() => Step_templateListRelationFilterSchema)
            .optional(),
          inspection_template_snapshot: z
            .lazy(() => Inspection_template_snapshotListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const inspection_templateOrderByWithAggregationInputSchema: z.ZodType<Prisma.inspection_templateOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => inspection_templateCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => inspection_templateMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => inspection_templateMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const inspection_templateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.inspection_templateScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspection_templateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => inspection_templateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspection_templateScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspection_templateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => inspection_templateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      team_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotWhereInputSchema: z.ZodType<Prisma.inspection_template_snapshotWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
          z.lazy(() => inspection_template_snapshotWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
          z.lazy(() => inspection_template_snapshotWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      inspection_template_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      inspection_template: z
        .union([
          z.lazy(() => Inspection_templateRelationFilterSchema),
          z.lazy(() => inspection_templateWhereInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(() => Step_templateListRelationFilterSchema)
        .optional(),
      inspection: z.lazy(() => InspectionListRelationFilterSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.inspection_template_snapshotOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template: z
        .lazy(() => inspection_templateOrderByWithRelationInputSchema)
        .optional(),
      step_template: z
        .lazy(() => step_templateOrderByRelationAggregateInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotWhereUniqueInputSchema: z.ZodType<Prisma.inspection_template_snapshotWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => inspection_template_snapshotWhereInputSchema),
              z
                .lazy(() => inspection_template_snapshotWhereInputSchema)
                .array(),
            ])
            .optional(),
          OR: z
            .lazy(() => inspection_template_snapshotWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => inspection_template_snapshotWhereInputSchema),
              z
                .lazy(() => inspection_template_snapshotWhereInputSchema)
                .array(),
            ])
            .optional(),
          version: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          inspection_template_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          inspection_template: z
            .union([
              z.lazy(() => Inspection_templateRelationFilterSchema),
              z.lazy(() => inspection_templateWhereInputSchema),
            ])
            .optional(),
          step_template: z
            .lazy(() => Step_templateListRelationFilterSchema)
            .optional(),
          inspection: z
            .lazy(() => InspectionListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const inspection_template_snapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.inspection_template_snapshotOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(
          () => inspection_template_snapshotCountOrderByAggregateInputSchema,
        )
        .optional(),
      _avg: z
        .lazy(() => inspection_template_snapshotAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => inspection_template_snapshotMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => inspection_template_snapshotMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => inspection_template_snapshotSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.inspection_template_snapshotScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () =>
            inspection_template_snapshotScalarWhereWithAggregatesInputSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      version: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      inspection_template_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const step_templateWhereInputSchema: z.ZodType<Prisma.step_templateWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => step_templateWhereInputSchema),
          z.lazy(() => step_templateWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => step_templateWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => step_templateWhereInputSchema),
          z.lazy(() => step_templateWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      parent_step_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_by_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      order: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      inspection_template_snapshot_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      inspection_template: z
        .union([
          z.lazy(() => Inspection_templateRelationFilterSchema),
          z.lazy(() => inspection_templateWhereInputSchema),
        ])
        .optional(),
      created_by: z
        .union([
          z.lazy(() => UserNullableRelationFilterSchema),
          z.lazy(() => userWhereInputSchema),
        ])
        .optional()
        .nullable(),
      parent_step: z
        .union([
          z.lazy(() => Step_templateNullableRelationFilterSchema),
          z.lazy(() => step_templateWhereInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z.lazy(() => Step_templateListRelationFilterSchema).optional(),
      inspection_template_snapshot: z
        .union([
          z.lazy(
            () => Inspection_template_snapshotNullableRelationFilterSchema,
          ),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional()
        .nullable(),
      step: z.lazy(() => StepListRelationFilterSchema).optional(),
    })
    .strict();

export const step_templateOrderByWithRelationInputSchema: z.ZodType<Prisma.step_templateOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      parent_step_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_by_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_snapshot_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(() => inspection_templateOrderByWithRelationInputSchema)
        .optional(),
      created_by: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
      parent_step: z
        .lazy(() => step_templateOrderByWithRelationInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateOrderByRelationAggregateInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(() => inspection_template_snapshotOrderByWithRelationInputSchema)
        .optional(),
      step: z.lazy(() => stepOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const step_templateWhereUniqueInputSchema: z.ZodType<Prisma.step_templateWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => step_templateWhereInputSchema),
              z.lazy(() => step_templateWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => step_templateWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => step_templateWhereInputSchema),
              z.lazy(() => step_templateWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          parent_step_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_by_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          order: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          inspection_template_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          inspection_template_snapshot_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          inspection_template: z
            .union([
              z.lazy(() => Inspection_templateRelationFilterSchema),
              z.lazy(() => inspection_templateWhereInputSchema),
            ])
            .optional(),
          created_by: z
            .union([
              z.lazy(() => UserNullableRelationFilterSchema),
              z.lazy(() => userWhereInputSchema),
            ])
            .optional()
            .nullable(),
          parent_step: z
            .union([
              z.lazy(() => Step_templateNullableRelationFilterSchema),
              z.lazy(() => step_templateWhereInputSchema),
            ])
            .optional()
            .nullable(),
          sub_steps: z
            .lazy(() => Step_templateListRelationFilterSchema)
            .optional(),
          inspection_template_snapshot: z
            .union([
              z.lazy(
                () => Inspection_template_snapshotNullableRelationFilterSchema,
              ),
              z.lazy(() => inspection_template_snapshotWhereInputSchema),
            ])
            .optional()
            .nullable(),
          step: z.lazy(() => StepListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const step_templateOrderByWithAggregationInputSchema: z.ZodType<Prisma.step_templateOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      parent_step_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_by_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_snapshot_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => step_templateCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => step_templateAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => step_templateMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => step_templateMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => step_templateSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const step_templateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.step_templateScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => step_templateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => step_templateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => step_templateScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => step_templateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => step_templateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const inspectionWhereInputSchema: z.ZodType<Prisma.inspectionWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspectionWhereInputSchema),
          z.lazy(() => inspectionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspectionWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspectionWhereInputSchema),
          z.lazy(() => inspectionWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      team: z
        .union([
          z.lazy(() => TeamRelationFilterSchema),
          z.lazy(() => teamWhereInputSchema),
        ])
        .optional(),
      inspection_snapshot: z
        .union([
          z.lazy(
            () => Inspection_template_snapshotNullableRelationFilterSchema,
          ),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional()
        .nullable(),
      step: z.lazy(() => StepListRelationFilterSchema).optional(),
    })
    .strict();

export const inspectionOrderByWithRelationInputSchema: z.ZodType<Prisma.inspectionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      inspection_snapshot_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      team: z.lazy(() => teamOrderByWithRelationInputSchema).optional(),
      inspection_snapshot: z
        .lazy(() => inspection_template_snapshotOrderByWithRelationInputSchema)
        .optional(),
      step: z.lazy(() => stepOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const inspectionWhereUniqueInputSchema: z.ZodType<Prisma.inspectionWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => inspectionWhereInputSchema),
              z.lazy(() => inspectionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => inspectionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => inspectionWhereInputSchema),
              z.lazy(() => inspectionWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          team_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumStatusFilterSchema),
              z.lazy(() => StatusSchema),
            ])
            .optional(),
          inspection_snapshot_id: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          team: z
            .union([
              z.lazy(() => TeamRelationFilterSchema),
              z.lazy(() => teamWhereInputSchema),
            ])
            .optional(),
          inspection_snapshot: z
            .union([
              z.lazy(
                () => Inspection_template_snapshotNullableRelationFilterSchema,
              ),
              z.lazy(() => inspection_template_snapshotWhereInputSchema),
            ])
            .optional()
            .nullable(),
          step: z.lazy(() => StepListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const inspectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.inspectionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      inspection_snapshot_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => inspectionCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => inspectionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => inspectionMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const inspectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.inspectionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspectionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => inspectionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspectionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspectionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => inspectionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      team_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusWithAggregatesFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const stepWhereInputSchema: z.ZodType<Prisma.stepWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => stepWhereInputSchema),
        z.lazy(() => stepWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => stepWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => stepWhereInputSchema),
        z.lazy(() => stepWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    inspection_id: z
      .union([z.lazy(() => UuidFilterSchema), z.string()])
      .optional(),
    step_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    status: z
      .union([z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema)])
      .optional(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    inspection: z
      .union([
        z.lazy(() => InspectionRelationFilterSchema),
        z.lazy(() => inspectionWhereInputSchema),
      ])
      .optional(),
    step: z
      .union([
        z.lazy(() => Step_templateRelationFilterSchema),
        z.lazy(() => step_templateWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const stepOrderByWithRelationInputSchema: z.ZodType<Prisma.stepOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      inspection_id: z.lazy(() => SortOrderSchema).optional(),
      step_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection: z
        .lazy(() => inspectionOrderByWithRelationInputSchema)
        .optional(),
      step: z
        .lazy(() => step_templateOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const stepWhereUniqueInputSchema: z.ZodType<Prisma.stepWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => stepWhereInputSchema),
              z.lazy(() => stepWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => stepWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => stepWhereInputSchema),
              z.lazy(() => stepWhereInputSchema).array(),
            ])
            .optional(),
          inspection_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          step_id: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumStatusFilterSchema),
              z.lazy(() => StatusSchema),
            ])
            .optional(),
          created_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updated_at: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          inspection: z
            .union([
              z.lazy(() => InspectionRelationFilterSchema),
              z.lazy(() => inspectionWhereInputSchema),
            ])
            .optional(),
          step: z
            .union([
              z.lazy(() => Step_templateRelationFilterSchema),
              z.lazy(() => step_templateWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const stepOrderByWithAggregationInputSchema: z.ZodType<Prisma.stepOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      inspection_id: z.lazy(() => SortOrderSchema).optional(),
      step_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => stepCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => stepMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => stepMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const stepScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.stepScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => stepScalarWhereWithAggregatesInputSchema),
          z.lazy(() => stepScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => stepScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => stepScalarWhereWithAggregatesInputSchema),
          z.lazy(() => stepScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      inspection_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      step_id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusWithAggregatesFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updated_at: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const userCreateInputSchema: z.ZodType<Prisma.userCreateInput> = z
  .object({
    id: z.string().optional(),
    image_uri: z.string().optional().nullable(),
    email: z.string(),
    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    external_id: z.string().optional().nullable(),
    step_template: z
      .lazy(() => step_templateCreateNestedManyWithoutCreated_byInputSchema)
      .optional(),
    user_team: z
      .lazy(() => user_teamCreateNestedManyWithoutUserInputSchema)
      .optional(),
    user_workspace: z
      .lazy(() => user_workspaceCreateNestedManyWithoutUserInputSchema)
      .optional(),
    workspaces: z
      .lazy(() => workspaceCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export const userUncheckedCreateInputSchema: z.ZodType<Prisma.userUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutCreated_byInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userUpdateInputSchema: z.ZodType<Prisma.userUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image_uri: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    first_name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    last_name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    external_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    step_template: z
      .lazy(() => step_templateUpdateManyWithoutCreated_byNestedInputSchema)
      .optional(),
    user_team: z
      .lazy(() => user_teamUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    user_workspace: z
      .lazy(() => user_workspaceUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    workspaces: z
      .lazy(() => workspaceUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict();

export const userUncheckedUpdateInputSchema: z.ZodType<Prisma.userUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutCreated_byNestedInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const userCreateManyInputSchema: z.ZodType<Prisma.userCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
    })
    .strict();

export const userUpdateManyMutationInputSchema: z.ZodType<Prisma.userUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const userUncheckedUpdateManyInputSchema: z.ZodType<Prisma.userUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const teamCreateInputSchema: z.ZodType<Prisma.teamCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    image_uri: z.string().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    identity: z.string(),
    inspection_template: z
      .lazy(() => inspection_templateCreateNestedManyWithoutTeamInputSchema)
      .optional(),
    workspace: z.lazy(() => workspaceCreateNestedOneWithoutTeamInputSchema),
    users: z
      .lazy(() => user_teamCreateNestedManyWithoutTeamInputSchema)
      .optional(),
    inspection: z
      .lazy(() => inspectionCreateNestedManyWithoutTeamInputSchema)
      .optional(),
  })
  .strict();

export const teamUncheckedCreateInputSchema: z.ZodType<Prisma.teamUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      workspace_id: z.string(),
      identity: z.string(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedCreateNestedManyWithoutTeamInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamUpdateInputSchema: z.ZodType<Prisma.teamUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image_uri: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    identity: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    inspection_template: z
      .lazy(() => inspection_templateUpdateManyWithoutTeamNestedInputSchema)
      .optional(),
    workspace: z
      .lazy(() => workspaceUpdateOneRequiredWithoutTeamNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => user_teamUpdateManyWithoutTeamNestedInputSchema)
      .optional(),
    inspection: z
      .lazy(() => inspectionUpdateManyWithoutTeamNestedInputSchema)
      .optional(),
  })
  .strict();

export const teamUncheckedUpdateInputSchema: z.ZodType<Prisma.teamUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedUpdateManyWithoutTeamNestedInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamCreateManyInputSchema: z.ZodType<Prisma.teamCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      workspace_id: z.string(),
      identity: z.string(),
    })
    .strict();

export const teamUpdateManyMutationInputSchema: z.ZodType<Prisma.teamUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.teamUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const workspaceCreateInputSchema: z.ZodType<Prisma.workspaceCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutWorkspacesInputSchema),
    })
    .strict();

export const workspaceUncheckedCreateInputSchema: z.ZodType<Prisma.workspaceUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      created_by: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamUncheckedCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedCreateNestedManyWithoutWorkspaceInputSchema,
        )
        .optional(),
    })
    .strict();

export const workspaceUpdateInputSchema: z.ZodType<Prisma.workspaceUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutWorkspacesNestedInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUncheckedUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedUpdateManyWithoutWorkspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const workspaceCreateManyInputSchema: z.ZodType<Prisma.workspaceCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      created_by: z.string(),
      image_uri: z.string().optional().nullable(),
    })
    .strict();

export const workspaceUpdateManyMutationInputSchema: z.ZodType<Prisma.workspaceUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const workspaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamCreateInputSchema: z.ZodType<Prisma.user_teamCreateInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_teamInputSchema)
        .optional(),
      team: z.lazy(() => teamCreateNestedOneWithoutUsersInputSchema),
      user: z.lazy(() => userCreateNestedOneWithoutUser_teamInputSchema),
    })
    .strict();

export const user_teamUncheckedCreateInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateInput> =
  z
    .object({
      user_id: z.string(),
      team_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_teamUpdateInputSchema: z.ZodType<Prisma.user_teamUpdateInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_teamNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutUsersNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_teamNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamCreateManyInputSchema: z.ZodType<Prisma.user_teamCreateManyInput> =
  z
    .object({
      user_id: z.string(),
      team_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_teamUpdateManyMutationInputSchema: z.ZodType<Prisma.user_teamUpdateManyMutationInput> =
  z.object({}).strict();

export const user_teamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceCreateInputSchema: z.ZodType<Prisma.user_workspaceCreateInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_workspaceInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutUser_workspaceInputSchema),
      workspace: z.lazy(
        () => workspaceCreateNestedOneWithoutUser_workspaceInputSchema,
      ),
    })
    .strict();

export const user_workspaceUncheckedCreateInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateInput> =
  z
    .object({
      user_id: z.string(),
      workspace_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_workspaceUpdateInputSchema: z.ZodType<Prisma.user_workspaceUpdateInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_workspaceNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_workspaceNestedInputSchema)
        .optional(),
      workspace: z
        .lazy(
          () =>
            workspaceUpdateOneRequiredWithoutUser_workspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceCreateManyInputSchema: z.ZodType<Prisma.user_workspaceCreateManyInput> =
  z
    .object({
      user_id: z.string(),
      workspace_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_workspaceUpdateManyMutationInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyMutationInput> =
  z.object({}).strict();

export const user_workspaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const roleCreateInputSchema: z.ZodType<Prisma.roleCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.lazy(() => RoleSchema),
    description: z.string(),
    permissions: z
      .union([
        z.lazy(() => roleCreatepermissionsInputSchema),
        z.lazy(() => PermissionSchema).array(),
      ])
      .optional(),
    user_team: z
      .lazy(() => user_teamCreateNestedManyWithoutRoleInputSchema)
      .optional(),
    user_workspace: z
      .lazy(() => user_workspaceCreateNestedManyWithoutRoleInputSchema)
      .optional(),
  })
  .strict();

export const roleUncheckedCreateInputSchema: z.ZodType<Prisma.roleUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutRoleInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutRoleInputSchema,
        )
        .optional(),
    })
    .strict();

export const roleUpdateInputSchema: z.ZodType<Prisma.roleUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    permissions: z
      .union([
        z.lazy(() => roleUpdatepermissionsInputSchema),
        z.lazy(() => PermissionSchema).array(),
      ])
      .optional(),
    user_team: z
      .lazy(() => user_teamUpdateManyWithoutRoleNestedInputSchema)
      .optional(),
    user_workspace: z
      .lazy(() => user_workspaceUpdateManyWithoutRoleNestedInputSchema)
      .optional(),
  })
  .strict();

export const roleUncheckedUpdateInputSchema: z.ZodType<Prisma.roleUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutRoleNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutRoleNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const roleCreateManyInputSchema: z.ZodType<Prisma.roleCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const roleUpdateManyMutationInputSchema: z.ZodType<Prisma.roleUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const roleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.roleUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateCreateInputSchema: z.ZodType<Prisma.inspection_templateCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team: z.lazy(
        () => teamCreateNestedOneWithoutInspection_templateInputSchema,
      ),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedCreateInputSchema: z.ZodType<Prisma.inspection_templateUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUpdateInputSchema: z.ZodType<Prisma.inspection_templateUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(
          () =>
            teamUpdateOneRequiredWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateCreateManyInputSchema: z.ZodType<Prisma.inspection_templateCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
    })
    .strict();

export const inspection_templateUpdateManyMutationInputSchema: z.ZodType<Prisma.inspection_templateUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template: z.lazy(
        () =>
          inspection_templateCreateNestedOneWithoutInspection_template_snapshotInputSchema,
      ),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () => inspectionCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedCreateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template_id: z.string(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () => inspectionUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateManyInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template_id: z.string(),
    })
    .strict();

export const inspection_template_snapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateCreateInputSchema: z.ZodType<Prisma.step_templateCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUpdateInputSchema: z.ZodType<Prisma.step_templateUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateManyInputSchema: z.ZodType<Prisma.step_templateCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const step_templateUpdateManyMutationInputSchema: z.ZodType<Prisma.step_templateUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const step_templateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const inspectionCreateInputSchema: z.ZodType<Prisma.inspectionCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      team: z.lazy(() => teamCreateNestedOneWithoutInspectionInputSchema),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutInspectionInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot_id: z.string().optional().nullable(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUpdateInputSchema: z.ZodType<Prisma.inspectionUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutInspectionNestedInputSchema)
        .optional(),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutInspectionNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionCreateManyInputSchema: z.ZodType<Prisma.inspectionCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const inspectionUpdateManyMutationInputSchema: z.ZodType<Prisma.inspectionUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const stepCreateInputSchema: z.ZodType<Prisma.stepCreateInput> = z
  .object({
    id: z.string().optional(),
    status: z.lazy(() => StatusSchema).optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    inspection: z.lazy(() => inspectionCreateNestedOneWithoutStepInputSchema),
    step: z.lazy(() => step_templateCreateNestedOneWithoutStepInputSchema),
  })
  .strict();

export const stepUncheckedCreateInputSchema: z.ZodType<Prisma.stepUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      inspection_id: z.string(),
      step_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const stepUpdateInputSchema: z.ZodType<Prisma.stepUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusSchema),
        z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    inspection: z
      .lazy(() => inspectionUpdateOneRequiredWithoutStepNestedInputSchema)
      .optional(),
    step: z
      .lazy(() => step_templateUpdateOneRequiredWithoutStepNestedInputSchema)
      .optional(),
  })
  .strict();

export const stepUncheckedUpdateInputSchema: z.ZodType<Prisma.stepUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const stepCreateManyInputSchema: z.ZodType<Prisma.stepCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      inspection_id: z.string(),
      step_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const stepUpdateManyMutationInputSchema: z.ZodType<Prisma.stepUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateManyInputSchema: z.ZodType<Prisma.stepUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
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
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const Step_templateListRelationFilterSchema: z.ZodType<Prisma.Step_templateListRelationFilter> =
  z
    .object({
      every: z.lazy(() => step_templateWhereInputSchema).optional(),
      some: z.lazy(() => step_templateWhereInputSchema).optional(),
      none: z.lazy(() => step_templateWhereInputSchema).optional(),
    })
    .strict();

export const User_teamListRelationFilterSchema: z.ZodType<Prisma.User_teamListRelationFilter> =
  z
    .object({
      every: z.lazy(() => user_teamWhereInputSchema).optional(),
      some: z.lazy(() => user_teamWhereInputSchema).optional(),
      none: z.lazy(() => user_teamWhereInputSchema).optional(),
    })
    .strict();

export const User_workspaceListRelationFilterSchema: z.ZodType<Prisma.User_workspaceListRelationFilter> =
  z
    .object({
      every: z.lazy(() => user_workspaceWhereInputSchema).optional(),
      some: z.lazy(() => user_workspaceWhereInputSchema).optional(),
      none: z.lazy(() => user_workspaceWhereInputSchema).optional(),
    })
    .strict();

export const WorkspaceListRelationFilterSchema: z.ZodType<Prisma.WorkspaceListRelationFilter> =
  z
    .object({
      every: z.lazy(() => workspaceWhereInputSchema).optional(),
      some: z.lazy(() => workspaceWhereInputSchema).optional(),
      none: z.lazy(() => workspaceWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const step_templateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.step_templateOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_teamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.user_teamOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_workspaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.user_workspaceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const workspaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.workspaceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const userCountOrderByAggregateInputSchema: z.ZodType<Prisma.userCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      external_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const userMaxOrderByAggregateInputSchema: z.ZodType<Prisma.userMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      external_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const userMinOrderByAggregateInputSchema: z.ZodType<Prisma.userMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      external_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const Inspection_templateListRelationFilterSchema: z.ZodType<Prisma.Inspection_templateListRelationFilter> =
  z
    .object({
      every: z.lazy(() => inspection_templateWhereInputSchema).optional(),
      some: z.lazy(() => inspection_templateWhereInputSchema).optional(),
      none: z.lazy(() => inspection_templateWhereInputSchema).optional(),
    })
    .strict();

export const WorkspaceRelationFilterSchema: z.ZodType<Prisma.WorkspaceRelationFilter> =
  z
    .object({
      is: z.lazy(() => workspaceWhereInputSchema).optional(),
      isNot: z.lazy(() => workspaceWhereInputSchema).optional(),
    })
    .strict();

export const InspectionListRelationFilterSchema: z.ZodType<Prisma.InspectionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => inspectionWhereInputSchema).optional(),
      some: z.lazy(() => inspectionWhereInputSchema).optional(),
      none: z.lazy(() => inspectionWhereInputSchema).optional(),
    })
    .strict();

export const inspection_templateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.inspection_templateOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.inspectionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const teamIdentityWorkspace_idCompoundUniqueInputSchema: z.ZodType<Prisma.teamIdentityWorkspace_idCompoundUniqueInput> =
  z
    .object({
      identity: z.string(),
      workspace_id: z.string(),
    })
    .strict();

export const teamNameWorkspace_idCompoundUniqueInputSchema: z.ZodType<Prisma.teamNameWorkspace_idCompoundUniqueInput> =
  z
    .object({
      name: z.string(),
      workspace_id: z.string(),
    })
    .strict();

export const teamCountOrderByAggregateInputSchema: z.ZodType<Prisma.teamCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      identity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const teamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.teamMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      identity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const teamMinOrderByAggregateInputSchema: z.ZodType<Prisma.teamMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      identity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamListRelationFilterSchema: z.ZodType<Prisma.TeamListRelationFilter> =
  z
    .object({
      every: z.lazy(() => teamWhereInputSchema).optional(),
      some: z.lazy(() => teamWhereInputSchema).optional(),
      none: z.lazy(() => teamWhereInputSchema).optional(),
    })
    .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => userWhereInputSchema).optional(),
    isNot: z.lazy(() => userWhereInputSchema).optional(),
  })
  .strict();

export const teamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.teamOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const workspaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.workspaceCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      url_key: z.lazy(() => SortOrderSchema).optional(),
      created_by: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const workspaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.workspaceMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      url_key: z.lazy(() => SortOrderSchema).optional(),
      created_by: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const workspaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.workspaceMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      url_key: z.lazy(() => SortOrderSchema).optional(),
      created_by: z.lazy(() => SortOrderSchema).optional(),
      image_uri: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RoleNullableRelationFilterSchema: z.ZodType<Prisma.RoleNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => roleWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => roleWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const TeamRelationFilterSchema: z.ZodType<Prisma.TeamRelationFilter> = z
  .object({
    is: z.lazy(() => teamWhereInputSchema).optional(),
    isNot: z.lazy(() => teamWhereInputSchema).optional(),
  })
  .strict();

export const user_teamUser_idTeam_idCompoundUniqueInputSchema: z.ZodType<Prisma.user_teamUser_idTeam_idCompoundUniqueInput> =
  z
    .object({
      user_id: z.string(),
      team_id: z.string(),
    })
    .strict();

export const user_teamCountOrderByAggregateInputSchema: z.ZodType<Prisma.user_teamCountOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_teamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.user_teamMaxOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_teamMinOrderByAggregateInputSchema: z.ZodType<Prisma.user_teamMinOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_workspaceUser_idWorkspace_idCompoundUniqueInputSchema: z.ZodType<Prisma.user_workspaceUser_idWorkspace_idCompoundUniqueInput> =
  z
    .object({
      user_id: z.string(),
      workspace_id: z.string(),
    })
    .strict();

export const user_workspaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.user_workspaceCountOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_workspaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.user_workspaceMaxOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const user_workspaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.user_workspaceMinOrderByAggregateInput> =
  z
    .object({
      user_id: z.lazy(() => SortOrderSchema).optional(),
      workspace_id: z.lazy(() => SortOrderSchema).optional(),
      role_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z
  .object({
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumPermissionNullableListFilterSchema: z.ZodType<Prisma.EnumPermissionNullableListFilter> =
  z
    .object({
      equals: z
        .lazy(() => PermissionSchema)
        .array()
        .optional()
        .nullable(),
      has: z
        .lazy(() => PermissionSchema)
        .optional()
        .nullable(),
      hasEvery: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      hasSome: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      isEmpty: z.boolean().optional(),
    })
    .strict();

export const roleCountOrderByAggregateInputSchema: z.ZodType<Prisma.roleCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const roleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.roleMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const roleMinOrderByAggregateInputSchema: z.ZodType<Prisma.roleMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict();

export const Inspection_template_snapshotListRelationFilterSchema: z.ZodType<Prisma.Inspection_template_snapshotListRelationFilter> =
  z
    .object({
      every: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
      some: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
      none: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotOrderByRelationAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_templateCountOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_templateCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_templateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_templateMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_templateMinOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_templateMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const Inspection_templateRelationFilterSchema: z.ZodType<Prisma.Inspection_templateRelationFilter> =
  z
    .object({
      is: z.lazy(() => inspection_templateWhereInputSchema).optional(),
      isNot: z.lazy(() => inspection_templateWhereInputSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotAvgOrderByAggregateInput> =
  z
    .object({
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotSumOrderByAggregateInputSchema: z.ZodType<Prisma.inspection_template_snapshotSumOrderByAggregateInput> =
  z
    .object({
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => userWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => userWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const Step_templateNullableRelationFilterSchema: z.ZodType<Prisma.Step_templateNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => step_templateWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => step_templateWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const Inspection_template_snapshotNullableRelationFilterSchema: z.ZodType<Prisma.Inspection_template_snapshotNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const StepListRelationFilterSchema: z.ZodType<Prisma.StepListRelationFilter> =
  z
    .object({
      every: z.lazy(() => stepWhereInputSchema).optional(),
      some: z.lazy(() => stepWhereInputSchema).optional(),
      none: z.lazy(() => stepWhereInputSchema).optional(),
    })
    .strict();

export const stepOrderByRelationAggregateInputSchema: z.ZodType<Prisma.stepOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateCountOrderByAggregateInputSchema: z.ZodType<Prisma.step_templateCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      parent_step_id: z.lazy(() => SortOrderSchema).optional(),
      created_by_id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.step_templateAvgOrderByAggregateInput> =
  z
    .object({
      order: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.step_templateMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      parent_step_id: z.lazy(() => SortOrderSchema).optional(),
      created_by_id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateMinOrderByAggregateInputSchema: z.ZodType<Prisma.step_templateMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      parent_step_id: z.lazy(() => SortOrderSchema).optional(),
      created_by_id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_id: z.lazy(() => SortOrderSchema).optional(),
      inspection_template_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateSumOrderByAggregateInputSchema: z.ZodType<Prisma.step_templateSumOrderByAggregateInput> =
  z
    .object({
      order: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z
  .object({
    equals: z.lazy(() => StatusSchema).optional(),
    in: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusSchema),
        z.lazy(() => NestedEnumStatusFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const inspectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.inspectionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      inspection_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.inspectionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      inspection_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const inspectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.inspectionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
      team_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      inspection_snapshot_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
    })
    .strict();

export const InspectionRelationFilterSchema: z.ZodType<Prisma.InspectionRelationFilter> =
  z
    .object({
      is: z.lazy(() => inspectionWhereInputSchema).optional(),
      isNot: z.lazy(() => inspectionWhereInputSchema).optional(),
    })
    .strict();

export const Step_templateRelationFilterSchema: z.ZodType<Prisma.Step_templateRelationFilter> =
  z
    .object({
      is: z.lazy(() => step_templateWhereInputSchema).optional(),
      isNot: z.lazy(() => step_templateWhereInputSchema).optional(),
    })
    .strict();

export const stepCountOrderByAggregateInputSchema: z.ZodType<Prisma.stepCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      inspection_id: z.lazy(() => SortOrderSchema).optional(),
      step_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const stepMaxOrderByAggregateInputSchema: z.ZodType<Prisma.stepMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      inspection_id: z.lazy(() => SortOrderSchema).optional(),
      step_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const stepMinOrderByAggregateInputSchema: z.ZodType<Prisma.stepMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      inspection_id: z.lazy(() => SortOrderSchema).optional(),
      step_id: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      created_at: z.lazy(() => SortOrderSchema).optional(),
      updated_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const step_templateCreateNestedManyWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateCreateNestedManyWithoutCreated_byInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema).array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyCreated_byInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.user_teamCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutUserInputSchema),
          z.lazy(() => user_teamCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.workspaceCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUserInputSchema),
          z.lazy(() => workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedCreateNestedManyWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateNestedManyWithoutCreated_byInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema).array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyCreated_byInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutUserInputSchema),
          z.lazy(() => user_teamCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.workspaceUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUserInputSchema),
          z.lazy(() => workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const step_templateUpdateManyWithoutCreated_byNestedInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithoutCreated_byNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema).array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyCreated_byInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => step_templateUpdateManyWithWhereWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutUserInputSchema),
          z.lazy(() => user_teamCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => user_workspaceUpsertWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpsertWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => user_workspaceUpdateWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpdateWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_workspaceUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.workspaceUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUserInputSchema),
          z.lazy(() => workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => workspaceUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => workspaceUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => workspaceUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => workspaceScalarWhereInputSchema),
          z.lazy(() => workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutCreated_byNestedInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutCreated_byNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
          z.lazy(() => step_templateCreateWithoutCreated_byInputSchema).array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyCreated_byInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => step_templateUpdateManyWithWhereWithoutCreated_byInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutCreated_byInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutUserInputSchema),
          z.lazy(() => user_teamCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
          z.lazy(() => user_workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => user_workspaceUpsertWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpsertWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => user_workspaceUpdateWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpdateWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_workspaceUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => user_workspaceUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUserInputSchema),
          z.lazy(() => workspaceCreateWithoutUserInputSchema).array(),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => workspaceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => workspaceUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => workspaceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => workspaceWhereUniqueInputSchema),
          z.lazy(() => workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => workspaceUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => workspaceUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => workspaceUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => workspaceScalarWhereInputSchema),
          z.lazy(() => workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema).array(),
          z.lazy(
            () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspection_templateCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceCreateNestedOneWithoutTeamInputSchema: z.ZodType<Prisma.workspaceCreateNestedOneWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutTeamInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutTeamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => workspaceCreateOrConnectWithoutTeamInputSchema)
        .optional(),
      connect: z.lazy(() => workspaceWhereUniqueInputSchema).optional(),
    })
    .strict();

export const user_teamCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.user_teamCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateWithoutTeamInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.inspectionCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateWithoutTeamInputSchema).array(),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUncheckedCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema).array(),
          z.lazy(
            () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspection_templateCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateWithoutTeamInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateWithoutTeamInputSchema).array(),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.inspection_templateUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema).array(),
          z.lazy(
            () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpsertWithWhereUniqueWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpsertWithWhereUniqueWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspection_templateCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpdateWithWhereUniqueWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpdateWithWhereUniqueWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => inspection_templateUpdateManyWithWhereWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpdateManyWithWhereWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspection_templateScalarWhereInputSchema),
          z.lazy(() => inspection_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceUpdateOneRequiredWithoutTeamNestedInputSchema: z.ZodType<Prisma.workspaceUpdateOneRequiredWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutTeamInputSchema),
          z.lazy(() => workspaceUncheckedCreateWithoutTeamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => workspaceCreateOrConnectWithoutTeamInputSchema)
        .optional(),
      upsert: z.lazy(() => workspaceUpsertWithoutTeamInputSchema).optional(),
      connect: z.lazy(() => workspaceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => workspaceUpdateToOneWithWhereWithoutTeamInputSchema),
          z.lazy(() => workspaceUpdateWithoutTeamInputSchema),
          z.lazy(() => workspaceUncheckedUpdateWithoutTeamInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_teamUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateWithoutTeamInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.inspectionUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateWithoutTeamInputSchema).array(),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => inspectionUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => inspectionUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => inspectionUpdateManyWithWhereWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpdateManyWithWhereWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
          z.lazy(() => inspection_templateCreateWithoutTeamInputSchema).array(),
          z.lazy(
            () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateUncheckedCreateWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () => inspection_templateCreateOrConnectWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpsertWithWhereUniqueWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpsertWithWhereUniqueWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspection_templateCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_templateWhereUniqueInputSchema),
          z.lazy(() => inspection_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpdateWithWhereUniqueWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpdateWithWhereUniqueWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => inspection_templateUpdateManyWithWhereWithoutTeamInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_templateUpdateManyWithWhereWithoutTeamInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspection_templateScalarWhereInputSchema),
          z.lazy(() => inspection_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateWithoutTeamInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutTeamInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateWithoutTeamInputSchema).array(),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => inspectionCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => inspectionUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => inspectionUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => inspectionUpdateManyWithWhereWithoutTeamInputSchema),
          z
            .lazy(() => inspectionUpdateManyWithWhereWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const teamCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => teamCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(
            () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const userCreateNestedOneWithoutWorkspacesInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutWorkspacesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutWorkspacesInputSchema),
          z.lazy(() => userUncheckedCreateWithoutWorkspacesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutWorkspacesInputSchema)
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
    })
    .strict();

export const teamUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUncheckedCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => teamCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(
            () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const teamUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.teamUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => teamUpsertWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpsertWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => teamCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => teamUpdateWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpdateWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => teamUpdateManyWithWhereWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpdateManyWithWhereWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => teamScalarWhereInputSchema),
          z.lazy(() => teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(
            () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => user_workspaceUpdateManyWithWhereWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpdateManyWithWhereWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const userUpdateOneRequiredWithoutWorkspacesNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutWorkspacesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutWorkspacesInputSchema),
          z.lazy(() => userUncheckedCreateWithoutWorkspacesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutWorkspacesInputSchema)
        .optional(),
      upsert: z.lazy(() => userUpsertWithoutWorkspacesInputSchema).optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => userUpdateToOneWithWhereWithoutWorkspacesInputSchema),
          z.lazy(() => userUpdateWithoutWorkspacesInputSchema),
          z.lazy(() => userUncheckedUpdateWithoutWorkspacesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.teamUncheckedUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => teamCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => teamUpsertWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpsertWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => teamCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => teamWhereUniqueInputSchema),
          z.lazy(() => teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => teamUpdateWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpdateWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => teamUpdateManyWithWhereWithoutWorkspaceInputSchema),
          z
            .lazy(() => teamUpdateManyWithWhereWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => teamScalarWhereInputSchema),
          z.lazy(() => teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
          z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(
            () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceCreateOrConnectWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => user_workspaceUpdateManyWithWhereWithoutWorkspaceInputSchema,
          ),
          z
            .lazy(
              () =>
                user_workspaceUpdateManyWithWhereWithoutWorkspaceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const roleCreateNestedOneWithoutUser_teamInputSchema: z.ZodType<Prisma.roleCreateNestedOneWithoutUser_teamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => roleCreateWithoutUser_teamInputSchema),
          z.lazy(() => roleUncheckedCreateWithoutUser_teamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => roleCreateOrConnectWithoutUser_teamInputSchema)
        .optional(),
      connect: z.lazy(() => roleWhereUniqueInputSchema).optional(),
    })
    .strict();

export const teamCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.teamCreateNestedOneWithoutUsersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutUsersInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutUsersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutUsersInputSchema)
        .optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const userCreateNestedOneWithoutUser_teamInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutUser_teamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutUser_teamInputSchema),
          z.lazy(() => userUncheckedCreateWithoutUser_teamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutUser_teamInputSchema)
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
    })
    .strict();

export const roleUpdateOneWithoutUser_teamNestedInputSchema: z.ZodType<Prisma.roleUpdateOneWithoutUser_teamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => roleCreateWithoutUser_teamInputSchema),
          z.lazy(() => roleUncheckedCreateWithoutUser_teamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => roleCreateOrConnectWithoutUser_teamInputSchema)
        .optional(),
      upsert: z.lazy(() => roleUpsertWithoutUser_teamInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => roleWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => roleWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => roleWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => roleUpdateToOneWithWhereWithoutUser_teamInputSchema),
          z.lazy(() => roleUpdateWithoutUser_teamInputSchema),
          z.lazy(() => roleUncheckedUpdateWithoutUser_teamInputSchema),
        ])
        .optional(),
    })
    .strict();

export const teamUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.teamUpdateOneRequiredWithoutUsersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutUsersInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutUsersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutUsersInputSchema)
        .optional(),
      upsert: z.lazy(() => teamUpsertWithoutUsersInputSchema).optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => teamUpdateToOneWithWhereWithoutUsersInputSchema),
          z.lazy(() => teamUpdateWithoutUsersInputSchema),
          z.lazy(() => teamUncheckedUpdateWithoutUsersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const userUpdateOneRequiredWithoutUser_teamNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutUser_teamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutUser_teamInputSchema),
          z.lazy(() => userUncheckedCreateWithoutUser_teamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutUser_teamInputSchema)
        .optional(),
      upsert: z.lazy(() => userUpsertWithoutUser_teamInputSchema).optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => userUpdateToOneWithWhereWithoutUser_teamInputSchema),
          z.lazy(() => userUpdateWithoutUser_teamInputSchema),
          z.lazy(() => userUncheckedUpdateWithoutUser_teamInputSchema),
        ])
        .optional(),
    })
    .strict();

export const roleCreateNestedOneWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleCreateNestedOneWithoutUser_workspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => roleCreateWithoutUser_workspaceInputSchema),
          z.lazy(() => roleUncheckedCreateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => roleCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      connect: z.lazy(() => roleWhereUniqueInputSchema).optional(),
    })
    .strict();

export const userCreateNestedOneWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutUser_workspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutUser_workspaceInputSchema),
          z.lazy(() => userUncheckedCreateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
    })
    .strict();

export const workspaceCreateNestedOneWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceCreateNestedOneWithoutUser_workspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUser_workspaceInputSchema),
          z.lazy(
            () => workspaceUncheckedCreateWithoutUser_workspaceInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => workspaceCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      connect: z.lazy(() => workspaceWhereUniqueInputSchema).optional(),
    })
    .strict();

export const roleUpdateOneWithoutUser_workspaceNestedInputSchema: z.ZodType<Prisma.roleUpdateOneWithoutUser_workspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => roleCreateWithoutUser_workspaceInputSchema),
          z.lazy(() => roleUncheckedCreateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => roleCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      upsert: z
        .lazy(() => roleUpsertWithoutUser_workspaceInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => roleWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => roleWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => roleWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => roleUpdateToOneWithWhereWithoutUser_workspaceInputSchema,
          ),
          z.lazy(() => roleUpdateWithoutUser_workspaceInputSchema),
          z.lazy(() => roleUncheckedUpdateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
    })
    .strict();

export const userUpdateOneRequiredWithoutUser_workspaceNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutUser_workspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutUser_workspaceInputSchema),
          z.lazy(() => userUncheckedCreateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      upsert: z
        .lazy(() => userUpsertWithoutUser_workspaceInputSchema)
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => userUpdateToOneWithWhereWithoutUser_workspaceInputSchema,
          ),
          z.lazy(() => userUpdateWithoutUser_workspaceInputSchema),
          z.lazy(() => userUncheckedUpdateWithoutUser_workspaceInputSchema),
        ])
        .optional(),
    })
    .strict();

export const workspaceUpdateOneRequiredWithoutUser_workspaceNestedInputSchema: z.ZodType<Prisma.workspaceUpdateOneRequiredWithoutUser_workspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => workspaceCreateWithoutUser_workspaceInputSchema),
          z.lazy(
            () => workspaceUncheckedCreateWithoutUser_workspaceInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => workspaceCreateOrConnectWithoutUser_workspaceInputSchema)
        .optional(),
      upsert: z
        .lazy(() => workspaceUpsertWithoutUser_workspaceInputSchema)
        .optional(),
      connect: z.lazy(() => workspaceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => workspaceUpdateToOneWithWhereWithoutUser_workspaceInputSchema,
          ),
          z.lazy(() => workspaceUpdateWithoutUser_workspaceInputSchema),
          z.lazy(
            () => workspaceUncheckedUpdateWithoutUser_workspaceInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const roleCreatepermissionsInputSchema: z.ZodType<Prisma.roleCreatepermissionsInput> =
  z
    .object({
      set: z.lazy(() => PermissionSchema).array(),
    })
    .strict();

export const user_teamCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.user_teamCreateNestedManyWithoutRoleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyRoleInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceCreateNestedManyWithoutRoleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyRoleInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateNestedManyWithoutRoleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyRoleInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateNestedManyWithoutRoleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyRoleInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => RoleSchema).optional(),
    })
    .strict();

export const roleUpdatepermissionsInputSchema: z.ZodType<Prisma.roleUpdatepermissionsInput> =
  z
    .object({
      set: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      push: z
        .union([
          z.lazy(() => PermissionSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithoutRoleNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyRoleInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithoutRoleNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => user_workspaceUpsertWithWhereUniqueWithoutRoleInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpsertWithWhereUniqueWithoutRoleInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyRoleInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => user_workspaceUpdateWithWhereUniqueWithoutRoleInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpdateWithWhereUniqueWithoutRoleInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_workspaceUpdateManyWithWhereWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUpdateManyWithWhereWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutRoleNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_teamCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
          z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema),
          z.lazy(() => user_teamCreateOrConnectWithoutRoleInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => user_teamUpsertWithWhereUniqueWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpsertWithWhereUniqueWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_teamCreateManyRoleInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_teamWhereUniqueInputSchema),
          z.lazy(() => user_teamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => user_teamUpdateWithWhereUniqueWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpdateWithWhereUniqueWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_teamUpdateManyWithWhereWithoutRoleInputSchema),
          z
            .lazy(() => user_teamUpdateManyWithWhereWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutRoleNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
          z.lazy(() => user_workspaceCreateWithoutRoleInputSchema).array(),
          z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceCreateOrConnectWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => user_workspaceUpsertWithWhereUniqueWithoutRoleInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpsertWithWhereUniqueWithoutRoleInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => user_workspaceCreateManyRoleInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => user_workspaceWhereUniqueInputSchema),
          z.lazy(() => user_workspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => user_workspaceUpdateWithWhereUniqueWithoutRoleInputSchema,
          ),
          z
            .lazy(
              () => user_workspaceUpdateWithWhereUniqueWithoutRoleInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => user_workspaceUpdateManyWithWhereWithoutRoleInputSchema),
          z
            .lazy(() => user_workspaceUpdateManyWithWhereWithoutRoleInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const teamCreateNestedOneWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamCreateNestedOneWithoutInspection_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutInspection_templateInputSchema),
          z.lazy(
            () => teamUncheckedCreateWithoutInspection_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutInspection_templateInputSchema)
        .optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const step_templateCreateNestedManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateCreateNestedManyWithoutInspection_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => step_templateCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => step_templateCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateNestedManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateNestedManyWithoutInspection_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            inspection_template_snapshotCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedCreateNestedManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateNestedManyWithoutInspection_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => step_templateCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => step_templateCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedCreateNestedManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedCreateNestedManyWithoutInspection_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            inspection_template_snapshotCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const teamUpdateOneRequiredWithoutInspection_templateNestedInputSchema: z.ZodType<Prisma.teamUpdateOneRequiredWithoutInspection_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutInspection_templateInputSchema),
          z.lazy(
            () => teamUncheckedCreateWithoutInspection_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutInspection_templateInputSchema)
        .optional(),
      upsert: z
        .lazy(() => teamUpsertWithoutInspection_templateInputSchema)
        .optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => teamUpdateToOneWithWhereWithoutInspection_templateInputSchema,
          ),
          z.lazy(() => teamUpdateWithoutInspection_templateInputSchema),
          z.lazy(
            () => teamUncheckedUpdateWithoutInspection_templateInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const step_templateUpdateManyWithoutInspection_templateNestedInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithoutInspection_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => step_templateCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => step_templateCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateManyWithWhereWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateManyWithoutInspection_templateNestedInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateManyWithoutInspection_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            inspection_template_snapshotCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspection_template_snapshotScalarWhereInputSchema),
          z
            .lazy(() => inspection_template_snapshotScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutInspection_templateNestedInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutInspection_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => step_templateCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => step_templateCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateManyWithWhereWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateNestedInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            inspection_template_snapshotCreateManyInspection_templateInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
          z
            .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInputSchema,
          ),
          z
            .lazy(
              () =>
                inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspection_template_snapshotScalarWhereInputSchema),
          z
            .lazy(() => inspection_template_snapshotScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateCreateNestedOneWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateCreateNestedOneWithoutInspection_template_snapshotInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      connect: z
        .lazy(() => inspection_templateWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateNestedManyWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateCreateNestedManyWithoutInspection_template_snapshotInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              step_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            step_templateCreateManyInspection_template_snapshotInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionCreateNestedManyWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionCreateNestedManyWithoutInspection_snapshotInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
          z
            .lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema)
            .array(),
          z.lazy(
            () =>
              inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyInspection_snapshotInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedCreateNestedManyWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateNestedManyWithoutInspection_template_snapshotInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              step_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            step_templateCreateManyInspection_template_snapshotInputEnvelopeSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateNestedManyWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateNestedManyWithoutInspection_snapshotInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
          z
            .lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema)
            .array(),
          z.lazy(
            () =>
              inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyInspection_snapshotInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const inspection_templateUpdateOneRequiredWithoutInspection_template_snapshotNestedInputSchema: z.ZodType<Prisma.inspection_templateUpdateOneRequiredWithoutInspection_template_snapshotNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(
          () =>
            inspection_templateUpsertWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      connect: z
        .lazy(() => inspection_templateWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpdateToOneWithWhereWithoutInspection_template_snapshotInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUpdateWithoutInspection_template_snapshotInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const step_templateUpdateManyWithoutInspection_template_snapshotNestedInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithoutInspection_template_snapshotNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              step_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            step_templateCreateManyInspection_template_snapshotInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUpdateManyWithoutInspection_snapshotNestedInputSchema: z.ZodType<Prisma.inspectionUpdateManyWithoutInspection_snapshotNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
          z
            .lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema)
            .array(),
          z.lazy(
            () =>
              inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyInspection_snapshotInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              inspectionUpdateManyWithWhereWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpdateManyWithWhereWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutInspection_template_snapshotNestedInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutInspection_template_snapshotNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              step_templateCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            step_templateCreateManyInspection_template_snapshotInputEnvelopeSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateManyWithoutInspection_snapshotNestedInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateManyWithoutInspection_snapshotNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
          z
            .lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema)
            .array(),
          z.lazy(
            () =>
              inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionCreateOrConnectWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => inspectionCreateManyInspection_snapshotInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => inspectionWhereUniqueInputSchema),
          z.lazy(() => inspectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              inspectionUpdateManyWithWhereWithoutInspection_snapshotInputSchema,
          ),
          z
            .lazy(
              () =>
                inspectionUpdateManyWithWhereWithoutInspection_snapshotInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateCreateNestedOneWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateCreateNestedOneWithoutStep_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => inspection_templateCreateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedCreateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_templateCreateOrConnectWithoutStep_templateInputSchema,
        )
        .optional(),
      connect: z
        .lazy(() => inspection_templateWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const userCreateNestedOneWithoutStep_templateInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutStep_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutStep_templateInputSchema),
          z.lazy(() => userUncheckedCreateWithoutStep_templateInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutStep_templateInputSchema)
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
    })
    .strict();

export const step_templateCreateNestedOneWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateCreateNestedOneWithoutSub_stepsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutSub_stepsInputSchema),
          z.lazy(() => step_templateUncheckedCreateWithoutSub_stepsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => step_templateCreateOrConnectWithoutSub_stepsInputSchema)
        .optional(),
      connect: z.lazy(() => step_templateWhereUniqueInputSchema).optional(),
    })
    .strict();

export const step_templateCreateNestedManyWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateCreateNestedManyWithoutParent_stepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
          z
            .lazy(() => step_templateCreateWithoutParent_stepInputSchema)
            .array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyParent_stepInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateNestedOneWithoutStep_templateInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_template_snapshotCreateOrConnectWithoutStep_templateInputSchema,
        )
        .optional(),
      connect: z
        .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const stepCreateNestedManyWithoutStepInputSchema: z.ZodType<Prisma.stepCreateNestedManyWithoutStepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutStepInputSchema),
          z.lazy(() => stepCreateWithoutStepInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyStepInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateNestedManyWithoutParent_stepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
          z
            .lazy(() => step_templateCreateWithoutParent_stepInputSchema)
            .array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyParent_stepInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedCreateNestedManyWithoutStepInputSchema: z.ZodType<Prisma.stepUncheckedCreateNestedManyWithoutStepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutStepInputSchema),
          z.lazy(() => stepCreateWithoutStepInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyStepInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema: z.ZodType<Prisma.inspection_templateUpdateOneRequiredWithoutStep_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => inspection_templateCreateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedCreateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_templateCreateOrConnectWithoutStep_templateInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => inspection_templateUpsertWithoutStep_templateInputSchema)
        .optional(),
      connect: z
        .lazy(() => inspection_templateWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_templateUpdateToOneWithWhereWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () => inspection_templateUpdateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_templateUncheckedUpdateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const userUpdateOneWithoutStep_templateNestedInputSchema: z.ZodType<Prisma.userUpdateOneWithoutStep_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => userCreateWithoutStep_templateInputSchema),
          z.lazy(() => userUncheckedCreateWithoutStep_templateInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => userCreateOrConnectWithoutStep_templateInputSchema)
        .optional(),
      upsert: z
        .lazy(() => userUpsertWithoutStep_templateInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => userWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => userWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => userUpdateToOneWithWhereWithoutStep_templateInputSchema),
          z.lazy(() => userUpdateWithoutStep_templateInputSchema),
          z.lazy(() => userUncheckedUpdateWithoutStep_templateInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateUpdateOneWithoutSub_stepsNestedInputSchema: z.ZodType<Prisma.step_templateUpdateOneWithoutSub_stepsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutSub_stepsInputSchema),
          z.lazy(() => step_templateUncheckedCreateWithoutSub_stepsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => step_templateCreateOrConnectWithoutSub_stepsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => step_templateUpsertWithoutSub_stepsInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => step_templateWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => step_templateWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => step_templateWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => step_templateUpdateToOneWithWhereWithoutSub_stepsInputSchema,
          ),
          z.lazy(() => step_templateUpdateWithoutSub_stepsInputSchema),
          z.lazy(() => step_templateUncheckedUpdateWithoutSub_stepsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateUpdateManyWithoutParent_stepNestedInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithoutParent_stepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
          z
            .lazy(() => step_templateCreateWithoutParent_stepInputSchema)
            .array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyParent_stepInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => step_templateUpdateManyWithWhereWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateOneWithoutStep_templateNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_template_snapshotCreateOrConnectWithoutStep_templateInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(
          () =>
            inspection_template_snapshotUpsertWithoutStep_templateInputSchema,
        )
        .optional(),
      disconnect: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional(),
      delete: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional(),
      connect: z
        .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateToOneWithWhereWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUpdateWithoutStep_templateInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedUpdateWithoutStep_templateInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const stepUpdateManyWithoutStepNestedInputSchema: z.ZodType<Prisma.stepUpdateManyWithoutStepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutStepInputSchema),
          z.lazy(() => stepCreateWithoutStepInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => stepUpsertWithWhereUniqueWithoutStepInputSchema),
          z.lazy(() => stepUpsertWithWhereUniqueWithoutStepInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyStepInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => stepUpdateWithWhereUniqueWithoutStepInputSchema),
          z.lazy(() => stepUpdateWithWhereUniqueWithoutStepInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => stepUpdateManyWithWhereWithoutStepInputSchema),
          z.lazy(() => stepUpdateManyWithWhereWithoutStepInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutParent_stepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
          z
            .lazy(() => step_templateCreateWithoutParent_stepInputSchema)
            .array(),
          z.lazy(
            () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateUncheckedCreateWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () => step_templateCreateOrConnectWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              step_templateUpsertWithWhereUniqueWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpsertWithWhereUniqueWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => step_templateCreateManyParent_stepInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => step_templateWhereUniqueInputSchema),
          z.lazy(() => step_templateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              step_templateUpdateWithWhereUniqueWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateWithWhereUniqueWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => step_templateUpdateManyWithWhereWithoutParent_stepInputSchema,
          ),
          z
            .lazy(
              () =>
                step_templateUpdateManyWithWhereWithoutParent_stepInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateManyWithoutStepNestedInputSchema: z.ZodType<Prisma.stepUncheckedUpdateManyWithoutStepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutStepInputSchema),
          z.lazy(() => stepCreateWithoutStepInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutStepInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutStepInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => stepUpsertWithWhereUniqueWithoutStepInputSchema),
          z.lazy(() => stepUpsertWithWhereUniqueWithoutStepInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyStepInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => stepUpdateWithWhereUniqueWithoutStepInputSchema),
          z.lazy(() => stepUpdateWithWhereUniqueWithoutStepInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => stepUpdateManyWithWhereWithoutStepInputSchema),
          z.lazy(() => stepUpdateManyWithWhereWithoutStepInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const teamCreateNestedOneWithoutInspectionInputSchema: z.ZodType<Prisma.teamCreateNestedOneWithoutInspectionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutInspectionInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutInspectionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutInspectionInputSchema)
        .optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const inspection_template_snapshotCreateNestedOneWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateNestedOneWithoutInspectionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspectionInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspectionInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_template_snapshotCreateOrConnectWithoutInspectionInputSchema,
        )
        .optional(),
      connect: z
        .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const stepCreateNestedManyWithoutInspectionInputSchema: z.ZodType<Prisma.stepCreateNestedManyWithoutInspectionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutInspectionInputSchema),
          z.lazy(() => stepCreateWithoutInspectionInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyInspectionInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedCreateNestedManyWithoutInspectionInputSchema: z.ZodType<Prisma.stepUncheckedCreateNestedManyWithoutInspectionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutInspectionInputSchema),
          z.lazy(() => stepCreateWithoutInspectionInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyInspectionInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => StatusSchema).optional(),
    })
    .strict();

export const teamUpdateOneRequiredWithoutInspectionNestedInputSchema: z.ZodType<Prisma.teamUpdateOneRequiredWithoutInspectionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => teamCreateWithoutInspectionInputSchema),
          z.lazy(() => teamUncheckedCreateWithoutInspectionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => teamCreateOrConnectWithoutInspectionInputSchema)
        .optional(),
      upsert: z.lazy(() => teamUpsertWithoutInspectionInputSchema).optional(),
      connect: z.lazy(() => teamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => teamUpdateToOneWithWhereWithoutInspectionInputSchema),
          z.lazy(() => teamUpdateWithoutInspectionInputSchema),
          z.lazy(() => teamUncheckedUpdateWithoutInspectionInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateOneWithoutInspectionNestedInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateOneWithoutInspectionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotCreateWithoutInspectionInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedCreateWithoutInspectionInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            inspection_template_snapshotCreateOrConnectWithoutInspectionInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(
          () => inspection_template_snapshotUpsertWithoutInspectionInputSchema,
        )
        .optional(),
      disconnect: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional(),
      delete: z
        .union([
          z.boolean(),
          z.lazy(() => inspection_template_snapshotWhereInputSchema),
        ])
        .optional(),
      connect: z
        .lazy(() => inspection_template_snapshotWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              inspection_template_snapshotUpdateToOneWithWhereWithoutInspectionInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUpdateWithoutInspectionInputSchema,
          ),
          z.lazy(
            () =>
              inspection_template_snapshotUncheckedUpdateWithoutInspectionInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const stepUpdateManyWithoutInspectionNestedInputSchema: z.ZodType<Prisma.stepUpdateManyWithoutInspectionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutInspectionInputSchema),
          z.lazy(() => stepCreateWithoutInspectionInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => stepUpsertWithWhereUniqueWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpsertWithWhereUniqueWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyInspectionInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => stepUpdateWithWhereUniqueWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpdateWithWhereUniqueWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => stepUpdateManyWithWhereWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpdateManyWithWhereWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateManyWithoutInspectionNestedInputSchema: z.ZodType<Prisma.stepUncheckedUpdateManyWithoutInspectionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => stepCreateWithoutInspectionInputSchema),
          z.lazy(() => stepCreateWithoutInspectionInputSchema).array(),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
          z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema),
          z.lazy(() => stepCreateOrConnectWithoutInspectionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => stepUpsertWithWhereUniqueWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpsertWithWhereUniqueWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => stepCreateManyInspectionInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => stepWhereUniqueInputSchema),
          z.lazy(() => stepWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => stepUpdateWithWhereUniqueWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpdateWithWhereUniqueWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => stepUpdateManyWithWhereWithoutInspectionInputSchema),
          z
            .lazy(() => stepUpdateManyWithWhereWithoutInspectionInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionCreateNestedOneWithoutStepInputSchema: z.ZodType<Prisma.inspectionCreateNestedOneWithoutStepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutStepInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutStepInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => inspectionCreateOrConnectWithoutStepInputSchema)
        .optional(),
      connect: z.lazy(() => inspectionWhereUniqueInputSchema).optional(),
    })
    .strict();

export const step_templateCreateNestedOneWithoutStepInputSchema: z.ZodType<Prisma.step_templateCreateNestedOneWithoutStepInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutStepInputSchema),
          z.lazy(() => step_templateUncheckedCreateWithoutStepInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => step_templateCreateOrConnectWithoutStepInputSchema)
        .optional(),
      connect: z.lazy(() => step_templateWhereUniqueInputSchema).optional(),
    })
    .strict();

export const inspectionUpdateOneRequiredWithoutStepNestedInputSchema: z.ZodType<Prisma.inspectionUpdateOneRequiredWithoutStepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => inspectionCreateWithoutStepInputSchema),
          z.lazy(() => inspectionUncheckedCreateWithoutStepInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => inspectionCreateOrConnectWithoutStepInputSchema)
        .optional(),
      upsert: z.lazy(() => inspectionUpsertWithoutStepInputSchema).optional(),
      connect: z.lazy(() => inspectionWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => inspectionUpdateToOneWithWhereWithoutStepInputSchema),
          z.lazy(() => inspectionUpdateWithoutStepInputSchema),
          z.lazy(() => inspectionUncheckedUpdateWithoutStepInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateUpdateOneRequiredWithoutStepNestedInputSchema: z.ZodType<Prisma.step_templateUpdateOneRequiredWithoutStepNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => step_templateCreateWithoutStepInputSchema),
          z.lazy(() => step_templateUncheckedCreateWithoutStepInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => step_templateCreateOrConnectWithoutStepInputSchema)
        .optional(),
      upsert: z
        .lazy(() => step_templateUpsertWithoutStepInputSchema)
        .optional(),
      connect: z.lazy(() => step_templateWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => step_templateUpdateToOneWithWhereWithoutStepInputSchema),
          z.lazy(() => step_templateUpdateWithoutStepInputSchema),
          z.lazy(() => step_templateUncheckedUpdateWithoutStepInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
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
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
    })
    .strict();

export const step_templateCreateWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateCreateWithoutCreated_byInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutCreated_byInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutCreated_byInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutCreated_byInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateManyCreated_byInputEnvelopeSchema: z.ZodType<Prisma.step_templateCreateManyCreated_byInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => step_templateCreateManyCreated_byInputSchema),
        z.lazy(() => step_templateCreateManyCreated_byInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_teamCreateWithoutUserInputSchema: z.ZodType<Prisma.user_teamCreateWithoutUserInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_teamInputSchema)
        .optional(),
      team: z.lazy(() => teamCreateNestedOneWithoutUsersInputSchema),
    })
    .strict();

export const user_teamUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateWithoutUserInput> =
  z
    .object({
      team_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_teamCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.user_teamCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutUserInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_teamCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.user_teamCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_teamCreateManyUserInputSchema),
        z.lazy(() => user_teamCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_workspaceCreateWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceCreateWithoutUserInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_workspaceInputSchema)
        .optional(),
      workspace: z.lazy(
        () => workspaceCreateNestedOneWithoutUser_workspaceInputSchema,
      ),
    })
    .strict();

export const user_workspaceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateWithoutUserInput> =
  z
    .object({
      workspace_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_workspaceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_workspaceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.user_workspaceCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_workspaceCreateManyUserInputSchema),
        z.lazy(() => user_workspaceCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const workspaceCreateWithoutUserInputSchema: z.ZodType<Prisma.workspaceCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.workspaceUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamUncheckedCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedCreateNestedManyWithoutWorkspaceInputSchema,
        )
        .optional(),
    })
    .strict();

export const workspaceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.workspaceCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutUserInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const workspaceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.workspaceCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => workspaceCreateManyUserInputSchema),
        z.lazy(() => workspaceCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const step_templateUpsertWithWhereUniqueWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUpsertWithWhereUniqueWithoutCreated_byInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => step_templateUpdateWithoutCreated_byInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutCreated_byInputSchema),
      ]),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutCreated_byInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutCreated_byInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateWithWhereUniqueWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUpdateWithWhereUniqueWithoutCreated_byInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateWithoutCreated_byInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutCreated_byInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateManyWithWhereWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithWhereWithoutCreated_byInput> =
  z
    .object({
      where: z.lazy(() => step_templateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateManyMutationInputSchema),
        z.lazy(
          () => step_templateUncheckedUpdateManyWithoutCreated_byInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateScalarWhereInputSchema: z.ZodType<Prisma.step_templateScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => step_templateScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => step_templateScalarWhereInputSchema),
          z.lazy(() => step_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      parent_step_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_by_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      order: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      inspection_template_snapshot_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.user_teamUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_teamUpdateWithoutUserInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutUserInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.user_teamUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateWithoutUserInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_teamScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateManyMutationInputSchema),
        z.lazy(() => user_teamUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_teamScalarWhereInputSchema: z.ZodType<Prisma.user_teamScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_teamScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_teamScalarWhereInputSchema),
          z.lazy(() => user_teamScalarWhereInputSchema).array(),
        ])
        .optional(),
      user_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      role_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_workspaceUpdateWithoutUserInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutUserInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateWithoutUserInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateManyMutationInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const user_workspaceScalarWhereInputSchema: z.ZodType<Prisma.user_workspaceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => user_workspaceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => user_workspaceScalarWhereInputSchema),
          z.lazy(() => user_workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      user_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      workspace_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      role_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const workspaceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.workspaceUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => workspaceUpdateWithoutUserInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutUserInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const workspaceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.workspaceUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => workspaceUpdateWithoutUserInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const workspaceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.workspaceUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => workspaceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => workspaceUpdateManyMutationInputSchema),
        z.lazy(() => workspaceUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const workspaceScalarWhereInputSchema: z.ZodType<Prisma.workspaceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => workspaceScalarWhereInputSchema),
          z.lazy(() => workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => workspaceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => workspaceScalarWhereInputSchema),
          z.lazy(() => workspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      url_key: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      created_by: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      image_uri: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const inspection_templateCreateWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUncheckedCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
        z.lazy(() => inspection_templateUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspection_templateCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.inspection_templateCreateManyTeamInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => inspection_templateCreateManyTeamInputSchema),
        z.lazy(() => inspection_templateCreateManyTeamInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const workspaceCreateWithoutTeamInputSchema: z.ZodType<Prisma.workspaceCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutWorkspacesInputSchema),
    })
    .strict();

export const workspaceUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.workspaceUncheckedCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      created_by: z.string(),
      image_uri: z.string().optional().nullable(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedCreateNestedManyWithoutWorkspaceInputSchema,
        )
        .optional(),
    })
    .strict();

export const workspaceCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.workspaceCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutTeamInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const user_teamCreateWithoutTeamInputSchema: z.ZodType<Prisma.user_teamCreateWithoutTeamInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_teamInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutUser_teamInputSchema),
    })
    .strict();

export const user_teamUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateWithoutTeamInput> =
  z
    .object({
      user_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_teamCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.user_teamCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutTeamInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const user_teamCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.user_teamCreateManyTeamInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_teamCreateManyTeamInputSchema),
        z.lazy(() => user_teamCreateManyTeamInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspectionCreateWithoutTeamInputSchema: z.ZodType<Prisma.inspectionCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutInspectionInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot_id: z.string().optional().nullable(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.inspectionCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutTeamInputSchema),
        z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspectionCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.inspectionCreateManyTeamInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => inspectionCreateManyTeamInputSchema),
        z.lazy(() => inspectionCreateManyTeamInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_templateUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUpsertWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => inspection_templateUpdateWithoutTeamInputSchema),
        z.lazy(() => inspection_templateUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => inspection_templateCreateWithoutTeamInputSchema),
        z.lazy(() => inspection_templateUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspection_templateUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUpdateWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => inspection_templateUpdateWithoutTeamInputSchema),
        z.lazy(() => inspection_templateUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspection_templateUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUpdateManyWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => inspection_templateUpdateManyMutationInputSchema),
        z.lazy(
          () => inspection_templateUncheckedUpdateManyWithoutTeamInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_templateScalarWhereInputSchema: z.ZodType<Prisma.inspection_templateScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspection_templateScalarWhereInputSchema),
          z.lazy(() => inspection_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspection_templateScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspection_templateScalarWhereInputSchema),
          z.lazy(() => inspection_templateScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    })
    .strict();

export const workspaceUpsertWithoutTeamInputSchema: z.ZodType<Prisma.workspaceUpsertWithoutTeamInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => workspaceUpdateWithoutTeamInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutTeamInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutTeamInputSchema),
      ]),
      where: z.lazy(() => workspaceWhereInputSchema).optional(),
    })
    .strict();

export const workspaceUpdateToOneWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.workspaceUpdateToOneWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => workspaceUpdateWithoutTeamInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const workspaceUpdateWithoutTeamInputSchema: z.ZodType<Prisma.workspaceUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutWorkspacesNestedInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedUpdateManyWithoutWorkspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const user_teamUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUpsertWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_teamUpdateWithoutTeamInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutTeamInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUpdateWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateWithoutTeamInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => user_teamScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateManyMutationInputSchema),
        z.lazy(() => user_teamUncheckedUpdateManyWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspectionUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUpsertWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => inspectionUpdateWithoutTeamInputSchema),
        z.lazy(() => inspectionUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutTeamInputSchema),
        z.lazy(() => inspectionUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspectionUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUpdateWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => inspectionUpdateWithoutTeamInputSchema),
        z.lazy(() => inspectionUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspectionUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUpdateManyWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => inspectionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => inspectionUpdateManyMutationInputSchema),
        z.lazy(() => inspectionUncheckedUpdateManyWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const inspectionScalarWhereInputSchema: z.ZodType<Prisma.inspectionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspectionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspectionScalarWhereInputSchema),
          z.lazy(() => inspectionScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      team_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const teamCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamCreateWithoutWorkspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
      inspection_template: z
        .lazy(() => inspection_templateCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      users: z
        .lazy(() => user_teamCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUncheckedCreateWithoutWorkspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedCreateNestedManyWithoutTeamInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamCreateOrConnectWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const teamCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.teamCreateManyWorkspaceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => teamCreateManyWorkspaceInputSchema),
        z.lazy(() => teamCreateManyWorkspaceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_workspaceCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceCreateWithoutWorkspaceInput> =
  z
    .object({
      role: z
        .lazy(() => roleCreateNestedOneWithoutUser_workspaceInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutUser_workspaceInputSchema),
    })
    .strict();

export const user_workspaceUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateWithoutWorkspaceInput> =
  z
    .object({
      user_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_workspaceCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceCreateOrConnectWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const user_workspaceCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.user_workspaceCreateManyWorkspaceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_workspaceCreateManyWorkspaceInputSchema),
        z.lazy(() => user_workspaceCreateManyWorkspaceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const userCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.userCreateWithoutWorkspacesInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(() => step_templateCreateNestedManyWithoutCreated_byInputSchema)
        .optional(),
      user_team: z
        .lazy(() => user_teamCreateNestedManyWithoutUserInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutWorkspacesInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutCreated_byInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
    })
    .strict();

export const userCreateOrConnectWithoutWorkspacesInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => userWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => userCreateWithoutWorkspacesInputSchema),
        z.lazy(() => userUncheckedCreateWithoutWorkspacesInputSchema),
      ]),
    })
    .strict();

export const teamUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUpsertWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => teamUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => teamCreateWithoutWorkspaceInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const teamUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUpdateWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => teamUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const teamUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUpdateManyWithWhereWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => teamScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => teamUpdateManyMutationInputSchema),
        z.lazy(() => teamUncheckedUpdateManyWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const teamScalarWhereInputSchema: z.ZodType<Prisma.teamScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => teamScalarWhereInputSchema),
          z.lazy(() => teamScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => teamScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => teamScalarWhereInputSchema),
          z.lazy(() => teamScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      image_uri: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      workspace_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      identity: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUpsertWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_workspaceUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutWorkspaceInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithWhereWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateManyMutationInputSchema),
        z.lazy(
          () => user_workspaceUncheckedUpdateManyWithoutWorkspaceInputSchema,
        ),
      ]),
    })
    .strict();

export const userUpsertWithoutWorkspacesInputSchema: z.ZodType<Prisma.userUpsertWithoutWorkspacesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => userUpdateWithoutWorkspacesInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutWorkspacesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => userCreateWithoutWorkspacesInputSchema),
        z.lazy(() => userUncheckedCreateWithoutWorkspacesInputSchema),
      ]),
      where: z.lazy(() => userWhereInputSchema).optional(),
    })
    .strict();

export const userUpdateToOneWithWhereWithoutWorkspacesInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => userWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => userUpdateWithoutWorkspacesInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutWorkspacesInputSchema),
      ]),
    })
    .strict();

export const userUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.userUpdateWithoutWorkspacesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(() => step_templateUpdateManyWithoutCreated_byNestedInputSchema)
        .optional(),
      user_team: z
        .lazy(() => user_teamUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutWorkspacesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutCreated_byNestedInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const roleCreateWithoutUser_teamInputSchema: z.ZodType<Prisma.roleCreateWithoutUser_teamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutRoleInputSchema)
        .optional(),
    })
    .strict();

export const roleUncheckedCreateWithoutUser_teamInputSchema: z.ZodType<Prisma.roleUncheckedCreateWithoutUser_teamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutRoleInputSchema,
        )
        .optional(),
    })
    .strict();

export const roleCreateOrConnectWithoutUser_teamInputSchema: z.ZodType<Prisma.roleCreateOrConnectWithoutUser_teamInput> =
  z
    .object({
      where: z.lazy(() => roleWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => roleCreateWithoutUser_teamInputSchema),
        z.lazy(() => roleUncheckedCreateWithoutUser_teamInputSchema),
      ]),
    })
    .strict();

export const teamCreateWithoutUsersInputSchema: z.ZodType<Prisma.teamCreateWithoutUsersInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
      inspection_template: z
        .lazy(() => inspection_templateCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      workspace: z.lazy(() => workspaceCreateNestedOneWithoutTeamInputSchema),
      inspection: z
        .lazy(() => inspectionCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.teamUncheckedCreateWithoutUsersInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      workspace_id: z.string(),
      identity: z.string(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedCreateNestedManyWithoutTeamInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.teamCreateOrConnectWithoutUsersInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => teamCreateWithoutUsersInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutUsersInputSchema),
      ]),
    })
    .strict();

export const userCreateWithoutUser_teamInputSchema: z.ZodType<Prisma.userCreateWithoutUser_teamInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(() => step_templateCreateNestedManyWithoutCreated_byInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedCreateWithoutUser_teamInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutUser_teamInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutCreated_byInputSchema,
        )
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userCreateOrConnectWithoutUser_teamInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutUser_teamInput> =
  z
    .object({
      where: z.lazy(() => userWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => userCreateWithoutUser_teamInputSchema),
        z.lazy(() => userUncheckedCreateWithoutUser_teamInputSchema),
      ]),
    })
    .strict();

export const roleUpsertWithoutUser_teamInputSchema: z.ZodType<Prisma.roleUpsertWithoutUser_teamInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => roleUpdateWithoutUser_teamInputSchema),
        z.lazy(() => roleUncheckedUpdateWithoutUser_teamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => roleCreateWithoutUser_teamInputSchema),
        z.lazy(() => roleUncheckedCreateWithoutUser_teamInputSchema),
      ]),
      where: z.lazy(() => roleWhereInputSchema).optional(),
    })
    .strict();

export const roleUpdateToOneWithWhereWithoutUser_teamInputSchema: z.ZodType<Prisma.roleUpdateToOneWithWhereWithoutUser_teamInput> =
  z
    .object({
      where: z.lazy(() => roleWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => roleUpdateWithoutUser_teamInputSchema),
        z.lazy(() => roleUncheckedUpdateWithoutUser_teamInputSchema),
      ]),
    })
    .strict();

export const roleUpdateWithoutUser_teamInputSchema: z.ZodType<Prisma.roleUpdateWithoutUser_teamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutRoleNestedInputSchema)
        .optional(),
    })
    .strict();

export const roleUncheckedUpdateWithoutUser_teamInputSchema: z.ZodType<Prisma.roleUncheckedUpdateWithoutUser_teamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutRoleNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const teamUpsertWithoutUsersInputSchema: z.ZodType<Prisma.teamUpsertWithoutUsersInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => teamUpdateWithoutUsersInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutUsersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => teamCreateWithoutUsersInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutUsersInputSchema),
      ]),
      where: z.lazy(() => teamWhereInputSchema).optional(),
    })
    .strict();

export const teamUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.teamUpdateToOneWithWhereWithoutUsersInput> =
  z
    .object({
      where: z.lazy(() => teamWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => teamUpdateWithoutUsersInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutUsersInputSchema),
      ]),
    })
    .strict();

export const teamUpdateWithoutUsersInputSchema: z.ZodType<Prisma.teamUpdateWithoutUsersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(() => inspection_templateUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      workspace: z
        .lazy(() => workspaceUpdateOneRequiredWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.teamUncheckedUpdateWithoutUsersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedUpdateManyWithoutTeamNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUpsertWithoutUser_teamInputSchema: z.ZodType<Prisma.userUpsertWithoutUser_teamInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => userUpdateWithoutUser_teamInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutUser_teamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => userCreateWithoutUser_teamInputSchema),
        z.lazy(() => userUncheckedCreateWithoutUser_teamInputSchema),
      ]),
      where: z.lazy(() => userWhereInputSchema).optional(),
    })
    .strict();

export const userUpdateToOneWithWhereWithoutUser_teamInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutUser_teamInput> =
  z
    .object({
      where: z.lazy(() => userWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => userUpdateWithoutUser_teamInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutUser_teamInputSchema),
      ]),
    })
    .strict();

export const userUpdateWithoutUser_teamInputSchema: z.ZodType<Prisma.userUpdateWithoutUser_teamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(() => step_templateUpdateManyWithoutCreated_byNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedUpdateWithoutUser_teamInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutUser_teamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutCreated_byNestedInputSchema,
        )
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const roleCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamCreateNestedManyWithoutRoleInputSchema)
        .optional(),
    })
    .strict();

export const roleUncheckedCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleUncheckedCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.lazy(() => RoleSchema),
      description: z.string(),
      permissions: z
        .union([
          z.lazy(() => roleCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutRoleInputSchema)
        .optional(),
    })
    .strict();

export const roleCreateOrConnectWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleCreateOrConnectWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => roleWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => roleCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => roleUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const userCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(() => step_templateCreateNestedManyWithoutCreated_byInputSchema)
        .optional(),
      user_team: z
        .lazy(() => user_teamCreateNestedManyWithoutUserInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutCreated_byInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userCreateOrConnectWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => userWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => userCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => userUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const workspaceCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
      user: z.lazy(() => userCreateNestedOneWithoutWorkspacesInputSchema),
    })
    .strict();

export const workspaceUncheckedCreateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceUncheckedCreateWithoutUser_workspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      created_by: z.string(),
      image_uri: z.string().optional().nullable(),
      team: z
        .lazy(() => teamUncheckedCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict();

export const workspaceCreateOrConnectWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceCreateOrConnectWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const roleUpsertWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleUpsertWithoutUser_workspaceInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => roleUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => roleUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => roleCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => roleUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
      where: z.lazy(() => roleWhereInputSchema).optional(),
    })
    .strict();

export const roleUpdateToOneWithWhereWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleUpdateToOneWithWhereWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => roleWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => roleUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => roleUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const roleUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamUpdateManyWithoutRoleNestedInputSchema)
        .optional(),
    })
    .strict();

export const roleUncheckedUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.roleUncheckedUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => roleUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutRoleNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUpsertWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userUpsertWithoutUser_workspaceInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => userUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => userCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => userUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
      where: z.lazy(() => userWhereInputSchema).optional(),
    })
    .strict();

export const userUpdateToOneWithWhereWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => userWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => userUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const userUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(() => step_templateUpdateManyWithoutCreated_byNestedInputSchema)
        .optional(),
      user_team: z
        .lazy(() => user_teamUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutCreated_byNestedInputSchema,
        )
        .optional(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUpsertWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceUpsertWithoutUser_workspaceInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => workspaceUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => workspaceCreateWithoutUser_workspaceInputSchema),
        z.lazy(() => workspaceUncheckedCreateWithoutUser_workspaceInputSchema),
      ]),
      where: z.lazy(() => workspaceWhereInputSchema).optional(),
    })
    .strict();

export const workspaceUpdateToOneWithWhereWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceUpdateToOneWithWhereWithoutUser_workspaceInput> =
  z
    .object({
      where: z.lazy(() => workspaceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => workspaceUpdateWithoutUser_workspaceInputSchema),
        z.lazy(() => workspaceUncheckedUpdateWithoutUser_workspaceInputSchema),
      ]),
    })
    .strict();

export const workspaceUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutWorkspacesNestedInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateWithoutUser_workspaceInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateWithoutUser_workspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUncheckedUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_teamCreateWithoutRoleInputSchema: z.ZodType<Prisma.user_teamCreateWithoutRoleInput> =
  z
    .object({
      team: z.lazy(() => teamCreateNestedOneWithoutUsersInputSchema),
      user: z.lazy(() => userCreateNestedOneWithoutUser_teamInputSchema),
    })
    .strict();

export const user_teamUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUncheckedCreateWithoutRoleInput> =
  z
    .object({
      user_id: z.string(),
      team_id: z.string(),
    })
    .strict();

export const user_teamCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.user_teamCreateOrConnectWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutRoleInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_teamCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.user_teamCreateManyRoleInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_teamCreateManyRoleInputSchema),
        z.lazy(() => user_teamCreateManyRoleInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_workspaceCreateWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceCreateWithoutRoleInput> =
  z
    .object({
      user: z.lazy(() => userCreateNestedOneWithoutUser_workspaceInputSchema),
      workspace: z.lazy(
        () => workspaceCreateNestedOneWithoutUser_workspaceInputSchema,
      ),
    })
    .strict();

export const user_workspaceUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUncheckedCreateWithoutRoleInput> =
  z
    .object({
      user_id: z.string(),
      workspace_id: z.string(),
    })
    .strict();

export const user_workspaceCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceCreateOrConnectWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_workspaceCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.user_workspaceCreateManyRoleInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => user_workspaceCreateManyRoleInputSchema),
        z.lazy(() => user_workspaceCreateManyRoleInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_teamUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUpsertWithWhereUniqueWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_teamUpdateWithoutRoleInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutRoleInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_teamCreateWithoutRoleInputSchema),
        z.lazy(() => user_teamUncheckedCreateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUpdateWithWhereUniqueWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_teamWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateWithoutRoleInputSchema),
        z.lazy(() => user_teamUncheckedUpdateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_teamUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUpdateManyWithWhereWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_teamScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_teamUpdateManyMutationInputSchema),
        z.lazy(() => user_teamUncheckedUpdateManyWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUpsertWithWhereUniqueWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => user_workspaceUpdateWithoutRoleInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutRoleInputSchema),
      ]),
      create: z.union([
        z.lazy(() => user_workspaceCreateWithoutRoleInputSchema),
        z.lazy(() => user_workspaceUncheckedCreateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithWhereUniqueWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateWithoutRoleInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const user_workspaceUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUpdateManyWithWhereWithoutRoleInput> =
  z
    .object({
      where: z.lazy(() => user_workspaceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => user_workspaceUpdateManyMutationInputSchema),
        z.lazy(() => user_workspaceUncheckedUpdateManyWithoutRoleInputSchema),
      ]),
    })
    .strict();

export const teamCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
      workspace: z.lazy(() => workspaceCreateNestedOneWithoutTeamInputSchema),
      users: z
        .lazy(() => user_teamCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamUncheckedCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      workspace_id: z.string(),
      identity: z.string(),
      users: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamCreateOrConnectWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamCreateOrConnectWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => teamCreateWithoutInspection_templateInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutInspection_templateInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutInspection_templateInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedCreateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateCreateManyInspection_templateInputEnvelopeSchema: z.ZodType<Prisma.step_templateCreateManyInspection_templateInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => step_templateCreateManyInspection_templateInputSchema),
        z
          .lazy(() => step_templateCreateManyInspection_templateInputSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_template_snapshotCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () => inspectionCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedCreateWithoutInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateOrConnectWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateOrConnectWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotCreateManyInspection_templateInputEnvelopeSchema: z.ZodType<Prisma.inspection_template_snapshotCreateManyInspection_templateInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotCreateManyInspection_templateInputSchema,
        ),
        z
          .lazy(
            () =>
              inspection_template_snapshotCreateManyInspection_templateInputSchema,
          )
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const teamUpsertWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamUpsertWithoutInspection_templateInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => teamUpdateWithoutInspection_templateInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutInspection_templateInputSchema),
      ]),
      create: z.union([
        z.lazy(() => teamCreateWithoutInspection_templateInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutInspection_templateInputSchema),
      ]),
      where: z.lazy(() => teamWhereInputSchema).optional(),
    })
    .strict();

export const teamUpdateToOneWithWhereWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamUpdateToOneWithWhereWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => teamWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => teamUpdateWithoutInspection_templateInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutInspection_templateInputSchema),
      ]),
    })
    .strict();

export const teamUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace: z
        .lazy(() => workspaceUpdateOneRequiredWithoutTeamNestedInputSchema)
        .optional(),
      users: z
        .lazy(() => user_teamUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.teamUncheckedUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUpsertWithWhereUniqueWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUpsertWithWhereUniqueWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => step_templateUpdateWithoutInspection_templateInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedUpdateWithoutInspection_templateInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutInspection_templateInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedCreateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateUpdateWithWhereUniqueWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUpdateWithWhereUniqueWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateWithoutInspection_templateInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedUpdateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateUpdateManyWithWhereWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithWhereWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => step_templateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpsertWithWhereUniqueWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotUpdateWithoutInspection_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutInspection_templateInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotCreateWithoutInspection_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateWithWhereUniqueWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotUpdateWithoutInspection_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateManyWithWhereWithoutInspection_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => inspection_template_snapshotUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotScalarWhereInputSchema: z.ZodType<Prisma.inspection_template_snapshotScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => inspection_template_snapshotScalarWhereInputSchema),
          z
            .lazy(() => inspection_template_snapshotScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => inspection_template_snapshotScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => inspection_template_snapshotScalarWhereInputSchema),
          z
            .lazy(() => inspection_template_snapshotScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      inspection_template_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const inspection_templateCreateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateCreateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team: z.lazy(
        () => teamCreateNestedOneWithoutInspection_templateInputSchema,
      ),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateUncheckedCreateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateCreateOrConnectWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            inspection_templateCreateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            inspection_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateCreateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateCreateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            step_templateCreateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateCreateManyInspection_template_snapshotInputEnvelopeSchema: z.ZodType<Prisma.step_templateCreateManyInspection_template_snapshotInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(
          () => step_templateCreateManyInspection_template_snapshotInputSchema,
        ),
        z
          .lazy(
            () =>
              step_templateCreateManyInspection_template_snapshotInputSchema,
          )
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspectionCreateWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionCreateWithoutInspection_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      team: z.lazy(() => teamCreateNestedOneWithoutInspectionInputSchema),
      step: z
        .lazy(() => stepCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateWithoutInspection_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutInspectionInputSchema)
        .optional(),
    })
    .strict();

export const inspectionCreateOrConnectWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionCreateOrConnectWithoutInspection_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
        z.lazy(
          () => inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspectionCreateManyInspection_snapshotInputEnvelopeSchema: z.ZodType<Prisma.inspectionCreateManyInspection_snapshotInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => inspectionCreateManyInspection_snapshotInputSchema),
        z
          .lazy(() => inspectionCreateManyInspection_snapshotInputSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_templateUpsertWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateUpsertWithoutInspection_template_snapshotInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () =>
            inspection_templateUpdateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            inspection_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            inspection_templateCreateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            inspection_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
      where: z.lazy(() => inspection_templateWhereInputSchema).optional(),
    })
    .strict();

export const inspection_templateUpdateToOneWithWhereWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateUpdateToOneWithWhereWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereInputSchema).optional(),
      data: z.union([
        z.lazy(
          () =>
            inspection_templateUpdateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            inspection_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_templateUpdateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateUpdateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(
          () =>
            teamUpdateOneRequiredWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUpsertWithWhereUniqueWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            step_templateUpdateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            step_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            step_templateCreateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            step_templateUncheckedCreateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUpdateWithWhereUniqueWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            step_templateUpdateWithoutInspection_template_snapshotInputSchema,
        ),
        z.lazy(
          () =>
            step_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithWhereWithoutInspection_template_snapshotInput> =
  z
    .object({
      where: z.lazy(() => step_templateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_template_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUpsertWithWhereUniqueWithoutInspection_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => inspectionUpdateWithoutInspection_snapshotInputSchema),
        z.lazy(
          () => inspectionUncheckedUpdateWithoutInspection_snapshotInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutInspection_snapshotInputSchema),
        z.lazy(
          () => inspectionUncheckedCreateWithoutInspection_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUpdateWithWhereUniqueWithoutInspection_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => inspectionUpdateWithoutInspection_snapshotInputSchema),
        z.lazy(
          () => inspectionUncheckedUpdateWithoutInspection_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspectionUpdateManyWithWhereWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUpdateManyWithWhereWithoutInspection_snapshotInput> =
  z
    .object({
      where: z.lazy(() => inspectionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => inspectionUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            inspectionUncheckedUpdateManyWithoutInspection_snapshotInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_templateCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team: z.lazy(
        () => teamCreateNestedOneWithoutInspection_templateInputSchema,
      ),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateUncheckedCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedCreateNestedManyWithoutInspection_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateCreateOrConnectWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateCreateOrConnectWithoutStep_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => inspection_templateCreateWithoutStep_templateInputSchema),
        z.lazy(
          () =>
            inspection_templateUncheckedCreateWithoutStep_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const userCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.userCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      user_team: z
        .lazy(() => user_teamCreateNestedManyWithoutUserInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      image_uri: z.string().optional().nullable(),
      email: z.string(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      external_id: z.string().optional().nullable(),
      user_team: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const userCreateOrConnectWithoutStep_templateInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutStep_templateInput> =
  z
    .object({
      where: z.lazy(() => userWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => userCreateWithoutStep_templateInputSchema),
        z.lazy(() => userUncheckedCreateWithoutStep_templateInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateCreateWithoutSub_stepsInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutSub_stepsInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutSub_stepsInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutSub_stepsInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutSub_stepsInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateCreateWithoutParent_stepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepCreateNestedManyWithoutStepInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutParent_stepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedCreateNestedManyWithoutStepInputSchema)
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutParent_stepInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutParent_stepInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateManyParent_stepInputEnvelopeSchema: z.ZodType<Prisma.step_templateCreateManyParent_stepInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => step_templateCreateManyParent_stepInputSchema),
        z.lazy(() => step_templateCreateManyParent_stepInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_template_snapshotCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template: z.lazy(
        () =>
          inspection_templateCreateNestedOneWithoutInspection_template_snapshotInputSchema,
      ),
      inspection: z
        .lazy(
          () => inspectionCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedCreateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedCreateWithoutStep_templateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template_id: z.string(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedCreateNestedManyWithoutInspection_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateOrConnectWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateOrConnectWithoutStep_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotCreateWithoutStep_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutStep_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const stepCreateWithoutStepInputSchema: z.ZodType<Prisma.stepCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection: z.lazy(() => inspectionCreateNestedOneWithoutStepInputSchema),
    })
    .strict();

export const stepUncheckedCreateWithoutStepInputSchema: z.ZodType<Prisma.stepUncheckedCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      inspection_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const stepCreateOrConnectWithoutStepInputSchema: z.ZodType<Prisma.stepCreateOrConnectWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => stepCreateWithoutStepInputSchema),
        z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const stepCreateManyStepInputEnvelopeSchema: z.ZodType<Prisma.stepCreateManyStepInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => stepCreateManyStepInputSchema),
        z.lazy(() => stepCreateManyStepInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_templateUpsertWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateUpsertWithoutStep_templateInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => inspection_templateUpdateWithoutStep_templateInputSchema),
        z.lazy(
          () =>
            inspection_templateUncheckedUpdateWithoutStep_templateInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => inspection_templateCreateWithoutStep_templateInputSchema),
        z.lazy(
          () =>
            inspection_templateUncheckedCreateWithoutStep_templateInputSchema,
        ),
      ]),
      where: z.lazy(() => inspection_templateWhereInputSchema).optional(),
    })
    .strict();

export const inspection_templateUpdateToOneWithWhereWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateUpdateToOneWithWhereWithoutStep_templateInput> =
  z
    .object({
      where: z.lazy(() => inspection_templateWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => inspection_templateUpdateWithoutStep_templateInputSchema),
        z.lazy(
          () =>
            inspection_templateUncheckedUpdateWithoutStep_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_templateUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(
          () =>
            teamUpdateOneRequiredWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const userUpsertWithoutStep_templateInputSchema: z.ZodType<Prisma.userUpsertWithoutStep_templateInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => userUpdateWithoutStep_templateInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutStep_templateInputSchema),
      ]),
      create: z.union([
        z.lazy(() => userCreateWithoutStep_templateInputSchema),
        z.lazy(() => userUncheckedCreateWithoutStep_templateInputSchema),
      ]),
      where: z.lazy(() => userWhereInputSchema).optional(),
    })
    .strict();

export const userUpdateToOneWithWhereWithoutStep_templateInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutStep_templateInput> =
  z
    .object({
      where: z.lazy(() => userWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => userUpdateWithoutStep_templateInputSchema),
        z.lazy(() => userUncheckedUpdateWithoutStep_templateInputSchema),
      ]),
    })
    .strict();

export const userUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.userUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_team: z
        .lazy(() => user_teamUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      workspaces: z
        .lazy(() => workspaceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const userUncheckedUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      external_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_team: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () => user_workspaceUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      workspaces: z
        .lazy(() => workspaceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUpsertWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateUpsertWithoutSub_stepsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => step_templateUpdateWithoutSub_stepsInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutSub_stepsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutSub_stepsInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutSub_stepsInputSchema),
      ]),
      where: z.lazy(() => step_templateWhereInputSchema).optional(),
    })
    .strict();

export const step_templateUpdateToOneWithWhereWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateUpdateToOneWithWhereWithoutSub_stepsInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => step_templateUpdateWithoutSub_stepsInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutSub_stepsInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutSub_stepsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutSub_stepsInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutSub_stepsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUpsertWithWhereUniqueWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUpsertWithWhereUniqueWithoutParent_stepInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => step_templateUpdateWithoutParent_stepInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutParent_stepInputSchema),
      ]),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutParent_stepInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutParent_stepInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateWithWhereUniqueWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUpdateWithWhereUniqueWithoutParent_stepInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateWithoutParent_stepInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutParent_stepInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateManyWithWhereWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUpdateManyWithWhereWithoutParent_stepInput> =
  z
    .object({
      where: z.lazy(() => step_templateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => step_templateUpdateManyMutationInputSchema),
        z.lazy(
          () => step_templateUncheckedUpdateManyWithoutParent_stepInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpsertWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpsertWithoutStep_templateInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotUpdateWithoutStep_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutStep_templateInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotCreateWithoutStep_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutStep_templateInputSchema,
        ),
      ]),
      where: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateToOneWithWhereWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateToOneWithWhereWithoutStep_templateInput> =
  z
    .object({
      where: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
      data: z.union([
        z.lazy(
          () =>
            inspection_template_snapshotUpdateWithoutStep_templateInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutStep_templateInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () => inspectionUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateWithoutStep_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateWithoutStep_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const stepUpsertWithWhereUniqueWithoutStepInputSchema: z.ZodType<Prisma.stepUpsertWithWhereUniqueWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => stepUpdateWithoutStepInputSchema),
        z.lazy(() => stepUncheckedUpdateWithoutStepInputSchema),
      ]),
      create: z.union([
        z.lazy(() => stepCreateWithoutStepInputSchema),
        z.lazy(() => stepUncheckedCreateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const stepUpdateWithWhereUniqueWithoutStepInputSchema: z.ZodType<Prisma.stepUpdateWithWhereUniqueWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => stepUpdateWithoutStepInputSchema),
        z.lazy(() => stepUncheckedUpdateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const stepUpdateManyWithWhereWithoutStepInputSchema: z.ZodType<Prisma.stepUpdateManyWithWhereWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => stepScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => stepUpdateManyMutationInputSchema),
        z.lazy(() => stepUncheckedUpdateManyWithoutStepInputSchema),
      ]),
    })
    .strict();

export const stepScalarWhereInputSchema: z.ZodType<Prisma.stepScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => stepScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => stepScalarWhereInputSchema),
          z.lazy(() => stepScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      inspection_id: z
        .union([z.lazy(() => UuidFilterSchema), z.string()])
        .optional(),
      step_id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      created_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updated_at: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const teamCreateWithoutInspectionInputSchema: z.ZodType<Prisma.teamCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
      inspection_template: z
        .lazy(() => inspection_templateCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      workspace: z.lazy(() => workspaceCreateNestedOneWithoutTeamInputSchema),
      users: z
        .lazy(() => user_teamCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedCreateWithoutInspectionInputSchema: z.ZodType<Prisma.teamUncheckedCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      workspace_id: z.string(),
      identity: z.string(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedCreateNestedManyWithoutTeamInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const teamCreateOrConnectWithoutInspectionInputSchema: z.ZodType<Prisma.teamCreateOrConnectWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => teamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => teamCreateWithoutInspectionInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const inspection_template_snapshotCreateWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template: z.lazy(
        () =>
          inspection_templateCreateNestedOneWithoutInspection_template_snapshotInputSchema,
      ),
      step_template: z
        .lazy(
          () =>
            step_templateCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedCreateWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      inspection_template_id: z.string(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutInspection_template_snapshotInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotCreateOrConnectWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateOrConnectWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => inspection_template_snapshotWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => inspection_template_snapshotCreateWithoutInspectionInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutInspectionInputSchema,
        ),
      ]),
    })
    .strict();

export const stepCreateWithoutInspectionInputSchema: z.ZodType<Prisma.stepCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      step: z.lazy(() => step_templateCreateNestedOneWithoutStepInputSchema),
    })
    .strict();

export const stepUncheckedCreateWithoutInspectionInputSchema: z.ZodType<Prisma.stepUncheckedCreateWithoutInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      step_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const stepCreateOrConnectWithoutInspectionInputSchema: z.ZodType<Prisma.stepCreateOrConnectWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => stepCreateWithoutInspectionInputSchema),
        z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const stepCreateManyInspectionInputEnvelopeSchema: z.ZodType<Prisma.stepCreateManyInspectionInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => stepCreateManyInspectionInputSchema),
        z.lazy(() => stepCreateManyInspectionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const teamUpsertWithoutInspectionInputSchema: z.ZodType<Prisma.teamUpsertWithoutInspectionInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => teamUpdateWithoutInspectionInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutInspectionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => teamCreateWithoutInspectionInputSchema),
        z.lazy(() => teamUncheckedCreateWithoutInspectionInputSchema),
      ]),
      where: z.lazy(() => teamWhereInputSchema).optional(),
    })
    .strict();

export const teamUpdateToOneWithWhereWithoutInspectionInputSchema: z.ZodType<Prisma.teamUpdateToOneWithWhereWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => teamWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => teamUpdateWithoutInspectionInputSchema),
        z.lazy(() => teamUncheckedUpdateWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const teamUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.teamUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(() => inspection_templateUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      workspace: z
        .lazy(() => workspaceUpdateOneRequiredWithoutTeamNestedInputSchema)
        .optional(),
      users: z
        .lazy(() => user_teamUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.teamUncheckedUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedUpdateManyWithoutTeamNestedInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpsertWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpsertWithoutInspectionInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () => inspection_template_snapshotUpdateWithoutInspectionInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutInspectionInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => inspection_template_snapshotCreateWithoutInspectionInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedCreateWithoutInspectionInputSchema,
        ),
      ]),
      where: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUpdateToOneWithWhereWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateToOneWithWhereWithoutInspectionInput> =
  z
    .object({
      where: z
        .lazy(() => inspection_template_snapshotWhereInputSchema)
        .optional(),
      data: z.union([
        z.lazy(
          () => inspection_template_snapshotUpdateWithoutInspectionInputSchema,
        ),
        z.lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateWithoutInspectionInputSchema,
        ),
      ]),
    })
    .strict();

export const inspection_template_snapshotUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const stepUpsertWithWhereUniqueWithoutInspectionInputSchema: z.ZodType<Prisma.stepUpsertWithWhereUniqueWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => stepUpdateWithoutInspectionInputSchema),
        z.lazy(() => stepUncheckedUpdateWithoutInspectionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => stepCreateWithoutInspectionInputSchema),
        z.lazy(() => stepUncheckedCreateWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const stepUpdateWithWhereUniqueWithoutInspectionInputSchema: z.ZodType<Prisma.stepUpdateWithWhereUniqueWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => stepWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => stepUpdateWithoutInspectionInputSchema),
        z.lazy(() => stepUncheckedUpdateWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const stepUpdateManyWithWhereWithoutInspectionInputSchema: z.ZodType<Prisma.stepUpdateManyWithWhereWithoutInspectionInput> =
  z
    .object({
      where: z.lazy(() => stepScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => stepUpdateManyMutationInputSchema),
        z.lazy(() => stepUncheckedUpdateManyWithoutInspectionInputSchema),
      ]),
    })
    .strict();

export const inspectionCreateWithoutStepInputSchema: z.ZodType<Prisma.inspectionCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      team: z.lazy(() => teamCreateNestedOneWithoutInspectionInputSchema),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutInspectionInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspectionUncheckedCreateWithoutStepInputSchema: z.ZodType<Prisma.inspectionUncheckedCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const inspectionCreateOrConnectWithoutStepInputSchema: z.ZodType<Prisma.inspectionCreateOrConnectWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutStepInputSchema),
        z.lazy(() => inspectionUncheckedCreateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const step_templateCreateWithoutStepInputSchema: z.ZodType<Prisma.step_templateCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      order: z.number().int().optional().nullable(),
      inspection_template: z.lazy(
        () => inspection_templateCreateNestedOneWithoutStep_templateInputSchema,
      ),
      created_by: z
        .lazy(() => userCreateNestedOneWithoutStep_templateInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateCreateNestedOneWithoutSub_stepsInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateCreateNestedManyWithoutParent_stepInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotCreateNestedOneWithoutStep_templateInputSchema,
        )
        .optional(),
    })
    .strict();

export const step_templateUncheckedCreateWithoutStepInputSchema: z.ZodType<Prisma.step_templateUncheckedCreateWithoutStepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedCreateNestedManyWithoutParent_stepInputSchema,
        )
        .optional(),
    })
    .strict();

export const step_templateCreateOrConnectWithoutStepInputSchema: z.ZodType<Prisma.step_templateCreateOrConnectWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutStepInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const inspectionUpsertWithoutStepInputSchema: z.ZodType<Prisma.inspectionUpsertWithoutStepInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => inspectionUpdateWithoutStepInputSchema),
        z.lazy(() => inspectionUncheckedUpdateWithoutStepInputSchema),
      ]),
      create: z.union([
        z.lazy(() => inspectionCreateWithoutStepInputSchema),
        z.lazy(() => inspectionUncheckedCreateWithoutStepInputSchema),
      ]),
      where: z.lazy(() => inspectionWhereInputSchema).optional(),
    })
    .strict();

export const inspectionUpdateToOneWithWhereWithoutStepInputSchema: z.ZodType<Prisma.inspectionUpdateToOneWithWhereWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => inspectionWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => inspectionUpdateWithoutStepInputSchema),
        z.lazy(() => inspectionUncheckedUpdateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const inspectionUpdateWithoutStepInputSchema: z.ZodType<Prisma.inspectionUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutInspectionNestedInputSchema)
        .optional(),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutInspectionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateWithoutStepInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const step_templateUpsertWithoutStepInputSchema: z.ZodType<Prisma.step_templateUpsertWithoutStepInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => step_templateUpdateWithoutStepInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutStepInputSchema),
      ]),
      create: z.union([
        z.lazy(() => step_templateCreateWithoutStepInputSchema),
        z.lazy(() => step_templateUncheckedCreateWithoutStepInputSchema),
      ]),
      where: z.lazy(() => step_templateWhereInputSchema).optional(),
    })
    .strict();

export const step_templateUpdateToOneWithWhereWithoutStepInputSchema: z.ZodType<Prisma.step_templateUpdateToOneWithWhereWithoutStepInput> =
  z
    .object({
      where: z.lazy(() => step_templateWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => step_templateUpdateWithoutStepInputSchema),
        z.lazy(() => step_templateUncheckedUpdateWithoutStepInputSchema),
      ]),
    })
    .strict();

export const step_templateUpdateWithoutStepInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutStepInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const step_templateCreateManyCreated_byInputSchema: z.ZodType<Prisma.step_templateCreateManyCreated_byInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const user_teamCreateManyUserInputSchema: z.ZodType<Prisma.user_teamCreateManyUserInput> =
  z
    .object({
      team_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const user_workspaceCreateManyUserInputSchema: z.ZodType<Prisma.user_workspaceCreateManyUserInput> =
  z
    .object({
      workspace_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const workspaceCreateManyUserInputSchema: z.ZodType<Prisma.workspaceCreateManyUserInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      url_key: z.string(),
      image_uri: z.string().optional().nullable(),
    })
    .strict();

export const step_templateUpdateWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutCreated_byInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutCreated_byInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutCreated_byInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutCreated_byInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamUpdateWithoutUserInputSchema: z.ZodType<Prisma.user_teamUpdateWithoutUserInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_teamNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutUsersNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateWithoutUserInput> =
  z
    .object({
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceUpdateWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithoutUserInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_workspaceNestedInputSchema)
        .optional(),
      workspace: z
        .lazy(
          () =>
            workspaceUpdateOneRequiredWithoutUser_workspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateWithoutUserInput> =
  z
    .object({
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const workspaceUpdateWithoutUserInputSchema: z.ZodType<Prisma.workspaceUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(() => user_workspaceUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      team: z
        .lazy(() => teamUncheckedUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
      user_workspace: z
        .lazy(
          () =>
            user_workspaceUncheckedUpdateManyWithoutWorkspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const workspaceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.workspaceUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url_key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const inspection_templateCreateManyTeamInputSchema: z.ZodType<Prisma.inspection_templateCreateManyTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const user_teamCreateManyTeamInputSchema: z.ZodType<Prisma.user_teamCreateManyTeamInput> =
  z
    .object({
      user_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const inspectionCreateManyTeamInputSchema: z.ZodType<Prisma.inspectionCreateManyTeamInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      status: z.lazy(() => StatusSchema).optional(),
      inspection_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const inspection_templateUpdateWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_templateUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.inspection_templateUncheckedUpdateManyWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_teamUpdateWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUpdateWithoutTeamInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_teamNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_teamNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutTeamInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const inspectionUpdateWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutInspectionNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateManyWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const teamCreateManyWorkspaceInputSchema: z.ZodType<Prisma.teamCreateManyWorkspaceInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image_uri: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      identity: z.string(),
    })
    .strict();

export const user_workspaceCreateManyWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceCreateManyWorkspaceInput> =
  z
    .object({
      user_id: z.string(),
      role_id: z.string().optional().nullable(),
    })
    .strict();

export const teamUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUpdateWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(() => inspection_templateUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      users: z
        .lazy(() => user_teamUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUncheckedUpdateWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUncheckedUpdateManyWithoutTeamNestedInputSchema,
        )
        .optional(),
      users: z
        .lazy(() => user_teamUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      inspection: z
        .lazy(() => inspectionUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const teamUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.teamUncheckedUpdateManyWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_uri: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identity: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithoutWorkspaceInput> =
  z
    .object({
      role: z
        .lazy(() => roleUpdateOneWithoutUser_workspaceNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_workspaceNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateWithoutWorkspaceInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutWorkspaceInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const user_teamCreateManyRoleInputSchema: z.ZodType<Prisma.user_teamCreateManyRoleInput> =
  z
    .object({
      user_id: z.string(),
      team_id: z.string(),
    })
    .strict();

export const user_workspaceCreateManyRoleInputSchema: z.ZodType<Prisma.user_workspaceCreateManyRoleInput> =
  z
    .object({
      user_id: z.string(),
      workspace_id: z.string(),
    })
    .strict();

export const user_teamUpdateWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUpdateWithoutRoleInput> =
  z
    .object({
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutUsersNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_teamNestedInputSchema)
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateWithoutRoleInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_teamUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.user_teamUncheckedUpdateManyWithoutRoleInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUpdateWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUpdateWithoutRoleInput> =
  z
    .object({
      user: z
        .lazy(() => userUpdateOneRequiredWithoutUser_workspaceNestedInputSchema)
        .optional(),
      workspace: z
        .lazy(
          () =>
            workspaceUpdateOneRequiredWithoutUser_workspaceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateWithoutRoleInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.user_workspaceUncheckedUpdateManyWithoutRoleInput> =
  z
    .object({
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateCreateManyInspection_templateInputSchema: z.ZodType<Prisma.step_templateCreateManyInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const inspection_template_snapshotCreateManyInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotCreateManyInspection_templateInput> =
  z
    .object({
      id: z.string().optional(),
      version: z.number().int().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const step_templateUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const inspection_template_snapshotUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () => inspectionUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_template: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutInspection_template_snapshotNestedInputSchema,
        )
        .optional(),
      inspection: z
        .lazy(
          () =>
            inspectionUncheckedUpdateManyWithoutInspection_snapshotNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateInputSchema: z.ZodType<Prisma.inspection_template_snapshotUncheckedUpdateManyWithoutInspection_templateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateCreateManyInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateCreateManyInspection_template_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      parent_step_id: z.string().optional().nullable(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
    })
    .strict();

export const inspectionCreateManyInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionCreateManyInspection_snapshotInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      team_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
    })
    .strict();

export const step_templateUpdateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      parent_step: z
        .lazy(() => step_templateUpdateOneWithoutSub_stepsNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutInspection_template_snapshotInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutInspection_template_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent_step_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const inspectionUpdateWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUpdateWithoutInspection_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(() => teamUpdateOneRequiredWithoutInspectionNestedInputSchema)
        .optional(),
      step: z
        .lazy(() => stepUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateWithoutInspection_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutInspectionNestedInputSchema)
        .optional(),
    })
    .strict();

export const inspectionUncheckedUpdateManyWithoutInspection_snapshotInputSchema: z.ZodType<Prisma.inspectionUncheckedUpdateManyWithoutInspection_snapshotInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const step_templateCreateManyParent_stepInputSchema: z.ZodType<Prisma.step_templateCreateManyParent_stepInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
      created_by_id: z.string().optional().nullable(),
      order: z.number().int().optional().nullable(),
      inspection_template_id: z.string(),
      inspection_template_snapshot_id: z.string().optional().nullable(),
    })
    .strict();

export const stepCreateManyStepInputSchema: z.ZodType<Prisma.stepCreateManyStepInput> =
  z
    .object({
      id: z.string().optional(),
      inspection_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const step_templateUpdateWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUpdateWithoutParent_stepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template: z
        .lazy(
          () =>
            inspection_templateUpdateOneRequiredWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      created_by: z
        .lazy(() => userUpdateOneWithoutStep_templateNestedInputSchema)
        .optional(),
      sub_steps: z
        .lazy(() => step_templateUpdateManyWithoutParent_stepNestedInputSchema)
        .optional(),
      inspection_template_snapshot: z
        .lazy(
          () =>
            inspection_template_snapshotUpdateOneWithoutStep_templateNestedInputSchema,
        )
        .optional(),
      step: z.lazy(() => stepUpdateManyWithoutStepNestedInputSchema).optional(),
    })
    .strict();

export const step_templateUncheckedUpdateWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateWithoutParent_stepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sub_steps: z
        .lazy(
          () =>
            step_templateUncheckedUpdateManyWithoutParent_stepNestedInputSchema,
        )
        .optional(),
      step: z
        .lazy(() => stepUncheckedUpdateManyWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const step_templateUncheckedUpdateManyWithoutParent_stepInputSchema: z.ZodType<Prisma.step_templateUncheckedUpdateManyWithoutParent_stepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_by_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inspection_template_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_template_snapshot_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const stepUpdateWithoutStepInputSchema: z.ZodType<Prisma.stepUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection: z
        .lazy(() => inspectionUpdateOneRequiredWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateWithoutStepInputSchema: z.ZodType<Prisma.stepUncheckedUpdateWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateManyWithoutStepInputSchema: z.ZodType<Prisma.stepUncheckedUpdateManyWithoutStepInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inspection_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const stepCreateManyInspectionInputSchema: z.ZodType<Prisma.stepCreateManyInspectionInput> =
  z
    .object({
      id: z.string().optional(),
      step_id: z.string(),
      status: z.lazy(() => StatusSchema).optional(),
      created_at: z.coerce.date().optional(),
      updated_at: z.coerce.date().optional(),
    })
    .strict();

export const stepUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.stepUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step: z
        .lazy(() => step_templateUpdateOneRequiredWithoutStepNestedInputSchema)
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateWithoutInspectionInputSchema: z.ZodType<Prisma.stepUncheckedUpdateWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const stepUncheckedUpdateManyWithoutInspectionInputSchema: z.ZodType<Prisma.stepUncheckedUpdateManyWithoutInspectionInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      step_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updated_at: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const userFindFirstArgsSchema: z.ZodType<Prisma.userFindFirstArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    where: userWhereInputSchema.optional(),
    orderBy: z
      .union([
        userOrderByWithRelationInputSchema.array(),
        userOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: userWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const userFindFirstOrThrowArgsSchema: z.ZodType<Prisma.userFindFirstOrThrowArgs> =
  z
    .object({
      select: userSelectSchema.optional(),
      include: userIncludeSchema.optional(),
      where: userWhereInputSchema.optional(),
      orderBy: z
        .union([
          userOrderByWithRelationInputSchema.array(),
          userOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: userWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const userFindManyArgsSchema: z.ZodType<Prisma.userFindManyArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    where: userWhereInputSchema.optional(),
    orderBy: z
      .union([
        userOrderByWithRelationInputSchema.array(),
        userOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: userWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const userAggregateArgsSchema: z.ZodType<Prisma.userAggregateArgs> = z
  .object({
    where: userWhereInputSchema.optional(),
    orderBy: z
      .union([
        userOrderByWithRelationInputSchema.array(),
        userOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: userWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const userGroupByArgsSchema: z.ZodType<Prisma.userGroupByArgs> = z
  .object({
    where: userWhereInputSchema.optional(),
    orderBy: z
      .union([
        userOrderByWithAggregationInputSchema.array(),
        userOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: userScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const userFindUniqueArgsSchema: z.ZodType<Prisma.userFindUniqueArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    where: userWhereUniqueInputSchema,
  })
  .strict();

export const userFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.userFindUniqueOrThrowArgs> =
  z
    .object({
      select: userSelectSchema.optional(),
      include: userIncludeSchema.optional(),
      where: userWhereUniqueInputSchema,
    })
    .strict();

export const teamFindFirstArgsSchema: z.ZodType<Prisma.teamFindFirstArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    where: teamWhereInputSchema.optional(),
    orderBy: z
      .union([
        teamOrderByWithRelationInputSchema.array(),
        teamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: teamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const teamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.teamFindFirstOrThrowArgs> =
  z
    .object({
      select: teamSelectSchema.optional(),
      include: teamIncludeSchema.optional(),
      where: teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          teamOrderByWithRelationInputSchema.array(),
          teamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: teamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const teamFindManyArgsSchema: z.ZodType<Prisma.teamFindManyArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    where: teamWhereInputSchema.optional(),
    orderBy: z
      .union([
        teamOrderByWithRelationInputSchema.array(),
        teamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: teamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const teamAggregateArgsSchema: z.ZodType<Prisma.teamAggregateArgs> = z
  .object({
    where: teamWhereInputSchema.optional(),
    orderBy: z
      .union([
        teamOrderByWithRelationInputSchema.array(),
        teamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: teamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const teamGroupByArgsSchema: z.ZodType<Prisma.teamGroupByArgs> = z
  .object({
    where: teamWhereInputSchema.optional(),
    orderBy: z
      .union([
        teamOrderByWithAggregationInputSchema.array(),
        teamOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TeamScalarFieldEnumSchema.array(),
    having: teamScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const teamFindUniqueArgsSchema: z.ZodType<Prisma.teamFindUniqueArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    where: teamWhereUniqueInputSchema,
  })
  .strict();

export const teamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.teamFindUniqueOrThrowArgs> =
  z
    .object({
      select: teamSelectSchema.optional(),
      include: teamIncludeSchema.optional(),
      where: teamWhereUniqueInputSchema,
    })
    .strict();

export const workspaceFindFirstArgsSchema: z.ZodType<Prisma.workspaceFindFirstArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          workspaceOrderByWithRelationInputSchema.array(),
          workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.workspaceFindFirstOrThrowArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          workspaceOrderByWithRelationInputSchema.array(),
          workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceFindManyArgsSchema: z.ZodType<Prisma.workspaceFindManyArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          workspaceOrderByWithRelationInputSchema.array(),
          workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const workspaceAggregateArgsSchema: z.ZodType<Prisma.workspaceAggregateArgs> =
  z
    .object({
      where: workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          workspaceOrderByWithRelationInputSchema.array(),
          workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const workspaceGroupByArgsSchema: z.ZodType<Prisma.workspaceGroupByArgs> =
  z
    .object({
      where: workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          workspaceOrderByWithAggregationInputSchema.array(),
          workspaceOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: WorkspaceScalarFieldEnumSchema.array(),
      having: workspaceScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const workspaceFindUniqueArgsSchema: z.ZodType<Prisma.workspaceFindUniqueArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereUniqueInputSchema,
    })
    .strict();

export const workspaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.workspaceFindUniqueOrThrowArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereUniqueInputSchema,
    })
    .strict();

export const user_teamFindFirstArgsSchema: z.ZodType<Prisma.user_teamFindFirstArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_teamOrderByWithRelationInputSchema.array(),
          user_teamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_teamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_teamScalarFieldEnumSchema,
          User_teamScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.user_teamFindFirstOrThrowArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_teamOrderByWithRelationInputSchema.array(),
          user_teamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_teamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_teamScalarFieldEnumSchema,
          User_teamScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamFindManyArgsSchema: z.ZodType<Prisma.user_teamFindManyArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_teamOrderByWithRelationInputSchema.array(),
          user_teamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_teamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_teamScalarFieldEnumSchema,
          User_teamScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_teamAggregateArgsSchema: z.ZodType<Prisma.user_teamAggregateArgs> =
  z
    .object({
      where: user_teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_teamOrderByWithRelationInputSchema.array(),
          user_teamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_teamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const user_teamGroupByArgsSchema: z.ZodType<Prisma.user_teamGroupByArgs> =
  z
    .object({
      where: user_teamWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_teamOrderByWithAggregationInputSchema.array(),
          user_teamOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: User_teamScalarFieldEnumSchema.array(),
      having: user_teamScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const user_teamFindUniqueArgsSchema: z.ZodType<Prisma.user_teamFindUniqueArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereUniqueInputSchema,
    })
    .strict();

export const user_teamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.user_teamFindUniqueOrThrowArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereUniqueInputSchema,
    })
    .strict();

export const user_workspaceFindFirstArgsSchema: z.ZodType<Prisma.user_workspaceFindFirstArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_workspaceOrderByWithRelationInputSchema.array(),
          user_workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_workspaceScalarFieldEnumSchema,
          User_workspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.user_workspaceFindFirstOrThrowArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_workspaceOrderByWithRelationInputSchema.array(),
          user_workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_workspaceScalarFieldEnumSchema,
          User_workspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceFindManyArgsSchema: z.ZodType<Prisma.user_workspaceFindManyArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_workspaceOrderByWithRelationInputSchema.array(),
          user_workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          User_workspaceScalarFieldEnumSchema,
          User_workspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const user_workspaceAggregateArgsSchema: z.ZodType<Prisma.user_workspaceAggregateArgs> =
  z
    .object({
      where: user_workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_workspaceOrderByWithRelationInputSchema.array(),
          user_workspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: user_workspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const user_workspaceGroupByArgsSchema: z.ZodType<Prisma.user_workspaceGroupByArgs> =
  z
    .object({
      where: user_workspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          user_workspaceOrderByWithAggregationInputSchema.array(),
          user_workspaceOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: User_workspaceScalarFieldEnumSchema.array(),
      having: user_workspaceScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const user_workspaceFindUniqueArgsSchema: z.ZodType<Prisma.user_workspaceFindUniqueArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereUniqueInputSchema,
    })
    .strict();

export const user_workspaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.user_workspaceFindUniqueOrThrowArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereUniqueInputSchema,
    })
    .strict();

export const roleFindFirstArgsSchema: z.ZodType<Prisma.roleFindFirstArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    where: roleWhereInputSchema.optional(),
    orderBy: z
      .union([
        roleOrderByWithRelationInputSchema.array(),
        roleOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: roleWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RoleScalarFieldEnumSchema, RoleScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const roleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.roleFindFirstOrThrowArgs> =
  z
    .object({
      select: roleSelectSchema.optional(),
      include: roleIncludeSchema.optional(),
      where: roleWhereInputSchema.optional(),
      orderBy: z
        .union([
          roleOrderByWithRelationInputSchema.array(),
          roleOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: roleWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([RoleScalarFieldEnumSchema, RoleScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const roleFindManyArgsSchema: z.ZodType<Prisma.roleFindManyArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    where: roleWhereInputSchema.optional(),
    orderBy: z
      .union([
        roleOrderByWithRelationInputSchema.array(),
        roleOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: roleWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RoleScalarFieldEnumSchema, RoleScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const roleAggregateArgsSchema: z.ZodType<Prisma.roleAggregateArgs> = z
  .object({
    where: roleWhereInputSchema.optional(),
    orderBy: z
      .union([
        roleOrderByWithRelationInputSchema.array(),
        roleOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: roleWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const roleGroupByArgsSchema: z.ZodType<Prisma.roleGroupByArgs> = z
  .object({
    where: roleWhereInputSchema.optional(),
    orderBy: z
      .union([
        roleOrderByWithAggregationInputSchema.array(),
        roleOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: RoleScalarFieldEnumSchema.array(),
    having: roleScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const roleFindUniqueArgsSchema: z.ZodType<Prisma.roleFindUniqueArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    where: roleWhereUniqueInputSchema,
  })
  .strict();

export const roleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.roleFindUniqueOrThrowArgs> =
  z
    .object({
      select: roleSelectSchema.optional(),
      include: roleIncludeSchema.optional(),
      where: roleWhereUniqueInputSchema,
    })
    .strict();

export const inspection_templateFindFirstArgsSchema: z.ZodType<Prisma.inspection_templateFindFirstArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_templateOrderByWithRelationInputSchema.array(),
          inspection_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_templateScalarFieldEnumSchema,
          Inspection_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.inspection_templateFindFirstOrThrowArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_templateOrderByWithRelationInputSchema.array(),
          inspection_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_templateScalarFieldEnumSchema,
          Inspection_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateFindManyArgsSchema: z.ZodType<Prisma.inspection_templateFindManyArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_templateOrderByWithRelationInputSchema.array(),
          inspection_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_templateScalarFieldEnumSchema,
          Inspection_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_templateAggregateArgsSchema: z.ZodType<Prisma.inspection_templateAggregateArgs> =
  z
    .object({
      where: inspection_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_templateOrderByWithRelationInputSchema.array(),
          inspection_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspection_templateGroupByArgsSchema: z.ZodType<Prisma.inspection_templateGroupByArgs> =
  z
    .object({
      where: inspection_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_templateOrderByWithAggregationInputSchema.array(),
          inspection_templateOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Inspection_templateScalarFieldEnumSchema.array(),
      having:
        inspection_templateScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspection_templateFindUniqueArgsSchema: z.ZodType<Prisma.inspection_templateFindUniqueArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereUniqueInputSchema,
    })
    .strict();

export const inspection_templateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.inspection_templateFindUniqueOrThrowArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereUniqueInputSchema,
    })
    .strict();

export const inspection_template_snapshotFindFirstArgsSchema: z.ZodType<Prisma.inspection_template_snapshotFindFirstArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_template_snapshotOrderByWithRelationInputSchema.array(),
          inspection_template_snapshotOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_template_snapshotWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_template_snapshotScalarFieldEnumSchema,
          Inspection_template_snapshotScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.inspection_template_snapshotFindFirstOrThrowArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_template_snapshotOrderByWithRelationInputSchema.array(),
          inspection_template_snapshotOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_template_snapshotWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_template_snapshotScalarFieldEnumSchema,
          Inspection_template_snapshotScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotFindManyArgsSchema: z.ZodType<Prisma.inspection_template_snapshotFindManyArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_template_snapshotOrderByWithRelationInputSchema.array(),
          inspection_template_snapshotOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_template_snapshotWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Inspection_template_snapshotScalarFieldEnumSchema,
          Inspection_template_snapshotScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspection_template_snapshotAggregateArgsSchema: z.ZodType<Prisma.inspection_template_snapshotAggregateArgs> =
  z
    .object({
      where: inspection_template_snapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_template_snapshotOrderByWithRelationInputSchema.array(),
          inspection_template_snapshotOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspection_template_snapshotWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspection_template_snapshotGroupByArgsSchema: z.ZodType<Prisma.inspection_template_snapshotGroupByArgs> =
  z
    .object({
      where: inspection_template_snapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspection_template_snapshotOrderByWithAggregationInputSchema.array(),
          inspection_template_snapshotOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Inspection_template_snapshotScalarFieldEnumSchema.array(),
      having:
        inspection_template_snapshotScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspection_template_snapshotFindUniqueArgsSchema: z.ZodType<Prisma.inspection_template_snapshotFindUniqueArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereUniqueInputSchema,
    })
    .strict();

export const inspection_template_snapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.inspection_template_snapshotFindUniqueOrThrowArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereUniqueInputSchema,
    })
    .strict();

export const step_templateFindFirstArgsSchema: z.ZodType<Prisma.step_templateFindFirstArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          step_templateOrderByWithRelationInputSchema.array(),
          step_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: step_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Step_templateScalarFieldEnumSchema,
          Step_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.step_templateFindFirstOrThrowArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          step_templateOrderByWithRelationInputSchema.array(),
          step_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: step_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Step_templateScalarFieldEnumSchema,
          Step_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateFindManyArgsSchema: z.ZodType<Prisma.step_templateFindManyArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          step_templateOrderByWithRelationInputSchema.array(),
          step_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: step_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          Step_templateScalarFieldEnumSchema,
          Step_templateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const step_templateAggregateArgsSchema: z.ZodType<Prisma.step_templateAggregateArgs> =
  z
    .object({
      where: step_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          step_templateOrderByWithRelationInputSchema.array(),
          step_templateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: step_templateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const step_templateGroupByArgsSchema: z.ZodType<Prisma.step_templateGroupByArgs> =
  z
    .object({
      where: step_templateWhereInputSchema.optional(),
      orderBy: z
        .union([
          step_templateOrderByWithAggregationInputSchema.array(),
          step_templateOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Step_templateScalarFieldEnumSchema.array(),
      having: step_templateScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const step_templateFindUniqueArgsSchema: z.ZodType<Prisma.step_templateFindUniqueArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereUniqueInputSchema,
    })
    .strict();

export const step_templateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.step_templateFindUniqueOrThrowArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereUniqueInputSchema,
    })
    .strict();

export const inspectionFindFirstArgsSchema: z.ZodType<Prisma.inspectionFindFirstArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspectionOrderByWithRelationInputSchema.array(),
          inspectionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspectionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          InspectionScalarFieldEnumSchema,
          InspectionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.inspectionFindFirstOrThrowArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspectionOrderByWithRelationInputSchema.array(),
          inspectionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspectionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          InspectionScalarFieldEnumSchema,
          InspectionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionFindManyArgsSchema: z.ZodType<Prisma.inspectionFindManyArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspectionOrderByWithRelationInputSchema.array(),
          inspectionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspectionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          InspectionScalarFieldEnumSchema,
          InspectionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const inspectionAggregateArgsSchema: z.ZodType<Prisma.inspectionAggregateArgs> =
  z
    .object({
      where: inspectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspectionOrderByWithRelationInputSchema.array(),
          inspectionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: inspectionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspectionGroupByArgsSchema: z.ZodType<Prisma.inspectionGroupByArgs> =
  z
    .object({
      where: inspectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          inspectionOrderByWithAggregationInputSchema.array(),
          inspectionOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: InspectionScalarFieldEnumSchema.array(),
      having: inspectionScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const inspectionFindUniqueArgsSchema: z.ZodType<Prisma.inspectionFindUniqueArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereUniqueInputSchema,
    })
    .strict();

export const inspectionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.inspectionFindUniqueOrThrowArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereUniqueInputSchema,
    })
    .strict();

export const stepFindFirstArgsSchema: z.ZodType<Prisma.stepFindFirstArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    where: stepWhereInputSchema.optional(),
    orderBy: z
      .union([
        stepOrderByWithRelationInputSchema.array(),
        stepOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: stepWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([StepScalarFieldEnumSchema, StepScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const stepFindFirstOrThrowArgsSchema: z.ZodType<Prisma.stepFindFirstOrThrowArgs> =
  z
    .object({
      select: stepSelectSchema.optional(),
      include: stepIncludeSchema.optional(),
      where: stepWhereInputSchema.optional(),
      orderBy: z
        .union([
          stepOrderByWithRelationInputSchema.array(),
          stepOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: stepWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([StepScalarFieldEnumSchema, StepScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const stepFindManyArgsSchema: z.ZodType<Prisma.stepFindManyArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    where: stepWhereInputSchema.optional(),
    orderBy: z
      .union([
        stepOrderByWithRelationInputSchema.array(),
        stepOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: stepWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([StepScalarFieldEnumSchema, StepScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const stepAggregateArgsSchema: z.ZodType<Prisma.stepAggregateArgs> = z
  .object({
    where: stepWhereInputSchema.optional(),
    orderBy: z
      .union([
        stepOrderByWithRelationInputSchema.array(),
        stepOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: stepWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const stepGroupByArgsSchema: z.ZodType<Prisma.stepGroupByArgs> = z
  .object({
    where: stepWhereInputSchema.optional(),
    orderBy: z
      .union([
        stepOrderByWithAggregationInputSchema.array(),
        stepOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: StepScalarFieldEnumSchema.array(),
    having: stepScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const stepFindUniqueArgsSchema: z.ZodType<Prisma.stepFindUniqueArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    where: stepWhereUniqueInputSchema,
  })
  .strict();

export const stepFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.stepFindUniqueOrThrowArgs> =
  z
    .object({
      select: stepSelectSchema.optional(),
      include: stepIncludeSchema.optional(),
      where: stepWhereUniqueInputSchema,
    })
    .strict();

export const userCreateArgsSchema: z.ZodType<Prisma.userCreateArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    data: z.union([userCreateInputSchema, userUncheckedCreateInputSchema]),
  })
  .strict();

export const userUpsertArgsSchema: z.ZodType<Prisma.userUpsertArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    where: userWhereUniqueInputSchema,
    create: z.union([userCreateInputSchema, userUncheckedCreateInputSchema]),
    update: z.union([userUpdateInputSchema, userUncheckedUpdateInputSchema]),
  })
  .strict();

export const userCreateManyArgsSchema: z.ZodType<Prisma.userCreateManyArgs> = z
  .object({
    data: z.union([
      userCreateManyInputSchema,
      userCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const userDeleteArgsSchema: z.ZodType<Prisma.userDeleteArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    where: userWhereUniqueInputSchema,
  })
  .strict();

export const userUpdateArgsSchema: z.ZodType<Prisma.userUpdateArgs> = z
  .object({
    select: userSelectSchema.optional(),
    include: userIncludeSchema.optional(),
    data: z.union([userUpdateInputSchema, userUncheckedUpdateInputSchema]),
    where: userWhereUniqueInputSchema,
  })
  .strict();

export const userUpdateManyArgsSchema: z.ZodType<Prisma.userUpdateManyArgs> = z
  .object({
    data: z.union([
      userUpdateManyMutationInputSchema,
      userUncheckedUpdateManyInputSchema,
    ]),
    where: userWhereInputSchema.optional(),
  })
  .strict();

export const userDeleteManyArgsSchema: z.ZodType<Prisma.userDeleteManyArgs> = z
  .object({
    where: userWhereInputSchema.optional(),
  })
  .strict();

export const teamCreateArgsSchema: z.ZodType<Prisma.teamCreateArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    data: z.union([teamCreateInputSchema, teamUncheckedCreateInputSchema]),
  })
  .strict();

export const teamUpsertArgsSchema: z.ZodType<Prisma.teamUpsertArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    where: teamWhereUniqueInputSchema,
    create: z.union([teamCreateInputSchema, teamUncheckedCreateInputSchema]),
    update: z.union([teamUpdateInputSchema, teamUncheckedUpdateInputSchema]),
  })
  .strict();

export const teamCreateManyArgsSchema: z.ZodType<Prisma.teamCreateManyArgs> = z
  .object({
    data: z.union([
      teamCreateManyInputSchema,
      teamCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const teamDeleteArgsSchema: z.ZodType<Prisma.teamDeleteArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    where: teamWhereUniqueInputSchema,
  })
  .strict();

export const teamUpdateArgsSchema: z.ZodType<Prisma.teamUpdateArgs> = z
  .object({
    select: teamSelectSchema.optional(),
    include: teamIncludeSchema.optional(),
    data: z.union([teamUpdateInputSchema, teamUncheckedUpdateInputSchema]),
    where: teamWhereUniqueInputSchema,
  })
  .strict();

export const teamUpdateManyArgsSchema: z.ZodType<Prisma.teamUpdateManyArgs> = z
  .object({
    data: z.union([
      teamUpdateManyMutationInputSchema,
      teamUncheckedUpdateManyInputSchema,
    ]),
    where: teamWhereInputSchema.optional(),
  })
  .strict();

export const teamDeleteManyArgsSchema: z.ZodType<Prisma.teamDeleteManyArgs> = z
  .object({
    where: teamWhereInputSchema.optional(),
  })
  .strict();

export const workspaceCreateArgsSchema: z.ZodType<Prisma.workspaceCreateArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      data: z.union([
        workspaceCreateInputSchema,
        workspaceUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const workspaceUpsertArgsSchema: z.ZodType<Prisma.workspaceUpsertArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereUniqueInputSchema,
      create: z.union([
        workspaceCreateInputSchema,
        workspaceUncheckedCreateInputSchema,
      ]),
      update: z.union([
        workspaceUpdateInputSchema,
        workspaceUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const workspaceCreateManyArgsSchema: z.ZodType<Prisma.workspaceCreateManyArgs> =
  z
    .object({
      data: z.union([
        workspaceCreateManyInputSchema,
        workspaceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const workspaceDeleteArgsSchema: z.ZodType<Prisma.workspaceDeleteArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      where: workspaceWhereUniqueInputSchema,
    })
    .strict();

export const workspaceUpdateArgsSchema: z.ZodType<Prisma.workspaceUpdateArgs> =
  z
    .object({
      select: workspaceSelectSchema.optional(),
      include: workspaceIncludeSchema.optional(),
      data: z.union([
        workspaceUpdateInputSchema,
        workspaceUncheckedUpdateInputSchema,
      ]),
      where: workspaceWhereUniqueInputSchema,
    })
    .strict();

export const workspaceUpdateManyArgsSchema: z.ZodType<Prisma.workspaceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        workspaceUpdateManyMutationInputSchema,
        workspaceUncheckedUpdateManyInputSchema,
      ]),
      where: workspaceWhereInputSchema.optional(),
    })
    .strict();

export const workspaceDeleteManyArgsSchema: z.ZodType<Prisma.workspaceDeleteManyArgs> =
  z
    .object({
      where: workspaceWhereInputSchema.optional(),
    })
    .strict();

export const user_teamCreateArgsSchema: z.ZodType<Prisma.user_teamCreateArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      data: z.union([
        user_teamCreateInputSchema,
        user_teamUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const user_teamUpsertArgsSchema: z.ZodType<Prisma.user_teamUpsertArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereUniqueInputSchema,
      create: z.union([
        user_teamCreateInputSchema,
        user_teamUncheckedCreateInputSchema,
      ]),
      update: z.union([
        user_teamUpdateInputSchema,
        user_teamUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const user_teamCreateManyArgsSchema: z.ZodType<Prisma.user_teamCreateManyArgs> =
  z
    .object({
      data: z.union([
        user_teamCreateManyInputSchema,
        user_teamCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_teamDeleteArgsSchema: z.ZodType<Prisma.user_teamDeleteArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      where: user_teamWhereUniqueInputSchema,
    })
    .strict();

export const user_teamUpdateArgsSchema: z.ZodType<Prisma.user_teamUpdateArgs> =
  z
    .object({
      select: user_teamSelectSchema.optional(),
      include: user_teamIncludeSchema.optional(),
      data: z.union([
        user_teamUpdateInputSchema,
        user_teamUncheckedUpdateInputSchema,
      ]),
      where: user_teamWhereUniqueInputSchema,
    })
    .strict();

export const user_teamUpdateManyArgsSchema: z.ZodType<Prisma.user_teamUpdateManyArgs> =
  z
    .object({
      data: z.union([
        user_teamUpdateManyMutationInputSchema,
        user_teamUncheckedUpdateManyInputSchema,
      ]),
      where: user_teamWhereInputSchema.optional(),
    })
    .strict();

export const user_teamDeleteManyArgsSchema: z.ZodType<Prisma.user_teamDeleteManyArgs> =
  z
    .object({
      where: user_teamWhereInputSchema.optional(),
    })
    .strict();

export const user_workspaceCreateArgsSchema: z.ZodType<Prisma.user_workspaceCreateArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      data: z.union([
        user_workspaceCreateInputSchema,
        user_workspaceUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const user_workspaceUpsertArgsSchema: z.ZodType<Prisma.user_workspaceUpsertArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereUniqueInputSchema,
      create: z.union([
        user_workspaceCreateInputSchema,
        user_workspaceUncheckedCreateInputSchema,
      ]),
      update: z.union([
        user_workspaceUpdateInputSchema,
        user_workspaceUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const user_workspaceCreateManyArgsSchema: z.ZodType<Prisma.user_workspaceCreateManyArgs> =
  z
    .object({
      data: z.union([
        user_workspaceCreateManyInputSchema,
        user_workspaceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const user_workspaceDeleteArgsSchema: z.ZodType<Prisma.user_workspaceDeleteArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      where: user_workspaceWhereUniqueInputSchema,
    })
    .strict();

export const user_workspaceUpdateArgsSchema: z.ZodType<Prisma.user_workspaceUpdateArgs> =
  z
    .object({
      select: user_workspaceSelectSchema.optional(),
      include: user_workspaceIncludeSchema.optional(),
      data: z.union([
        user_workspaceUpdateInputSchema,
        user_workspaceUncheckedUpdateInputSchema,
      ]),
      where: user_workspaceWhereUniqueInputSchema,
    })
    .strict();

export const user_workspaceUpdateManyArgsSchema: z.ZodType<Prisma.user_workspaceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        user_workspaceUpdateManyMutationInputSchema,
        user_workspaceUncheckedUpdateManyInputSchema,
      ]),
      where: user_workspaceWhereInputSchema.optional(),
    })
    .strict();

export const user_workspaceDeleteManyArgsSchema: z.ZodType<Prisma.user_workspaceDeleteManyArgs> =
  z
    .object({
      where: user_workspaceWhereInputSchema.optional(),
    })
    .strict();

export const roleCreateArgsSchema: z.ZodType<Prisma.roleCreateArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    data: z.union([roleCreateInputSchema, roleUncheckedCreateInputSchema]),
  })
  .strict();

export const roleUpsertArgsSchema: z.ZodType<Prisma.roleUpsertArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    where: roleWhereUniqueInputSchema,
    create: z.union([roleCreateInputSchema, roleUncheckedCreateInputSchema]),
    update: z.union([roleUpdateInputSchema, roleUncheckedUpdateInputSchema]),
  })
  .strict();

export const roleCreateManyArgsSchema: z.ZodType<Prisma.roleCreateManyArgs> = z
  .object({
    data: z.union([
      roleCreateManyInputSchema,
      roleCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const roleDeleteArgsSchema: z.ZodType<Prisma.roleDeleteArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    where: roleWhereUniqueInputSchema,
  })
  .strict();

export const roleUpdateArgsSchema: z.ZodType<Prisma.roleUpdateArgs> = z
  .object({
    select: roleSelectSchema.optional(),
    include: roleIncludeSchema.optional(),
    data: z.union([roleUpdateInputSchema, roleUncheckedUpdateInputSchema]),
    where: roleWhereUniqueInputSchema,
  })
  .strict();

export const roleUpdateManyArgsSchema: z.ZodType<Prisma.roleUpdateManyArgs> = z
  .object({
    data: z.union([
      roleUpdateManyMutationInputSchema,
      roleUncheckedUpdateManyInputSchema,
    ]),
    where: roleWhereInputSchema.optional(),
  })
  .strict();

export const roleDeleteManyArgsSchema: z.ZodType<Prisma.roleDeleteManyArgs> = z
  .object({
    where: roleWhereInputSchema.optional(),
  })
  .strict();

export const inspection_templateCreateArgsSchema: z.ZodType<Prisma.inspection_templateCreateArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      data: z.union([
        inspection_templateCreateInputSchema,
        inspection_templateUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const inspection_templateUpsertArgsSchema: z.ZodType<Prisma.inspection_templateUpsertArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereUniqueInputSchema,
      create: z.union([
        inspection_templateCreateInputSchema,
        inspection_templateUncheckedCreateInputSchema,
      ]),
      update: z.union([
        inspection_templateUpdateInputSchema,
        inspection_templateUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const inspection_templateCreateManyArgsSchema: z.ZodType<Prisma.inspection_templateCreateManyArgs> =
  z
    .object({
      data: z.union([
        inspection_templateCreateManyInputSchema,
        inspection_templateCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_templateDeleteArgsSchema: z.ZodType<Prisma.inspection_templateDeleteArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      where: inspection_templateWhereUniqueInputSchema,
    })
    .strict();

export const inspection_templateUpdateArgsSchema: z.ZodType<Prisma.inspection_templateUpdateArgs> =
  z
    .object({
      select: inspection_templateSelectSchema.optional(),
      include: inspection_templateIncludeSchema.optional(),
      data: z.union([
        inspection_templateUpdateInputSchema,
        inspection_templateUncheckedUpdateInputSchema,
      ]),
      where: inspection_templateWhereUniqueInputSchema,
    })
    .strict();

export const inspection_templateUpdateManyArgsSchema: z.ZodType<Prisma.inspection_templateUpdateManyArgs> =
  z
    .object({
      data: z.union([
        inspection_templateUpdateManyMutationInputSchema,
        inspection_templateUncheckedUpdateManyInputSchema,
      ]),
      where: inspection_templateWhereInputSchema.optional(),
    })
    .strict();

export const inspection_templateDeleteManyArgsSchema: z.ZodType<Prisma.inspection_templateDeleteManyArgs> =
  z
    .object({
      where: inspection_templateWhereInputSchema.optional(),
    })
    .strict();

export const inspection_template_snapshotCreateArgsSchema: z.ZodType<Prisma.inspection_template_snapshotCreateArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      data: z.union([
        inspection_template_snapshotCreateInputSchema,
        inspection_template_snapshotUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const inspection_template_snapshotUpsertArgsSchema: z.ZodType<Prisma.inspection_template_snapshotUpsertArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereUniqueInputSchema,
      create: z.union([
        inspection_template_snapshotCreateInputSchema,
        inspection_template_snapshotUncheckedCreateInputSchema,
      ]),
      update: z.union([
        inspection_template_snapshotUpdateInputSchema,
        inspection_template_snapshotUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const inspection_template_snapshotCreateManyArgsSchema: z.ZodType<Prisma.inspection_template_snapshotCreateManyArgs> =
  z
    .object({
      data: z.union([
        inspection_template_snapshotCreateManyInputSchema,
        inspection_template_snapshotCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspection_template_snapshotDeleteArgsSchema: z.ZodType<Prisma.inspection_template_snapshotDeleteArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      where: inspection_template_snapshotWhereUniqueInputSchema,
    })
    .strict();

export const inspection_template_snapshotUpdateArgsSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateArgs> =
  z
    .object({
      select: inspection_template_snapshotSelectSchema.optional(),
      include: inspection_template_snapshotIncludeSchema.optional(),
      data: z.union([
        inspection_template_snapshotUpdateInputSchema,
        inspection_template_snapshotUncheckedUpdateInputSchema,
      ]),
      where: inspection_template_snapshotWhereUniqueInputSchema,
    })
    .strict();

export const inspection_template_snapshotUpdateManyArgsSchema: z.ZodType<Prisma.inspection_template_snapshotUpdateManyArgs> =
  z
    .object({
      data: z.union([
        inspection_template_snapshotUpdateManyMutationInputSchema,
        inspection_template_snapshotUncheckedUpdateManyInputSchema,
      ]),
      where: inspection_template_snapshotWhereInputSchema.optional(),
    })
    .strict();

export const inspection_template_snapshotDeleteManyArgsSchema: z.ZodType<Prisma.inspection_template_snapshotDeleteManyArgs> =
  z
    .object({
      where: inspection_template_snapshotWhereInputSchema.optional(),
    })
    .strict();

export const step_templateCreateArgsSchema: z.ZodType<Prisma.step_templateCreateArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      data: z.union([
        step_templateCreateInputSchema,
        step_templateUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const step_templateUpsertArgsSchema: z.ZodType<Prisma.step_templateUpsertArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereUniqueInputSchema,
      create: z.union([
        step_templateCreateInputSchema,
        step_templateUncheckedCreateInputSchema,
      ]),
      update: z.union([
        step_templateUpdateInputSchema,
        step_templateUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const step_templateCreateManyArgsSchema: z.ZodType<Prisma.step_templateCreateManyArgs> =
  z
    .object({
      data: z.union([
        step_templateCreateManyInputSchema,
        step_templateCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const step_templateDeleteArgsSchema: z.ZodType<Prisma.step_templateDeleteArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      where: step_templateWhereUniqueInputSchema,
    })
    .strict();

export const step_templateUpdateArgsSchema: z.ZodType<Prisma.step_templateUpdateArgs> =
  z
    .object({
      select: step_templateSelectSchema.optional(),
      include: step_templateIncludeSchema.optional(),
      data: z.union([
        step_templateUpdateInputSchema,
        step_templateUncheckedUpdateInputSchema,
      ]),
      where: step_templateWhereUniqueInputSchema,
    })
    .strict();

export const step_templateUpdateManyArgsSchema: z.ZodType<Prisma.step_templateUpdateManyArgs> =
  z
    .object({
      data: z.union([
        step_templateUpdateManyMutationInputSchema,
        step_templateUncheckedUpdateManyInputSchema,
      ]),
      where: step_templateWhereInputSchema.optional(),
    })
    .strict();

export const step_templateDeleteManyArgsSchema: z.ZodType<Prisma.step_templateDeleteManyArgs> =
  z
    .object({
      where: step_templateWhereInputSchema.optional(),
    })
    .strict();

export const inspectionCreateArgsSchema: z.ZodType<Prisma.inspectionCreateArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      data: z.union([
        inspectionCreateInputSchema,
        inspectionUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const inspectionUpsertArgsSchema: z.ZodType<Prisma.inspectionUpsertArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereUniqueInputSchema,
      create: z.union([
        inspectionCreateInputSchema,
        inspectionUncheckedCreateInputSchema,
      ]),
      update: z.union([
        inspectionUpdateInputSchema,
        inspectionUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const inspectionCreateManyArgsSchema: z.ZodType<Prisma.inspectionCreateManyArgs> =
  z
    .object({
      data: z.union([
        inspectionCreateManyInputSchema,
        inspectionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const inspectionDeleteArgsSchema: z.ZodType<Prisma.inspectionDeleteArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      where: inspectionWhereUniqueInputSchema,
    })
    .strict();

export const inspectionUpdateArgsSchema: z.ZodType<Prisma.inspectionUpdateArgs> =
  z
    .object({
      select: inspectionSelectSchema.optional(),
      include: inspectionIncludeSchema.optional(),
      data: z.union([
        inspectionUpdateInputSchema,
        inspectionUncheckedUpdateInputSchema,
      ]),
      where: inspectionWhereUniqueInputSchema,
    })
    .strict();

export const inspectionUpdateManyArgsSchema: z.ZodType<Prisma.inspectionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        inspectionUpdateManyMutationInputSchema,
        inspectionUncheckedUpdateManyInputSchema,
      ]),
      where: inspectionWhereInputSchema.optional(),
    })
    .strict();

export const inspectionDeleteManyArgsSchema: z.ZodType<Prisma.inspectionDeleteManyArgs> =
  z
    .object({
      where: inspectionWhereInputSchema.optional(),
    })
    .strict();

export const stepCreateArgsSchema: z.ZodType<Prisma.stepCreateArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    data: z.union([stepCreateInputSchema, stepUncheckedCreateInputSchema]),
  })
  .strict();

export const stepUpsertArgsSchema: z.ZodType<Prisma.stepUpsertArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    where: stepWhereUniqueInputSchema,
    create: z.union([stepCreateInputSchema, stepUncheckedCreateInputSchema]),
    update: z.union([stepUpdateInputSchema, stepUncheckedUpdateInputSchema]),
  })
  .strict();

export const stepCreateManyArgsSchema: z.ZodType<Prisma.stepCreateManyArgs> = z
  .object({
    data: z.union([
      stepCreateManyInputSchema,
      stepCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const stepDeleteArgsSchema: z.ZodType<Prisma.stepDeleteArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    where: stepWhereUniqueInputSchema,
  })
  .strict();

export const stepUpdateArgsSchema: z.ZodType<Prisma.stepUpdateArgs> = z
  .object({
    select: stepSelectSchema.optional(),
    include: stepIncludeSchema.optional(),
    data: z.union([stepUpdateInputSchema, stepUncheckedUpdateInputSchema]),
    where: stepWhereUniqueInputSchema,
  })
  .strict();

export const stepUpdateManyArgsSchema: z.ZodType<Prisma.stepUpdateManyArgs> = z
  .object({
    data: z.union([
      stepUpdateManyMutationInputSchema,
      stepUncheckedUpdateManyInputSchema,
    ]),
    where: stepWhereInputSchema.optional(),
  })
  .strict();

export const stepDeleteManyArgsSchema: z.ZodType<Prisma.stepDeleteManyArgs> = z
  .object({
    where: stepWhereInputSchema.optional(),
  })
  .strict();

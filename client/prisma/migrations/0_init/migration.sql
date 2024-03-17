-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'SUPERVISOR', 'TECHNICIAN', 'ENGINEER', 'QUALITY_INSPECTOR', 'OPERATOR', 'OTHER');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('FULL_ACCESS', 'CAN_EDIT', 'CAN_COMMENT', 'CAN_VIEW', 'NO_ACCESS');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "inspectionType" AS ENUM ('INSPECTION', 'MAINTENANCE', 'OTHER');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "image_uri" TEXT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "external_id" UUID,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_uri" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" UUID NOT NULL,
    "identity" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url_key" TEXT NOT NULL,
    "created_by" UUID NOT NULL,
    "image_uri" TEXT,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_team" (
    "user_id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "role_id" UUID,

    CONSTRAINT "user_team_pkey" PRIMARY KEY ("user_id","team_id")
);

-- CreateTable
CREATE TABLE "user_workspace" (
    "user_id" UUID NOT NULL,
    "workspace_id" UUID NOT NULL,
    "role_id" UUID,

    CONSTRAINT "user_workspace_pkey" PRIMARY KEY ("user_id","workspace_id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" "Role" NOT NULL,
    "description" TEXT NOT NULL,
    "permissions" "Permission"[] DEFAULT ARRAY[]::"Permission"[],

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_template" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team_id" UUID NOT NULL,

    CONSTRAINT "inspection_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_template_snapshot" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "version" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inspection_template_id" UUID NOT NULL,

    CONSTRAINT "inspection_template_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_step_template" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_step_id" UUID,
    "created_by_id" UUID,
    "order" INTEGER,
    "inspection_template_id" UUID NOT NULL,
    "inspection_template_snapshotId" UUID,

    CONSTRAINT "inspection_step_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team_id" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "inspection_snapshot_id" UUID,

    CONSTRAINT "inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_step" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "work_order_id" UUID NOT NULL,
    "step_id" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspection_step_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_external_id_key" ON "user"("external_id");

-- CreateIndex
CREATE INDEX "team_workspace_id_idx" ON "team"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_identity_workspace_id_key" ON "team"("identity", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_name_workspace_id_key" ON "team"("name", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_url_key_key" ON "workspace"("url_key");

-- CreateIndex
CREATE INDEX "workspace_url_key_idx" ON "workspace"("url_key");

-- CreateIndex
CREATE INDEX "user_team_team_id_idx" ON "user_team"("team_id");

-- CreateIndex
CREATE INDEX "user_team_role_id_idx" ON "user_team"("role_id");

-- CreateIndex
CREATE INDEX "user_team_user_id_idx" ON "user_team"("user_id");

-- CreateIndex
CREATE INDEX "user_workspace_user_id_idx" ON "user_workspace"("user_id");

-- CreateIndex
CREATE INDEX "user_workspace_workspace_id_idx" ON "user_workspace"("workspace_id");

-- CreateIndex
CREATE INDEX "user_workspace_role_id_idx" ON "user_workspace"("role_id");

-- CreateIndex
CREATE INDEX "inspection_template_team_id_idx" ON "inspection_template"("team_id");

-- CreateIndex
CREATE INDEX "inspection_step_template_parent_step_id_idx" ON "inspection_step_template"("parent_step_id");

-- CreateIndex
CREATE INDEX "inspection_step_template_created_by_id_idx" ON "inspection_step_template"("created_by_id");

-- CreateIndex
CREATE INDEX "inspection_step_template_inspection_template_id_idx" ON "inspection_step_template"("inspection_template_id");

-- CreateIndex
CREATE INDEX "inspection_step_template_inspection_template_snapshotId_idx" ON "inspection_step_template"("inspection_template_snapshotId");

-- CreateIndex
CREATE INDEX "inspection_team_id_idx" ON "inspection"("team_id");

-- CreateIndex
CREATE INDEX "inspection_step_work_order_id_idx" ON "inspection_step"("work_order_id");

-- CreateIndex
CREATE INDEX "inspection_step_step_id_idx" ON "inspection_step"("step_id");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_template" ADD CONSTRAINT "inspection_template_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_template_snapshot" ADD CONSTRAINT "inspection_template_snapshot_inspection_template_id_fkey" FOREIGN KEY ("inspection_template_id") REFERENCES "inspection_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step_template" ADD CONSTRAINT "inspection_step_template_inspection_template_id_fkey" FOREIGN KEY ("inspection_template_id") REFERENCES "inspection_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step_template" ADD CONSTRAINT "inspection_step_template_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step_template" ADD CONSTRAINT "inspection_step_template_parent_step_id_fkey" FOREIGN KEY ("parent_step_id") REFERENCES "inspection_step_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step_template" ADD CONSTRAINT "inspection_step_template_inspection_template_snapshotId_fkey" FOREIGN KEY ("inspection_template_snapshotId") REFERENCES "inspection_template_snapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection" ADD CONSTRAINT "inspection_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection" ADD CONSTRAINT "inspection_inspection_snapshot_id_fkey" FOREIGN KEY ("inspection_snapshot_id") REFERENCES "inspection_template_snapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step" ADD CONSTRAINT "inspection_step_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "inspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_step" ADD CONSTRAINT "inspection_step_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "inspection_step_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;


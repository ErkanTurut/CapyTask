-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('BUILDING', 'FLOOR', 'ROOM', 'AREA', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'SUPERVISOR', 'TECHNICIAN', 'ENGINEER', 'QUALITY_INSPECTOR', 'OPERATOR', 'OTHER');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('FULL_ACCESS', 'CAN_EDIT', 'CAN_COMMENT', 'CAN_VIEW', 'NO_ACCESS');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "WorkOrderType" AS ENUM ('INSPECTION', 'MAINTENANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkOrderSource" AS ENUM ('MAINTENANCE_PLAN', 'AI_CHAT', 'AI_VOICE_ASSISTANT', 'MANUAL_ENTRY', 'OTHER');

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "geography" geography NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset" (
    "id" TEXT NOT NULL DEFAULT nanoid(17),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" TEXT NOT NULL,
    "location_id" TEXT,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_user" (
    "company_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "company_user_pkey" PRIMARY KEY ("company_id","user_id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "location_type" "LocationType" NOT NULL DEFAULT 'BUILDING',
    "location_level" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_location_id" TEXT,
    "workspace_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" "Role" NOT NULL,
    "description" TEXT NOT NULL,
    "permissions" "Permission"[] DEFAULT ARRAY[]::"Permission"[],

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_uri" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
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
CREATE TABLE "user_team" (
    "user_id" UUID NOT NULL,
    "team_id" TEXT NOT NULL,
    "role_id" UUID,

    CONSTRAINT "user_team_pkey" PRIMARY KEY ("user_id","team_id")
);

-- CreateTable
CREATE TABLE "user_workspace" (
    "user_id" UUID NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "role_id" UUID,

    CONSTRAINT "user_workspace_pkey" PRIMARY KEY ("user_id","workspace_id")
);

-- CreateTable
CREATE TABLE "work_order" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sheduled_start" TIMESTAMP(3),
    "sheduled_end" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "priority" "Priority" NOT NULL DEFAULT 'LOW',
    "type" "WorkOrderType" NOT NULL DEFAULT 'INSPECTION',
    "location_id" TEXT,
    "requested_by_id" UUID,
    "source" "WorkOrderSource" NOT NULL,
    "team_id" TEXT NOT NULL,
    "work_plan_id" TEXT,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "work_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_step_status" (
    "id" TEXT NOT NULL DEFAULT nanoid(17),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_order_id" TEXT NOT NULL,
    "work_step_id" TEXT NOT NULL,
    "step_order" INTEGER,

    CONSTRAINT "work_step_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_asset" (
    "work_order_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,

    CONSTRAINT "work_order_asset_pkey" PRIMARY KEY ("work_order_id","asset_id")
);

-- CreateTable
CREATE TABLE "work_plan_template" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "work_plan_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_plan" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_plan_template_id" TEXT,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "work_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_step_template" (
    "id" TEXT NOT NULL DEFAULT nanoid(17),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_step_id" TEXT,
    "created_by_id" UUID,
    "step_order" INTEGER,
    "work_plan_template_id" TEXT NOT NULL,

    CONSTRAINT "work_step_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_step" (
    "id" TEXT NOT NULL DEFAULT nanoid(17),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_step_id" TEXT,
    "created_by_id" UUID,
    "step_order" INTEGER,
    "work_plan_id" TEXT NOT NULL,
    "work_step_template_id" TEXT,

    CONSTRAINT "work_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL DEFAULT nanoid(10),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url_key" TEXT NOT NULL,
    "image_uri" TEXT,
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" UUID NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_public_id_key" ON "address"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "asset_public_id_key" ON "asset"("public_id");

-- CreateIndex
CREATE INDEX "asset_workspace_id_idx" ON "asset"("workspace_id");

-- CreateIndex
CREATE INDEX "asset_location_id_idx" ON "asset"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_public_id_key" ON "company"("public_id");

-- CreateIndex
CREATE INDEX "company_workspace_id_idx" ON "company"("workspace_id");

-- CreateIndex
CREATE INDEX "company_user_company_id_idx" ON "company_user"("company_id");

-- CreateIndex
CREATE INDEX "company_user_user_id_idx" ON "company_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_public_id_key" ON "location"("public_id");

-- CreateIndex
CREATE INDEX "location_parent_location_id_idx" ON "location"("parent_location_id");

-- CreateIndex
CREATE INDEX "location_workspace_id_idx" ON "location"("workspace_id");

-- CreateIndex
CREATE INDEX "location_address_id_idx" ON "location"("address_id");

-- CreateIndex
CREATE INDEX "location_company_id_idx" ON "location"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_public_id_key" ON "team"("public_id");

-- CreateIndex
CREATE INDEX "team_workspace_id_idx" ON "team"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_identity_workspace_id_key" ON "team"("identity", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_name_workspace_id_key" ON "team"("name", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_external_id_key" ON "user"("external_id");

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
CREATE UNIQUE INDEX "work_order_public_id_key" ON "work_order"("public_id");

-- CreateIndex
CREATE INDEX "work_order_team_id_idx" ON "work_order"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_step_status_public_id_key" ON "work_step_status"("public_id");

-- CreateIndex
CREATE INDEX "work_step_status_work_order_id_idx" ON "work_step_status"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_asset_asset_id_idx" ON "work_order_asset"("asset_id");

-- CreateIndex
CREATE INDEX "work_order_asset_work_order_id_idx" ON "work_order_asset"("work_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_plan_template_public_id_key" ON "work_plan_template"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_plan_public_id_key" ON "work_plan"("public_id");

-- CreateIndex
CREATE INDEX "work_plan_work_plan_template_id_idx" ON "work_plan"("work_plan_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_plan_work_plan_template_id_created_at_key" ON "work_plan"("work_plan_template_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "work_step_template_public_id_key" ON "work_step_template"("public_id");

-- CreateIndex
CREATE INDEX "work_step_template_parent_step_id_idx" ON "work_step_template"("parent_step_id");

-- CreateIndex
CREATE INDEX "work_step_template_created_by_id_idx" ON "work_step_template"("created_by_id");

-- CreateIndex
CREATE INDEX "work_step_template_work_plan_template_id_idx" ON "work_step_template"("work_plan_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_step_public_id_key" ON "work_step"("public_id");

-- CreateIndex
CREATE INDEX "work_step_parent_step_id_idx" ON "work_step"("parent_step_id");

-- CreateIndex
CREATE INDEX "work_step_created_by_id_idx" ON "work_step"("created_by_id");

-- CreateIndex
CREATE INDEX "work_step_work_plan_id_idx" ON "work_step"("work_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_url_key_key" ON "workspace"("url_key");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_public_id_key" ON "workspace"("public_id");

-- CreateIndex
CREATE INDEX "workspace_url_key_idx" ON "workspace"("url_key");

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_parent_location_id_fkey" FOREIGN KEY ("parent_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workspace" ADD CONSTRAINT "user_workspace_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_work_plan_id_fkey" FOREIGN KEY ("work_plan_id") REFERENCES "work_plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step_status" ADD CONSTRAINT "work_step_status_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step_status" ADD CONSTRAINT "work_step_status_work_step_id_fkey" FOREIGN KEY ("work_step_id") REFERENCES "work_step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_asset" ADD CONSTRAINT "work_order_asset_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_asset" ADD CONSTRAINT "work_order_asset_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_plan_template" ADD CONSTRAINT "work_plan_template_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_plan" ADD CONSTRAINT "work_plan_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_plan" ADD CONSTRAINT "work_plan_work_plan_template_id_fkey" FOREIGN KEY ("work_plan_template_id") REFERENCES "work_plan_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step_template" ADD CONSTRAINT "work_step_template_parent_step_id_fkey" FOREIGN KEY ("parent_step_id") REFERENCES "work_step_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step_template" ADD CONSTRAINT "work_step_template_work_plan_template_id_fkey" FOREIGN KEY ("work_plan_template_id") REFERENCES "work_plan_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step" ADD CONSTRAINT "work_step_work_step_template_id_fkey" FOREIGN KEY ("work_step_template_id") REFERENCES "work_step_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step" ADD CONSTRAINT "work_step_parent_step_id_fkey" FOREIGN KEY ("parent_step_id") REFERENCES "work_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_step" ADD CONSTRAINT "work_step_work_plan_id_fkey" FOREIGN KEY ("work_plan_id") REFERENCES "work_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


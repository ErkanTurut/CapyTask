import * as z from "zod";
import { Status } from "@prisma/client";
import {
  Completeteam,
  RelatedteamModel,
  Completework_plan,
  Relatedwork_planModel,
  Completework_order_asset,
  Relatedwork_order_assetModel,
  Completework_step_status,
  Relatedwork_step_statusModel,
} from "./index";

export const work_orderModel = z.object({
  /**
   * The unique identifier for the work order, generated using nanoid(10).
   */
  id: z.string(),
  /**
   * A public unique identifier for the work order, generated using gen_random_uuid() and stored as a UUID.
   */
  public_id: z.string(),
  /**
   * The name of the work order.
   */
  name: z.string(),
  /**
   * An optional description of the work order.
   */
  description: z.string().nullish(),
  /**
   * The timestamp indicating when the work order was created, with a default value of the current time (now()).
   */
  created_at: z.date(),
  /**
   * The timestamp indicating when the work order was last updated, with a default value of the current time (now()) and updated automatically.
   */
  updated_at: z.date(),
  /**
   * The current status of the work order, with a default value of OPEN.
   */
  status: z.nativeEnum(Status),
  /**
   * The identifier of the team responsible for the work order.
   */
  team_id: z.string(),
  /**
   * An optional identifier of the associated work plan.
   */
  work_plan_id: z.string().nullish(),
});

export interface Completework_order extends z.infer<typeof work_orderModel> {
  team: Completeteam;
  work_plan?: Completework_plan | null;
  work_order_asset: Completework_order_asset[];
  work_step_status: Completework_step_status[];
}

/**
 * Relatedwork_orderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_orderModel: z.ZodSchema<Completework_order> = z.lazy(
  () =>
    work_orderModel.extend({
      /**
       * The team object associated with the work order, linked via the team_id field, with cascade deletion.
       */
      team: RelatedteamModel,
      /**
       * The optional work plan object associated with the work order, linked via the work_plan_id field.
       */
      work_plan: Relatedwork_planModel.nullish(),
      /**
       * An array of work order assets associated with the work order.
       */
      work_order_asset: Relatedwork_order_assetModel.array(),
      /**
       * An array of work step statuses associated with the work order.
       */
      work_step_status: Relatedwork_step_statusModel.array(),
    }),
);

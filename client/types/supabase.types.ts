export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      role: {
        Row: {
          description: string
          id: string
          name: Database["public"]["Enums"]["Role"]
          permissions: Database["public"]["Enums"]["Permission"][] | null
        }
        Insert: {
          description: string
          id?: string
          name: Database["public"]["Enums"]["Role"]
          permissions?: Database["public"]["Enums"]["Permission"][] | null
        }
        Update: {
          description?: string
          id?: string
          name?: Database["public"]["Enums"]["Role"]
          permissions?: Database["public"]["Enums"]["Permission"][] | null
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string
          description: string | null
          id: string
          identity: string
          image_uri: string | null
          name: string
          public_id: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          identity: string
          image_uri?: string | null
          name: string
          public_id?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          identity?: string
          image_uri?: string | null
          name?: string
          public_id?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          createdAt: string
          email: string
          external_id: string | null
          first_name: string | null
          id: string
          image_uri: string | null
          last_name: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          external_id?: string | null
          first_name?: string | null
          id?: string
          image_uri?: string | null
          last_name?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          external_id?: string | null
          first_name?: string | null
          id?: string
          image_uri?: string | null
          last_name?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      user_team: {
        Row: {
          role_id: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          role_id?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          role_id?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_team_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_workspace: {
        Row: {
          role_id: string | null
          user_id: string
          workspace_id: string
        }
        Insert: {
          role_id?: string | null
          user_id: string
          workspace_id: string
        }
        Update: {
          role_id?: string | null
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_workspace_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workspace_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workspace_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      work_order: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          public_id: string
          status: Database["public"]["Enums"]["Status"]
          team_id: string
          updated_at: string
          work_plan_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          team_id: string
          updated_at?: string
          work_plan_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          team_id?: string
          updated_at?: string
          work_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_order_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_work_plan_id_fkey"
            columns: ["work_plan_id"]
            isOneToOne: false
            referencedRelation: "work_plan"
            referencedColumns: ["id"]
          },
        ]
      }
      work_plan: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          public_id: string
          team_id: string
          updated_at: string
          work_plan_template_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          public_id?: string
          team_id: string
          updated_at?: string
          work_plan_template_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          public_id?: string
          team_id?: string
          updated_at?: string
          work_plan_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_plan_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_plan_work_plan_template_id_fkey"
            columns: ["work_plan_template_id"]
            isOneToOne: false
            referencedRelation: "work_plan_template"
            referencedColumns: ["id"]
          },
        ]
      }
      work_plan_template: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          public_id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          public_id?: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          public_id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_plan_template_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      work_step: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          name: string
          parent_step_id: string | null
          public_id: string
          step_order: number | null
          updated_at: string
          work_plan_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name: string
          parent_step_id?: string | null
          public_id?: string
          step_order?: number | null
          updated_at?: string
          work_plan_id: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_step_id?: string | null
          public_id?: string
          step_order?: number | null
          updated_at?: string
          work_plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_step_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "work_step"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_work_plan_id_fkey"
            columns: ["work_plan_id"]
            isOneToOne: false
            referencedRelation: "work_plan"
            referencedColumns: ["id"]
          },
        ]
      }
      work_step_status: {
        Row: {
          created_at: string
          id: string
          public_id: string
          status: Database["public"]["Enums"]["Status"]
          step_order: number | null
          updated_at: string
          work_order_id: string
          work_step_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          step_order?: number | null
          updated_at?: string
          work_order_id: string
          work_step_id: string
        }
        Update: {
          created_at?: string
          id?: string
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          step_order?: number | null
          updated_at?: string
          work_order_id?: string
          work_step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_step_status_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_status_work_step_id_fkey"
            columns: ["work_step_id"]
            isOneToOne: false
            referencedRelation: "work_step"
            referencedColumns: ["id"]
          },
        ]
      }
      work_step_template: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          name: string
          parent_step_id: string | null
          public_id: string
          step_order: number | null
          updated_at: string
          work_plan_template_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name: string
          parent_step_id?: string | null
          public_id?: string
          step_order?: number | null
          updated_at?: string
          work_plan_template_id: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_step_id?: string | null
          public_id?: string
          step_order?: number | null
          updated_at?: string
          work_plan_template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_step_template_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "work_step_template"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_template_work_plan_template_id_fkey"
            columns: ["work_plan_template_id"]
            isOneToOne: false
            referencedRelation: "work_plan_template"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_uri: string | null
          name: string
          public_id: string
          updated_at: string
          url_key: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          image_uri?: string | null
          name: string
          public_id?: string
          updated_at?: string
          url_key: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image_uri?: string | null
          name?: string
          public_id?: string
          updated_at?: string
          url_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_work_plan: {
        Args: {
          work_plan_template_id_param: string
        }
        Returns: string
      }
      create_work_step: {
        Args: {
          work_plan_template_id_param: string
          work_plan_id: string
        }
        Returns: undefined
      }
      nanoid: {
        Args: {
          size?: number
          alphabet?: string
          additionalbytesfactor?: number
        }
        Returns: string
      }
      nanoid_optimized: {
        Args: {
          size: number
          alphabet: string
          mask: number
          step: number
        }
        Returns: string
      }
    }
    Enums: {
      inspectionType: "INSPECTION" | "MAINTENANCE" | "OTHER"
      Permission:
        | "FULL_ACCESS"
        | "CAN_EDIT"
        | "CAN_COMMENT"
        | "CAN_VIEW"
        | "NO_ACCESS"
      Priority: "LOW" | "MEDIUM" | "HIGH"
      Role:
        | "ADMIN"
        | "MANAGER"
        | "SUPERVISOR"
        | "TECHNICIAN"
        | "ENGINEER"
        | "QUALITY_INSPECTOR"
        | "OPERATOR"
        | "OTHER"
      Status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

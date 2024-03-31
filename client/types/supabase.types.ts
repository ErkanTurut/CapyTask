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
      inspection: {
        Row: {
          created_at: string
          description: string | null
          id: string
          inspection_snapshot_id: string | null
          name: string
          status: Database["public"]["Enums"]["Status"]
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          inspection_snapshot_id?: string | null
          name: string
          status?: Database["public"]["Enums"]["Status"]
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          inspection_snapshot_id?: string | null
          name?: string
          status?: Database["public"]["Enums"]["Status"]
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_inspection_snapshot_id_fkey"
            columns: ["inspection_snapshot_id"]
            isOneToOne: false
            referencedRelation: "inspection_template_snapshot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_template: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_template_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_template_snapshot: {
        Row: {
          created_at: string
          description: string | null
          id: string
          inspection_template_id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          inspection_template_id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          inspection_template_id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_template_snapshot_inspection_template_id_fkey"
            columns: ["inspection_template_id"]
            isOneToOne: false
            referencedRelation: "inspection_template"
            referencedColumns: ["id"]
          },
        ]
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
      step: {
        Row: {
          created_at: string
          id: string
          inspection_id: string
          status: Database["public"]["Enums"]["Status"]
          step_id: string
          step_template_snapshotId: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inspection_id: string
          status?: Database["public"]["Enums"]["Status"]
          step_id: string
          step_template_snapshotId?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inspection_id?: string
          status?: Database["public"]["Enums"]["Status"]
          step_id?: string
          step_template_snapshotId?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "step_template"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_step_template_snapshotId_fkey"
            columns: ["step_template_snapshotId"]
            isOneToOne: false
            referencedRelation: "step_template_snapshot"
            referencedColumns: ["id"]
          },
        ]
      }
      step_template: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          inspection_template_id: string
          name: string
          order: number | null
          parent_step_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_template_id: string
          name: string
          order?: number | null
          parent_step_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_template_id?: string
          name?: string
          order?: number | null
          parent_step_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_template_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_template_inspection_template_id_fkey"
            columns: ["inspection_template_id"]
            isOneToOne: false
            referencedRelation: "inspection_template"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_template_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "step_template"
            referencedColumns: ["id"]
          },
        ]
      }
      step_template_snapshot: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          inspection_template_snapshot_id: string
          name: string
          order: number | null
          parent_step_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_template_snapshot_id: string
          name: string
          order?: number | null
          parent_step_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_template_snapshot_id?: string
          name?: string
          order?: number | null
          parent_step_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_template_snapshot_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_template_snapshot_inspection_template_snapshot_id_fkey"
            columns: ["inspection_template_snapshot_id"]
            isOneToOne: false
            referencedRelation: "inspection_template_snapshot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_template_snapshot_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "step_template_snapshot"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          created_at: string
          description: string | null
          id: string
          identity: string
          image_uri: string | null
          name: string
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
      workspace: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_uri: string | null
          name: string
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
      create_inspection_snapshot: {
        Args: {
          input: string
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          refresh_token_expires_in: number | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Example: {
        Row: {
          description: string | null
          domainCount: number | null
          id: number
          image: string | null
          imageBlurhash: string | null
          name: string | null
          url: string | null
        }
        Insert: {
          description?: string | null
          domainCount?: number | null
          id?: number
          image?: string | null
          imageBlurhash?: string | null
          name?: string | null
          url?: string | null
        }
        Update: {
          description?: string | null
          domainCount?: number | null
          id?: number
          image?: string | null
          imageBlurhash?: string | null
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      inspection: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by_id: string | null
          id: string
          plan_id: string
          priority: Database["public"]["Enums"]["Priority"]
          status: Database["public"]["Enums"]["Status"]
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by_id?: string | null
          id?: string
          plan_id: string
          priority?: Database["public"]["Enums"]["Priority"]
          status?: Database["public"]["Enums"]["Status"]
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by_id?: string | null
          id?: string
          plan_id?: string
          priority?: Database["public"]["Enums"]["Priority"]
          status?: Database["public"]["Enums"]["Status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          }
        ]
      }
      inspection_task: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          inspection_id: string | null
          name: string
          parent_task_id: string | null
          plan_id: string
          priority: Database["public"]["Enums"]["Priority"]
          status: Database["public"]["Enums"]["Status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_id?: string | null
          name: string
          parent_task_id?: string | null
          plan_id: string
          priority: Database["public"]["Enums"]["Priority"]
          status: Database["public"]["Enums"]["Status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          inspection_id?: string | null
          name?: string
          parent_task_id?: string | null
          plan_id?: string
          priority?: Database["public"]["Enums"]["Priority"]
          status?: Database["public"]["Enums"]["Status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_task_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_task_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_task_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "inspection_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_task_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          }
        ]
      }
      plan: {
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
            foreignKeyName: "plan_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          }
        ]
      }
      Post: {
        Row: {
          content: string | null
          createdAt: string
          description: string | null
          id: string
          image: string | null
          imageBlurhash: string | null
          published: boolean
          siteId: string | null
          slug: string
          title: string | null
          updatedAt: string
          userId: string | null
        }
        Insert: {
          content?: string | null
          createdAt?: string
          description?: string | null
          id: string
          image?: string | null
          imageBlurhash?: string | null
          published?: boolean
          siteId?: string | null
          slug: string
          title?: string | null
          updatedAt: string
          userId?: string | null
        }
        Update: {
          content?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          image?: string | null
          imageBlurhash?: string | null
          published?: boolean
          siteId?: string | null
          slug?: string
          title?: string | null
          updatedAt?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Post_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Post_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
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
      Session: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Insert: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Site: {
        Row: {
          createdAt: string
          customDomain: string | null
          description: string | null
          font: string
          id: string
          image: string | null
          imageBlurhash: string | null
          logo: string | null
          message404: string | null
          name: string | null
          subdomain: string | null
          updatedAt: string
          userId: string | null
        }
        Insert: {
          createdAt?: string
          customDomain?: string | null
          description?: string | null
          font?: string
          id: string
          image?: string | null
          imageBlurhash?: string | null
          logo?: string | null
          message404?: string | null
          name?: string | null
          subdomain?: string | null
          updatedAt: string
          userId?: string | null
        }
        Update: {
          createdAt?: string
          customDomain?: string | null
          description?: string | null
          font?: string
          id?: string
          image?: string | null
          imageBlurhash?: string | null
          logo?: string | null
          message404?: string | null
          name?: string | null
          subdomain?: string | null
          updatedAt?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Site_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      task: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          name: string
          parent_task_id: string | null
          plan_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name: string
          parent_task_id?: string | null
          plan_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_task_id?: string | null
          plan_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          }
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
          }
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
      User: {
        Row: {
          createdAt: string
          email: string | null
          emailVerified: string | null
          gh_username: string | null
          id: string
          image: string | null
          name: string | null
          updatedAt: string
          username: string | null
        }
        Insert: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          gh_username?: string | null
          id: string
          image?: string | null
          name?: string | null
          updatedAt: string
          username?: string | null
        }
        Update: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          gh_username?: string | null
          id?: string
          image?: string | null
          name?: string | null
          updatedAt?: string
          username?: string | null
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
          }
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
          }
        ]
      }
      VerificationToken: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
        Relationships: []
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
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

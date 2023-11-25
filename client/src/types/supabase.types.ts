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
      project: {
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
            foreignKeyName: "project_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          }
        ]
      }
      role: {
        Row: {
          description: string
          id: string
          name: string
          permissions: string[] | null
        }
        Insert: {
          description: string
          id?: string
          name: string
          permissions?: string[] | null
        }
        Update: {
          description?: string
          id?: string
          name?: string
          permissions?: string[] | null
        }
        Relationships: []
      }
      task: {
        Row: {
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          name: string
          parent_task_id: string | null
          project_id: string
          status: Database["public"]["Enums"]["status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name: string
          parent_task_id?: string | null
          project_id: string
          status: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_task_id?: string | null
          project_id?: string
          status?: Database["public"]["Enums"]["status"]
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
            foreignKeyName: "task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          }
        ]
      }
      team: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_uri: string | null
          name: Database["public"]["Enums"]["Role"]
          updated_at: string
          workspaces_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_uri?: string | null
          name: Database["public"]["Enums"]["Role"]
          updated_at?: string
          workspaces_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_uri?: string | null
          name?: Database["public"]["Enums"]["Role"]
          updated_at?: string
          workspaces_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_workspaces_id_fkey"
            columns: ["workspaces_id"]
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
          first_name: string | null
          id: string
          image_uri: string | null
          last_name: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          first_name?: string | null
          id: string
          image_uri?: string | null
          last_name?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          first_name?: string | null
          id?: string
          image_uri?: string | null
          last_name?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_project: {
        Row: {
          project_id: string
          role_id: string
          user_id: string
        }
        Insert: {
          project_id: string
          role_id: string
          user_id: string
        }
        Update: {
          project_id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_project_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_project_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_project_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_team: {
        Row: {
          role_id: string
          team_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          team_id: string
          user_id: string
        }
        Update: {
          role_id?: string
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
          role_id: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          role_id: string
          user_id: string
          workspace_id: string
        }
        Update: {
          role_id?: string
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
      workspace: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          url_key: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          url_key: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          url_key?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role:
        | "ADMIN"
        | "MANAGER"
        | "SUPERVISOR"
        | "TECHNICIAN"
        | "ENGINEER"
        | "QUALITY_INSPECTOR"
        | "OPERATOR"
        | "OTHER"
      status:
        | "NOTSTARTED"
        | "INPROGRESS"
        | "COMPLETED_SUCCESS"
        | "COMPLETED_FAIL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

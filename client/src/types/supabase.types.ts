export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      folder: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "folder_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organization";
            referencedColumns: ["id"];
          }
        ];
      };
      organization: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image_uri: string | null;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_uri?: string | null;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_uri?: string | null;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      role: {
        Row: {
          description: string;
          id: string;
          name: string;
          permissions: string[] | null;
        };
        Insert: {
          description: string;
          id?: string;
          name: string;
          permissions?: string[] | null;
        };
        Update: {
          description?: string;
          id?: string;
          name?: string;
          permissions?: string[] | null;
        };
        Relationships: [];
      };
      task: {
        Row: {
          created_at: string;
          created_by_id: string | null;
          description: string | null;
          folder_id: string;
          id: string;
          name: string;
          parent_task_id: string | null;
          status: Database["public"]["Enums"]["Status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by_id?: string | null;
          description?: string | null;
          folder_id: string;
          id?: string;
          name: string;
          parent_task_id?: string | null;
          status: Database["public"]["Enums"]["Status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by_id?: string | null;
          description?: string | null;
          folder_id?: string;
          id?: string;
          name?: string;
          parent_task_id?: string | null;
          status?: Database["public"]["Enums"]["Status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_created_by_id_fkey";
            columns: ["created_by_id"];
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_folder_id_fkey";
            columns: ["folder_id"];
            referencedRelation: "folder";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_parent_task_id_fkey";
            columns: ["parent_task_id"];
            referencedRelation: "task";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          createdAt: string;
          email: string;
          first_name: string | null;
          id: string;
          image_uri: string | null;
          last_name: string | null;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          email: string;
          first_name?: string | null;
          id: string;
          image_uri?: string | null;
          last_name?: string | null;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          email?: string;
          first_name?: string | null;
          id?: string;
          image_uri?: string | null;
          last_name?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_folder: {
        Row: {
          folder_id: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          folder_id: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          folder_id?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_folder_folder_id_fkey";
            columns: ["folder_id"];
            referencedRelation: "folder";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_folder_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "role";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_folder_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      user_organization: {
        Row: {
          org_id: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          org_id: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          org_id?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_organization_org_id_fkey";
            columns: ["org_id"];
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_organization_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "role";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_organization_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Status:
        | "NOTSTARTED"
        | "INPROGRESS"
        | "COMPLETED_SUCCESS"
        | "COMPLETED_FAIL";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Provider =
  | "apple"
  | "azure"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "figma"
  | "github"
  | "gitlab"
  | "google"
  | "kakao"
  | "keycloak"
  | "linkedin"
  | "notion"
  | "slack"
  | "spotify"
  | "twitch"
  | "twitter"
  | "workos"
  | "zoom";

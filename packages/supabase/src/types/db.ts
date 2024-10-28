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
      address: {
        Row: {
          city: string
          country: string
          createdDate: string
          geography: unknown
          id: string
          postal_code: string
          public_id: string
          state: string
          street: string
        }
        Insert: {
          city: string
          country: string
          createdDate?: string
          geography: unknown
          id?: string
          postal_code: string
          public_id?: string
          state: string
          street: string
        }
        Update: {
          city?: string
          country?: string
          createdDate?: string
          geography?: unknown
          id?: string
          postal_code?: string
          public_id?: string
          state?: string
          street?: string
        }
        Relationships: []
      }
      asset: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location_id: string | null
          name: string
          public_id: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          name: string
          public_id?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          name?: string
          public_id?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      assigned_resource: {
        Row: {
          created_at: string
          id: string
          service_appointment_id: string
          service_resource_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          service_appointment_id: string
          service_resource_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          service_appointment_id?: string
          service_resource_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assigned_resource_service_appointment_id_fkey"
            columns: ["service_appointment_id"]
            isOneToOne: false
            referencedRelation: "service_appointment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assigned_resource_service_resource_id_fkey"
            columns: ["service_resource_id"]
            isOneToOne: false
            referencedRelation: "service_resource"
            referencedColumns: ["id"]
          },
        ]
      }
      company: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          public_id: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          public_id?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          public_id?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      company_user: {
        Row: {
          company_id: string
          user_id: string
        }
        Insert: {
          company_id: string
          user_id: string
        }
        Update: {
          company_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_user_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      location: {
        Row: {
          address_id: string
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          location_level: number
          location_type: Database["public"]["Enums"]["LocationType"]
          name: string
          parent_location_id: string | null
          public_id: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          address_id: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_level?: number
          location_type?: Database["public"]["Enums"]["LocationType"]
          name: string
          parent_location_id?: string | null
          public_id?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          address_id?: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_level?: number
          location_type?: Database["public"]["Enums"]["LocationType"]
          name?: string
          parent_location_id?: string | null
          public_id?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_parent_location_id_fkey"
            columns: ["parent_location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      note: {
        Row: {
          content: string
          created_at: string
          created_by_id: string
          id: string
          metadata: Json | null
          type: Database["public"]["Enums"]["NoteType"]
          updated_at: string
          work_order_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by_id: string
          id?: string
          metadata?: Json | null
          type: Database["public"]["Enums"]["NoteType"]
          updated_at?: string
          work_order_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by_id?: string
          id?: string
          metadata?: Json | null
          type?: Database["public"]["Enums"]["NoteType"]
          updated_at?: string
          work_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permission: {
        Row: {
          id: string
          permission: Database["public"]["Enums"]["Permission"]
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          id?: string
          permission: Database["public"]["Enums"]["Permission"]
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          id?: string
          permission?: Database["public"]["Enums"]["Permission"]
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: []
      }
      service_appointment: {
        Row: {
          created_at: string
          end_date: string
          id: string
          start_date: string
          updated_at: string
          work_order_id: string | null
          work_order_item_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          updated_at?: string
          work_order_id?: string | null
          work_order_item_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          updated_at?: string
          work_order_id?: string | null
          work_order_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_appointment_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_appointment_work_order_item_id_fkey"
            columns: ["work_order_item_id"]
            isOneToOne: false
            referencedRelation: "work_order_item"
            referencedColumns: ["id"]
          },
        ]
      }
      service_resource: {
        Row: {
          created_at: string
          first_name: string
          full_name: unknown | null
          id: string
          is_active: boolean
          last_name: string
          team_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name: string
          full_name?: unknown | null
          id?: string
          is_active?: boolean
          last_name: string
          team_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string
          full_name?: unknown | null
          id?: string
          is_active?: boolean
          last_name?: string
          team_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_resource_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_resource_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      service_resource_absence: {
        Row: {
          created_at: string
          end_date: string
          id: string
          service_resource_id: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          service_resource_id: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          service_resource_id?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_resource_absence_service_resource_id_fkey"
            columns: ["service_resource_id"]
            isOneToOne: false
            referencedRelation: "service_resource"
            referencedColumns: ["id"]
          },
        ]
      }
      service_resource_skill: {
        Row: {
          created_at: string
          id: string
          service_resource_id: string
          skill_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          service_resource_id: string
          skill_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          service_resource_id?: string
          skill_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_resource_skill_service_resource_id_fkey"
            columns: ["service_resource_id"]
            isOneToOne: false
            referencedRelation: "service_resource"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_resource_skill_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill"
            referencedColumns: ["id"]
          },
        ]
      }
      shift: {
        Row: {
          days: number[] | null
          end_time: string
          id: string
          start_time: string
          team_id: string
        }
        Insert: {
          days?: number[] | null
          end_time: string
          id?: string
          start_time: string
          team_id: string
        }
        Update: {
          days?: number[] | null
          end_time?: string
          id?: string
          start_time?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      skill: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
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
      team_user: {
        Row: {
          role: Database["public"]["Enums"]["role"]
          team_id: string
          user_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["role"]
          team_id: string
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["role"]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_user_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
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
          full_name: unknown | null
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
          full_name?: unknown | null
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
          full_name?: unknown | null
          id?: string
          image_uri?: string | null
          last_name?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      work_order: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          ended_at: string | null
          id: string
          location_id: string | null
          name: string
          priority: Database["public"]["Enums"]["Priority"]
          public_id: string
          requested_by_id: string | null
          sheduled_end: string | null
          sheduled_start: string | null
          source: Database["public"]["Enums"]["WorkOrderSource"] | null
          started_at: string | null
          status: Database["public"]["Enums"]["Status"]
          team_id: string
          type: Database["public"]["Enums"]["WorkOrderType"]
          updated_at: string
          work_plan_id: string | null
          workspace_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          location_id?: string | null
          name: string
          priority?: Database["public"]["Enums"]["Priority"]
          public_id?: string
          requested_by_id?: string | null
          sheduled_end?: string | null
          sheduled_start?: string | null
          source?: Database["public"]["Enums"]["WorkOrderSource"] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["Status"]
          team_id: string
          type?: Database["public"]["Enums"]["WorkOrderType"]
          updated_at?: string
          work_plan_id?: string | null
          workspace_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          location_id?: string | null
          name?: string
          priority?: Database["public"]["Enums"]["Priority"]
          public_id?: string
          requested_by_id?: string | null
          sheduled_end?: string | null
          sheduled_start?: string | null
          source?: Database["public"]["Enums"]["WorkOrderSource"] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["Status"]
          team_id?: string
          type?: Database["public"]["Enums"]["WorkOrderType"]
          updated_at?: string
          work_plan_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_order_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_requested_by_id_fkey"
            columns: ["requested_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
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
          {
            foreignKeyName: "work_order_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      work_order_item: {
        Row: {
          asset_id: string | null
          created_at: string
          description: string | null
          id: string
          location_id: string | null
          name: string
          status: Database["public"]["Enums"]["Status"]
          updated_at: string
          work_order_id: string
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          name: string
          status?: Database["public"]["Enums"]["Status"]
          updated_at?: string
          work_order_id: string
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          name?: string
          status?: Database["public"]["Enums"]["Status"]
          updated_at?: string
          work_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_order_item_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_item_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_item_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
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
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          public_id?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          public_id?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_plan_template_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      work_step: {
        Row: {
          asset_id: string | null
          created_at: string
          created_by_id: string | null
          description: string | null
          id: string
          name: string
          parent_step_id: string | null
          public_id: string
          status: Database["public"]["Enums"]["Status"]
          step_order: number | null
          updated_at: string
          work_order_id: string | null
          work_plan_id: string
          work_step_template_id: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name: string
          parent_step_id?: string | null
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          step_order?: number | null
          updated_at?: string
          work_order_id?: string | null
          work_plan_id: string
          work_step_template_id?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_step_id?: string | null
          public_id?: string
          status?: Database["public"]["Enums"]["Status"]
          step_order?: number | null
          updated_at?: string
          work_order_id?: string | null
          work_plan_id?: string
          work_step_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_step_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "work_step"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_work_plan_id_fkey"
            columns: ["work_plan_id"]
            isOneToOne: false
            referencedRelation: "work_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_step_work_step_template_id_fkey"
            columns: ["work_step_template_id"]
            isOneToOne: false
            referencedRelation: "work_step_template"
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
      workspace_user: {
        Row: {
          role: Database["public"]["Enums"]["role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_user_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_available_time_slots: {
        Args: {
          schedule_range: unknown
          unavailable_time_slots: Json
        }
        Returns: {
          id: number
          available_time_slots: Json
        }[]
      }
      manage_work_plan: {
        Args: {
          _work_plan_template_id: string
          _team_id: string
        }
        Returns: {
          work_plan_id: string
          name: string
          team_id: string
          work_plan_template_id: string
          description: string
          created_at: string
          updated_at: string
        }[]
      }
      manage_work_step: {
        Args: {
          _work_plan_id: string
          _work_plan_template_id: string
        }
        Returns: {
          work_step_id: string
          name: string
          description: string
          step_order: number
          work_step_template_id: string
          parent_step_id: string
          work_plan_id: string
        }[]
      }
      manage_work_step_item: {
        Args: {
          _work_plan_id: string
          _work_order_id: string
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
      remove_overlaps: {
        Args: {
          main_range: unknown
          other_ranges: unknown[]
        }
        Returns: {
          result_range: unknown
        }[]
      }
      upsert_work_order_assets: {
        Args: {
          _work_order_id: string
          _assets: Json
        }
        Returns: {
          work_order_asset_id: string
          asset_id: string
          work_order_id: string
          created_at: string
          updated_at: string
        }[]
      }
      upsert_work_steps: {
        Args: {
          _work_plan_id: string
          _steps: Json
        }
        Returns: {
          work_step_id: string
          name: string
          description: string
          step_order: number
          work_step_template_id: string
          parent_step_id: string
          work_plan_id: string
          created_at: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      LocationType: "BUILDING" | "FLOOR" | "ROOM" | "AREA" | "OTHER"
      NoteType:
        | "STATUS_CHANGE"
        | "COMMENT"
        | "DELAY_NOTIFICATION"
        | "RESOURCE_REQUEST"
        | "CUSTOMER_COMMUNICATION"
        | "INTERNAL_COMMUNICATION"
      Permission: "CREATE" | "READ" | "UPDATE" | "DELETE"
      Priority: "LOW" | "MEDIUM" | "HIGH"
      role:
        | "ADMIN"
        | "MANAGER"
        | "SUPERVISOR"
        | "TECHNICIAN"
        | "ENGINEER"
        | "QUALITY_INSPECTOR"
        | "OPERATOR"
        | "OTHER"
      Status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELED"
      WorkOrderSource:
        | "MAINTENANCE_PLAN"
        | "AI_CHAT"
        | "AI_VOICE_ASSISTANT"
        | "MANUAL_ENTRY"
        | "OTHER"
      WorkOrderType: "INSPECTION" | "MAINTENANCE" | "OTHER"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

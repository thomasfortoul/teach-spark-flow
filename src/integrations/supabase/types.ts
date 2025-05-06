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
      course_documents: {
        Row: {
          course_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_syllabus: boolean
        }
        Insert: {
          course_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          is_syllabus?: boolean
        }
        Update: {
          course_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_syllabus?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "course_documents_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_metadata: {
        Row: {
          course_id: string
          created_at: string
          field_name: string
          id: string
          needs_confirmation: boolean
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          field_name: string
          id?: string
          needs_confirmation?: boolean
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          field_name?: string
          id?: string
          needs_confirmation?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_metadata_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string | null
          created_at: string
          duration: string | null
          id: string
          language: string | null
          level: string | null
          status: string
          student_count: string | null
          subject: string | null
          title: string
          updated_at: string
          user_id: string
          weekly_structure: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          duration?: string | null
          id?: string
          language?: string | null
          level?: string | null
          status?: string
          student_count?: string | null
          subject?: string | null
          title: string
          updated_at?: string
          user_id: string
          weekly_structure?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          duration?: string | null
          id?: string
          language?: string | null
          level?: string | null
          status?: string
          student_count?: string | null
          subject?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          weekly_structure?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_types: {
        Row: {
          course_id: string
          created_at: string
          evaluation_type: string
          id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          evaluation_type: string
          id?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          evaluation_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_types_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      fact_sheets: {
        Row: {
          assessments: string | null
          completed_sections: string[] | null
          course_id: string
          course_sequence: string | null
          created_at: string
          id: string
          learning_outcomes: string | null
          notes: string | null
          overview: string | null
          tags: string[] | null
          teaching_modalities: string | null
          tools_platforms: string | null
          updated_at: string
        }
        Insert: {
          assessments?: string | null
          completed_sections?: string[] | null
          course_id: string
          course_sequence?: string | null
          created_at?: string
          id?: string
          learning_outcomes?: string | null
          notes?: string | null
          overview?: string | null
          tags?: string[] | null
          teaching_modalities?: string | null
          tools_platforms?: string | null
          updated_at?: string
        }
        Update: {
          assessments?: string | null
          completed_sections?: string[] | null
          course_id?: string
          course_sequence?: string | null
          created_at?: string
          id?: string
          learning_outcomes?: string | null
          notes?: string | null
          overview?: string | null
          tags?: string[] | null
          teaching_modalities?: string | null
          tools_platforms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fact_sheets_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_outcomes: {
        Row: {
          course_id: string
          created_at: string
          id: string
          outcome: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          outcome: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          outcome?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_outcomes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_steps: {
        Row: {
          checkpoints: string[]
          completed: boolean
          created_at: string
          description: string | null
          id: string
          ordering: number
          task_id: string
          title: string
          updated_at: string
        }
        Insert: {
          checkpoints?: string[]
          completed?: boolean
          created_at?: string
          description?: string | null
          id?: string
          ordering: number
          task_id: string
          title: string
          updated_at?: string
        }
        Update: {
          checkpoints?: string[]
          completed?: boolean
          created_at?: string
          description?: string | null
          id?: string
          ordering?: number
          task_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_steps_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          id: string
          prompt: string | null
          task_steps: Json[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          prompt?: string | null
          task_steps: Json[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          prompt?: string | null
          task_steps?: Json[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools_platforms: {
        Row: {
          course_id: string
          created_at: string
          id: string
          tool_platform: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          tool_platform: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          tool_platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_platforms_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_edge_function_extract_syllabus: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      create_task_with_steps: {
        Args: {
          p_user_id: string
          p_course_id: string
          p_objective: string
          p_steps: Json
        }
        Returns: Json
      }
      get_task_with_steps: {
        Args: { p_task_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

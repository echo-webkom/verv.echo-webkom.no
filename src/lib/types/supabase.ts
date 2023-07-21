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
      applications: {
        Row: {
          body: string
          created_at: string
          email: string
          id: string
          ip: string
          name: string
          study: Database["public"]["Enums"]["study_enum"]
          year: Database["public"]["Enums"]["year_enum"]
        }
        Insert: {
          body: string
          created_at?: string
          email: string
          id?: string
          ip: string
          name: string
          study: Database["public"]["Enums"]["study_enum"]
          year: Database["public"]["Enums"]["year_enum"]
        }
        Update: {
          body?: string
          created_at?: string
          email?: string
          id?: string
          ip?: string
          name?: string
          study?: Database["public"]["Enums"]["study_enum"]
          year?: Database["public"]["Enums"]["year_enum"]
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
      study_enum:
        | "DTEK"
        | "DSIK"
        | "DSCI"
        | "DVIT"
        | "BINF"
        | "IMO"
        | "INF"
        | "PROG"
        | "DSC"
        | "OTHER"
      year_enum: "1" | "2" | "3" | "4" | "5"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

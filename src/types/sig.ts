export interface SIG {
  id: string
  name: string
  description: string
  focus_area: string
  created_at: string
  updated_at: string

  // Optional fields
  volunteers?: number
  duration?: string
  progress?: number
}

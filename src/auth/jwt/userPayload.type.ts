export interface UserPayload {
  userId: string
  email: string
  role: number
  payload: Record<string, string>
}

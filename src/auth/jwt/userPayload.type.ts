export interface UserPayload {
  userId: number
  email: string
  role: number
  payload: Record<string, string>
}

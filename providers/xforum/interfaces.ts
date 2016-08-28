
export interface LoginResponse {
  success: boolean,
  data: {
    code?: number,
    message?: string,
    session_id?: string,
    user_login?: string,
    user_nicename?: string
  }
}

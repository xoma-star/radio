export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    id: string,
    password?: string | null
}
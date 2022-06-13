const http = uni.$u.http

export const login = (data) => http.post('/api/auth/login',data)
export const register = (data) => http.post('/api/auth/register',data)
export const logout = () => http.post('/api/auth/logout')
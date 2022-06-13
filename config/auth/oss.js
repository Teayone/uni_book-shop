const http = uni.$u.http

export const getOssToken = () => http.get('/api/auth/oss/token')
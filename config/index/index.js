// 首页的请求 API
const http = uni.$u.http
export const getIndexData = (params = {}) => http.get('/api/index',{params})
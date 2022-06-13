const http = uni.$u.http

// 订单预览
export const orderPreview = () => http.get('/api/orders/preview')
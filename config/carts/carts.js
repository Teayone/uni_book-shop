const http = uni.$u.http

// 添加购物车
export const addCarts = (data) => http.post('/api/carts',data)


// 获取购物车列表
export const getCartsList = (params={}) => http.get('/api/carts',{params})

// 移除购物车
export const deleteCarts = (id) => http.delete(`/api/carts/${id}`)

// 购物车数量改变
export const changeCartsNum = (id,data) => http.put(`/api/carts/${id}`,data)

// 购物车选中改变 注意：是选中
export const selectCarts = (data) => http.patch('/api/carts/checked',data)


const http = uni.$u.http

export const getGoodsDetail = (id) => http.get(`/api/goods/${id}`)
// 收藏或取消收藏
export const collectGoods = (id) => http.post(`/api/collects/goods/${id}`)

// 获取所有收藏
export const getCollects = (params={}) => http.get('/api/collects',{params})

// 获取商品列表
export const getGoodsList = (params={}) => {
	return http.get('/api/goods',{params})
}
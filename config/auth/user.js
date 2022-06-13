// 用户详情
export const getUserInfo = () => uni.$u.http.get('/api/user')

// 更新用户信息
export const updateUserInfo = (data) => uni.$u.http.put('/api/user',data)

// 更新用户头像
export const updateUserAvator = (data) => uni.$u.http.patch('/api/user/avatar',data)
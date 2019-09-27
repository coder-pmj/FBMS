const MANAGE_TOKEN = 'MANAGE_TOKEN_KEY'
const MANAGE_USER = 'MANAGE_USER_KEY'


export default {
    //保存用户信息
    setUser(data) {
        localStorage.setItem(MANAGE_USER, JSON.stringify(data))
    },

    //保存token
    setToken(data) {
        localStorage.setItem(MANAGE_TOKEN, JSON.stringify(data))
    },

    //从localStorage中获取用户信息
    getUser() {
        return JSON.parse(localStorage.getItem(MANAGE_USER))
    },

    //从localStorage中获取token
    getToken() {
        return JSON.parse(localStorage.getItem(MANAGE_TOKEN))
    },
    
    //删除浏览器用户数据
    removeUser() {
        localStorage.removeItem(MANAGE_TOKEN)
        localStorage.removeItem(MANAGE_USER)
    }
}
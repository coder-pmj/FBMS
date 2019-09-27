import loginApi from '@/api/login';
import auth from '@/utils/auth'
export default {
    state: {
        token: auth.getToken(),
        userInfo: auth.getUser()
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            auth.setToken(token)
        },
        set_userInfo(state, userInfo) {
            state.userInfo = userInfo
            auth.setUser(userInfo)
        }
    },
    actions: {
        store_login({ commit }, form) {
            return new Promise((resolve, reject) => {
                loginApi.login(form.user.trim(), form.pass).then(res => {
                    const resp = res.data

                    commit('set_token', resp.data.token)

                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        store_getUser({ commit, state }) {
            return new Promise((resolve, reject) => {
                loginApi.getUserInfo(state.token).then(res => {
                    const resp = res.data

                    commit('set_userInfo', resp.data)

                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        store_logout({ state }) {
            return new Promise((resolve, reject) => {
                loginApi.logout().then(res => {

                    auth.removeUser();
                    state.token = null
                    state.userInfo = null

                    resolve(res)

                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
import myReq from '@/utils/request'
export default {
    /* searchUser(value) {
        return myReq({
            method: 'post',
            url: `api/user/info`,
            data: {
                value
            }

        })
    }, */
    login(username, password) {
        return myReq({
            method: 'post',
            url: '/user/login',
            data: {
                username,
                password
            }
        })
    },
    getUserInfo(token) {
        return myReq({
            url: `/user/info/${token}`,
            method: "get"
        });
    },
    logout() {
        return myReq({
            url: `/user/logout`,
            method: "post"
        });
    }
}
import myRep from '@/utils/request.js';

export default {
    checkPwd(userId, password) {
        return myRep({
            url: 'user/pwd',
            method: 'post',
            data: {
                userId,
                password
            }
        })
    },

    updatePwd(userId, password) {
        return myRep({
            url: '/user/pwd',
            method: 'put',
            data: {
                userId,
                password
            }
        })
    }
}
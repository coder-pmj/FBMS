import myReq from '@/utils/request.js'

export default {
    getAdminList() {
        return myReq({
            method: 'post',
            url: '/adminlist/info/search/${curr}/${size}'
        })
    }
}
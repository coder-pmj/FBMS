import myReq from '@/utils/request.js'

export default {
    addShops(obj) {
        return myReq({
            method: 'post',
            url: '/addshops',
            data: obj
        })
    }
}
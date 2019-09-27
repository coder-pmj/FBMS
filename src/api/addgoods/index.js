import myReq from '@/utils/request.js'

export default {
    addGoods(obj) {
        return myReq({
            method: 'post',
            url: '/addgoods',
            data: obj
        })
    }
}
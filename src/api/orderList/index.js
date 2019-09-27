import myRep from '@/utils/request.js';

export default {
    getOrderList(curr, size) {
        return myRep({
            url: `/orderlist/info/search/${curr}/${size}`,
            method: 'post'
        })
    }
}
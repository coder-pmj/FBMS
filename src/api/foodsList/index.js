import myRep from '@/utils/request.js';

export default {
    getfoodsList(curr, size) {
        return myRep({
            url: `/foodslist/info/search/${curr}/${size}`,
            method: 'post'
        })
    },
    getfoodsData(id) {
        return myRep({
            url: `/foodslist/${id}`,
            method: 'get'
        })
    },
    updatefoods(id) {
        return myRep({
            url: `/foodslist/${id}`,
            method: 'put'
        })
    },
    deletefoods(id) {
        return myRep({
            url: `/foodslist/${id}`,
            method: 'delete'
        })
    }

}
import myRep from '@/utils/request.js';

export default {
    getUserList(curr,size) {
        return myRep({
            url: `/userlist/info/search/${curr}/${size}`,
            method: 'post'
        })
    }
}
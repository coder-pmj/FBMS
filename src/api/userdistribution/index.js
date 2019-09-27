import myRep from '@/utils/request.js';

export default {

    getuserData() {
        return myRep({
            url: '/userdistribution',
            method: 'post'
        })
    }
}
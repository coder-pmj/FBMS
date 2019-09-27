import myRep from '@/utils/request.js';

export default {
    getSupplierList(curr, size) {
        return myRep({
            url: `/supplierlist/info/search/${curr}/${size}`,
            method: 'post'
        })
    },
    getSupplierData(id) {
        return myRep({
            url: `/supplier/${id}`,
            method: 'get'
        })
    },
    updateSupplier(id) {
        return myRep({
            url: `/supplier/${id}`,
            method: 'put'
        })
    },
    deleteSupplier(id) {
        return myRep({
            url: `/supplier/${id}`,
            method: 'delete'
        })
    }

}
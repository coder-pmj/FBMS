import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import changepass from './modules/changepass'
import schedule from './modules/schedule'
import SupplierList from './modules/SupplierList'
import foodslist from './modules/foodslist'
import addfoodsInfo from './modules/addfoodsInfo'
import addshop from './modules/addshop'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    changepass,
    schedule,
    SupplierList,
    foodslist,
    addfoodsInfo,
    addshop
  }
});
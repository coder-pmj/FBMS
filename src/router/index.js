import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout'
import Login from '@/views/Login';
import Home from '@/views/Home';
import UserList from '@/views/dataManage/UserList';
import AdminList from '@/views/dataManage/AdminList';
import FoodsList from '@/views/dataManage/FoodsList';
import OdersList from '@/views/dataManage/OdersList';
import SupplierList from '@/views/dataManage/SupplierList';
import Addshop from '@/views/addData/Addshop';
import Addgoods from '@/views/addData/Addgoods';
import userDistribution from '@/views/userDistribution';
import TextEdit from '@/views/TextEdit';
import AdminSetting from '@/views/AdminSetting';
import Explain from '@/views/Explain'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home/'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: Home
                }
            ]
        },
        {
            path: '/userList/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: UserList,
                    meta:{title:"用户列表"}
                }
            ]
        },
        {
            path: '/adminList/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: AdminList,
                    meta:{title:"管理员列表"}
                }
            ]
        },
        {
            path: '/foodsList/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: FoodsList,
                    meta:{title:"食品列表"}
                }
            ]
        },
        {
            path: '/oderslist/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: OdersList,
                    meta:{title:"订单列表"}
                }
            ]
        },
        {
            path: '/supplierList/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: SupplierList,
                    meta:{title:"商家列表"}
                }
            ]
        },
        {
            path: '/addshop/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: Addshop,
                    meta:{title:"添加店铺"}
                }
            ]
        },
        {
            path: '/addgoods/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: Addgoods,
                    meta:{title:"添加食品"}
                }
            ]
        },
        {
            path: '/userDistribution/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: userDistribution,
                    meta:{title:"用户分布"}
                }
            ]
        },
        {
            path: '/textEdit/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: TextEdit,
                    meta:{title:"文本编辑"}
                }
            ]
        },
        {
            path: '/adminSetting/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: AdminSetting,
                    meta:{title:"管理员设置"}
                }
            ]
        },
        {
            path: '/explain/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: Explain,
                    meta:{title:"说明"}
                }
            ]
        }
    ]
})
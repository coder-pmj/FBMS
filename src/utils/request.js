import axios from 'axios';
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
//数据加载拦截
const loading = {
    loadingInstance: null,
    open() {
        if (this.loadingInstace == null) {
            this.loadingInstance = Loading.service({ target: '.main', text: '正在加载数据' })

        }
    },
    close() {
        if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstace = null
        }
    }
}

//登录路径拦截
const loadinglogin = {
    loadingInstance: null,
    open() {
        if (this.loadingInstace == null) {
            this.loadingInstance = Loading.service({ target: '.layout', text: "正在登录" })
        }

    },
    close() {
        if (this.loadingInstance != null) {
            this.loadingInstance.close()
        }
        this.loadingInstace = null
    }
}

//登出路径拦截
const loadinglogout = {
    loadingInstance: null,
    open() {
        if (this.loadingInstace == null) {
            this.loadingInstance = Loading.service({ target: '.main', text: "正在退出" })
        }

    },
    close() {
        if (this.loadingInstance != null) {
            this.loadingInstance.close()
        }
        this.loadingInstace = null
    }
}

const myReq = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 //请求超过5000ms=>超时
})

const all = {
    close: function () {
        loading.close()
        loadinglogin.close()
        loadinglogout.close()
    }
}

/****** request拦截器==>对请求参数做处理 ******/
myReq.interceptors.request.use(config => {
    // console.log('request', config)
    let url = config.url //获取请求路径
    if (url === 'api/user/info/admin' || url === 'api/user/login') {
        loadinglogin.open()
    } else if (url == 'api/user/logout') {
        loadinglogout.open()

    } else if (url == 'api/user/pwd') {
        all.close()
    } else {
        loading.close()
        loading.open()
    }
    return config;
}, error => {  //请求错误处理
    Message({
        type: 'warning',
        message: error
    })
    all.close()
    return Promise.reject(error)
});


/****** response拦截器==>对相应参数做处理 ******/
myReq.interceptors.response.use(res => {
    if (!res.data.flag) {
        Message({
            type: 'warning',
            message: res.data.message
        })
    }
    //处理数据相应异常问题
    all.close()
    // console.log('response', res)
    return res;
}, error => {  //请求错误处理

    Message({
        type: 'warning',
        message: error
    })
    all.close()
    return Promise.reject(error)
});
export default myReq
export default {
    state: {
        scheduleArr: JSON.parse(localStorage.getItem('schedule')) ||
            [
               /*  {
                    content: "利用脚手架工具开始初步构建项目",
                    timestamp: "2019-09-14 am"
                },
                {
                    content: "根据需求搭建页面架构",
                    timestamp: "2019-09-14 am"
                },
                {
                    content: "走通页面路由",
                    timestamp: "2019-09-14 pm"
                },
                {
                    content: "完成系统登录、系统登出、修改密码功能",
                    timestamp: "2019-09-14 pm"
                } */

            ]
    },
    mutations: {
        addSchedule(state, obj) {
            state.scheduleArr.push({ content: obj.content, timestamp: obj.timestamp })
            localStorage.setItem('schedule', JSON.stringify(state.scheduleArr))
        }
    }
}
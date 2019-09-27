export default {
    state: {
        dialogVisible: false
    },
    mutations: {
        changeVisable(state) {
            state.dialogVisible = !state.dialogVisible
        }
    }
}
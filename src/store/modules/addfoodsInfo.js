/*
 在商家列表页，点击添加食品按钮，会将那一行的商家信息保存至这个仓库，存储商家信息
 判断用户是否通过商家列表页点击添加食品
 如果存在商家信息，即是
*/
export default {
    state: {
        supplierInfo: "",
        foodsCategory: [
            { id: 1, name: '面条' },
            { id: 2, name: '肯德基' },
            { id: 3, name: '米饭' },
            { id: 4, name: '蔬菜' },
        ],
        characteristic: [
            { id: 1, name: '招牌' },
            { id: 2, name: '新品' }
        ]
    }
}
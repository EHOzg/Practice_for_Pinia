import { defineStore } from 'pinia'
// 1.定义容器并导出
// 参数1：容器ID(必须唯一， pinia 会将所有容器挂载到根容器)
// 参数2：选项对象
// 返回值： 一个函数，调用得到容器实例
export const useMainStore = defineStore('main', {
  /**
   * 类似于组件的 data，用来存储全局状态的
   * 1、必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2、必须是箭头函数：这是为了更好的 TS 类型推导
   */
  state: () => {
    return {
      count: 100,
      foo: 'bar',
      arr: [1, 2, 3],
    }
  },

  /**
   * 类似于组件的 computed，用来封装计算属性，有缓存的功能
   * ! 调用次数取决于 count 的原始值的变化次数， 而不取决于渲染层用了几次(缓存)
   */
  getters: {
    // 注意： 函数接受一个可选参数 state 状态对象
    // count10(state) {
    //   console.log('count10 调用了')
    //   return state.count + 10
    // },

    // 改为 this 之后 TS 验证类型报错，必须强制告诉 TS 返回类型
    /**
     *
     * ! 即 如果在 getters 中使用 this 必须手动指定返回值的类型，否则类型推导不出来
     */
    count10(): number {
      console.log('count10 调用了')
      return this.count + 10
    },
  },

  /**
   * 类似于组件的 methods，封装业务逻辑，修改 state
   * ! 不能使用箭头函数定义 action 因为箭头函数绑定外部 this
   */
  actions: {
    changeState(num: number) {
      this.count += num
      this.foo = 'hello'
      this.arr.push(4)

      // this.$patch({})
      // this.$patch(state => {})

      /**
       * ! patch 和 普通多次 修改的在原理上的区别：
       * ! patch 是一次型修改好后再渲染到视图层，而普通多次修改是修改一个渲染一个
       */
    },
  },
})
// 2.使用容器中的 state

// 3.修改 state

// 4.容器中的 action 使用

<template>
  <div>
    <p>{{ mainStore.count }}</p>
    <p>{{ mainStore.foo }}</p>
    <p>{{ mainStore.arr }}</p>
    <p>{{ mainStore.count10 }}</p>
    <p>{{ mainStore.count10 }}</p>
    <p>{{ mainStore.count10 }}</p>
    <hr />
    <p>{{ count }}</p>
    <p>{{ foo }}</p>
    <hr />
    <p><button @click="handleChnageState">修改数据</button></p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/index'
const mainStore = useMainStore()
console.log('mainStore', mainStore.count)
// 解构
// 错误写法。这样拿到的数据不是响应式数据，是一次性的
// const { count, foo } = mainStore
// 解决办法是：
// pinia 其实就是把 state 数据做了 reactive 处理
// 把解构出来的数据做 ref 响应式代理
const { count, foo } = storeToRefs(mainStore)
// 而 ref 代理之后，访问如下
console.log('count', count.value)

const handleChnageState = () => {
  // 方式一： 最简单的方式
  // mainStore.count++
  // mainStore.foo = 'hello'
  // 方式二： 如果需要修改多个数据，建议使用 $patch 批量更新
  // 效果是： 有性能优化
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   foo: 'hello',
  //   arr: [...mainStore.arr, 4],
  // })
  // 方式三：更好的批量更新，$patch 一个函数
  // mainStore.$patch((state) => {
  //   state.count++
  //   state.foo = 'hello'
  //   state.arr.push(4)
  // })

  // 方式四：逻辑比较多的时候可以封装到 actions 做处理
  mainStore.changeState(10)
}
</script>

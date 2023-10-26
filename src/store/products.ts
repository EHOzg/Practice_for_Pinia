import { defineStore } from 'pinia'
import { getProducts, IProduct } from '../api/shop'
export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      // 所有商品列表
      all: [] as IProduct[], // 类型转换(断言，原 all 为 any 类型数组)
    }
  },

  getters: {},

  actions: {
    async loadAllProducts() {
      const ret = await getProducts()
      this.all = ret
    },
    // ! 就连此处都不一定是响应式数据
    decrementProduct(product: IProduct) {
      const ret = this.all.find((item) => item.id === product.id)
      if (ret) {
        ret.inventory--
      }
    },
  },
})

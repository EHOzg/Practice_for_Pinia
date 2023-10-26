import { defineStore } from 'pinia'
import { IProduct, buyProducts } from '../api/shop'
// 库存减一， 跨模块
import { useProductsStore } from '../store/products'

// {id title price quantity}
type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      // 购物车商品列表
      cartProducts: [] as CartProduct[],
      checkOutStatus: null as null | String,
    }
  },
  getters: {
    totalPrice(state) {
      // reduce 累加
      return state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },
  },
  actions: {
    addProductToCart(product: IProduct) {
      console.log('product', product)

      /**
       * *逻辑：
       * *1.先看购物车中是否有该商品
       * *  有则数量加一
       * *  没有则push进数组
       * ! 只有这样的有复杂些逻辑的东西才值得放进 actions 当中
       */
      if (product.inventory < 1) {
        return
      }
      const cartItem = this.cartProducts.find((item) => item.id === product.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          // 第一次加就是1
          quantity: 1,
        })
      }
      // 更新商品的库存 不建议，不能相信函数的参数 product.inventory--
      // ! 必须把此操作交给拥有该数据的响应式容器,应为不能保证传过来的数据一定是响应式的
      const productsStore = useProductsStore()
      productsStore.decrementProduct(product)
    },
    async checkOut() {
      const ret = await buyProducts()
      // 模拟支付的效果
      this.checkOutStatus = ret ? '成功' : '失败'
      if (ret) {
        this.cartProducts = []
      }
    },
  },
})

<template>
  <div class="cart">
    <h2>你的购物车</h2>
    <p>
      <i>请添加一些商品到你的购物车.</i>
    </p>
    <ul>
      <li v-for="item in cartStore.cartProducts">
        {{ item.title }} - {{ item.price }} x {{ item.quantity }}
      </li>
    </ul>
    <p>商品总价： {{ cartStore.totalPrice }}</p>
    <p>
      <button @click="cartStore.checkOut">结算</button>
    </p>
    <p v-show="cartStore.checkOutStatus">结算{{ cartStore.checkOutStatus }}</p>
  </div>
</template>
<script lang="ts" setup>
import { useCartStore } from '../store/cart'
const cartStore = useCartStore()
</script>

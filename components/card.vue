<template>
  <div class="container">
    <div class="header rounded-t-lg p-4 bg-gray-100">
      <h1 class="font-thin ">{{ title }}</h1>
    </div>
    <div class="body container p-4">
      <div class="list grid grid-cols-6 m-4" v-for="item in list" :key="item">
        <div class="col-span-3">{{item.title}}</div>
        <div :class="lastRubleCourse >= rubleCourse ? 'text-green-500' : 'text-red-500'">₽ {{round(item.price * currency.course)}}</div>
        <div><button @click="addToCart(item, item.price)"><svg  class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg></button></div>
        <div><button @click="removeFromCart(item.id)">X</button></div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  name: "card",
  props: ['list', 'title'],
  data() {
    return {
      rubleCourse: 20,
      lastRubleCourse: 20,
    }
  },
  computed: {
    ...mapState(['cart', 'currency'])
  },
  methods: {
    addToCart(item, price) {
      this.$store.dispatch('cart/addItem', item, price)
    },
    removeFromCart(id) {
      this.$store.dispatch('cart/removeItem', id)
    },
    round(val) {
      return val.toFixed(0)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
  .list {
    list-style: none;
  }

  li {

  }
</style>

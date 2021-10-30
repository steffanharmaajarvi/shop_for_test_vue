<template>
  <div class="container p-5 grid grid-cols-12 gap-4 ">
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet">
      <div class="col-span-6">
        <card v-for="(category, title) in this.goods.list" :list="category" :title="title"></card>
      </div>
      <div class="col-span-6">
        <cart :list="cart.list"></cart>
      </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'


export default {
  name: "goods",
  methods: {
    ...mapMutations(['goods']),
    getList() {
      this.$store.dispatch('goods/fetch')
    }
  },
  computed: {
    ...mapState(['goods', 'cart'])
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>

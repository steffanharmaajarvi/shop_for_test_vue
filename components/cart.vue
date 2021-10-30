<template>
  <div>
    <div class="list grid grid-cols-6 m-4">
      <div class="header col-span-6 rounded-t-lg p-4 bg-gray-100">
        <h1 class="font-thin ">₽ {{ round(sum * rubleCourse) }}</h1>
      </div>
      <div class="body container col-span-6">
        <div class="list flex gap-8 m-4" v-for="item in list" :key="item">
          <div class="col-span-2">{{item.title}}</div>
          <div class="col-span-3"><nobr>₽ {{ round(count[item.id].price * rubleCourse) }}</nobr></div>
          <div class="col-span-3">
            <input @change="(item.count >= $event.target.value) ? updateSum($event.target.value, item.price, item.id) : updateSum(item.count, item.price, item.id)" :max="item.count" placeholder="Количество" class="border-4" type="number">
            <div class="text-yellow-500" v-if="item.count > 0">
              Всего: {{ item.count }}
            </div>
          </div>
          <div class="col-span-1"><button @click="removeFromCart(item.id) ">Удалить</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "cart",
  props: ['list'],
  data() {
    return {
      count: [],
      rubleCourse: 20,
      sum: 0,
    }
  },
  computed: {
    ...mapState(['cart']),

  },
  methods: {
    removeFromCart(id) {
      this.sum -= this.count[id].price
      this.count.splice(id, 1)

      this.$store.dispatch('cart/removeItem', id)
    },
    getRubleCourse() {
      this.lastRubleCourse = this.currency.course

      this.$store.dispatch('currency/recalculate')
      this.rubleCourse = this.currency.course
    },
    round(val) {
      return val.toFixed(0)
    },
    updateSum(event, price, id) {
      this.count[id] = {}
      this.count[id].price = price * event
      this.count[id].id = id

      this.sum = 0
      this.count.forEach((item) => {
        this.count[item.id] = {}
        this.count[item.id].id = item.id
        this.count[item.id].price = item.price
        this.sum += item.price
        console.log(item.price)

      })
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function (newValue) {

          newValue.forEach((item) => {
          if ( this.count[item.id] === undefined  ) {

            this.count[item.id] = {}

            this.count[item.id].id = item.id
            this.count[item.id].price = item.price
            this.sum += item.price
          }

        })

      }
    }
  },
  mounted() {
    setInterval(() => this.getRubleCourse(), 15 * 1000)
  }
}
</script>

<style scoped>

</style>

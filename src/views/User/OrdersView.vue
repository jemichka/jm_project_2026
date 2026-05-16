<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">Orders</h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <!-- Лоудер -->
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
          class="mb-3"
        ></v-progress-linear>

        <!-- Сообщение если нет заказов -->
        <v-card v-if="orders.length === 0 && !loading" class="pa-5 text-center">
          <h3 class="text--secondary">У вас пока нет заказов</h3>
        </v-card>

        <!-- Список заказов -->
        <v-list subheader two-line flat>
          <v-list-item 
            v-for="order in orders" 
            :key="order.id"
          >
            <template v-slot:prepend>
              <v-list-item-action>
                <v-checkbox
                  :model-value="order.done"
                  color="primary"
                  @click="markDone(order)"
                  :disabled="loading"
                ></v-checkbox>
              </v-list-item-action>
            </template>

            <v-list-item-title>{{ order.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters.orders
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    markDone(order) {
      this.$store.dispatch('updateOrderStatus', {
        id: order.id,
        done: !order.done
      })
    }
  }
}
</script>
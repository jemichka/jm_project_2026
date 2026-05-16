class Order {
  constructor(name, phone, adId, userId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.userId = userId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    },
    updateOrderStatus(state, { id, done }) {
      const order = state.orders.find(order => order.id == id)
      if (order) {
        order.done = done
      }
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, userId }) {
      const payload = new Order(name, phone, adId, userId, false, Math.random())
      
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })
      
      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })
      
      if (isRequestOk) {
        await promise.then(() => {
          commit('createOrder', payload)
          commit('setLoading', false, { root: true })
        })
      } else {
        await promise.then(() => {
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка создания заказа', { root: true })
          throw new Error('Упс... Ошибка создания заказа')
        })
      }
    },
    async updateOrderStatus({ commit }, { id, done }) {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })
      
      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 1000)
      })
      
      if (isRequestOk) {
        await promise.then(() => {
          commit('updateOrderStatus', { id, done })
          commit('setLoading', false, { root: true })
        })
      } else {
        await promise.then(() => {
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка обновления статуса заказа', { root: true })
          throw new Error('Упс... Ошибка обновления статуса заказа')
        })
      }
    }
  },
  getters: {
    orders(state, getters) {
      if (getters.user == null) return []
      return state.orders.filter(order => order.userId == getters.user.id)
    }
  }
}
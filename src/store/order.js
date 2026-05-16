export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, userId }) {
      console.log('Order details:')
      console.log('Name:', name)
      console.log('Phone:', phone)
      console.log('Ad ID:', adId)
      console.log('User ID:', userId)
      
      commit('clearError', null, { root: true })
      
      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })
      
      if (isRequestOk) {
        await promise.then(() => {
          const newOrder = {
            id: Math.random().toString(),
            name: name,
            phone: phone,
            adId: adId,
            userId: userId,
            done: false
          }
          commit('createOrder', newOrder)
          commit('setLoading', false, { root: true })
        })
      } else {
        await promise.then(() => {
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка создания заказа', { root: true })
          throw new Error('Упс... Ошибка создания заказа')
        })
      }
    }
  },
  getters: {
    orders(state) {
      return state.orders
    }
  }
}
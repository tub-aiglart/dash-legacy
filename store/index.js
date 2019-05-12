export const state = () => ({
  auth: null
})

export const mutations = {
  set(state, auth) {
    state.auth = auth
  }
}

/* eslint-disable */
export const actions = {
  async nuxtServerInit({ commit }, { req, redirect, store, app }) {
    const user = app.$cookies.get('user')
    if (user) {
      if (!store.state.auth) {
        const result = await app.$axios.$request({
          baseURL: 'http://localhost:1945',
          url: '/validate',
          method: 'get',
          headers: {
            'Authorization': user.token
          },
          validateStatus: function (status) {
            return status < 500
          }
        })
        if (result === '200') {
          commit('set', user.token)
          return redirect(req.url)
        } else {
          commit('set', null)
          app.$cookies.remove('user')
          return redirect('/login')
        }
      } else {
        const result = await app.$axios.$request({
          baseURL: 'http://localhost:1945',
          url: '/validate',
          method: 'get',
          headers: {
            'Authorization': store.state.auth
          },
          validateStatus: function (status) {
            return status < 500
          }
        })
        if (!result === '200') {
          commit('set', null)
          app.$cookies.remove('user')
          return redirect('/login')
        }
      }
    }
  }
}

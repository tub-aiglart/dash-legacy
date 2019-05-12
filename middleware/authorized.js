export default async function ({ store, redirect, app }) {
  if (store.state.auth) {
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
    if (result === '200') {
      return redirect('/')
    } else {
      store.commit('user', null)
      app.$cookies.remove('user')
      return redirect('/login')
    }
  }
}

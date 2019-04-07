export default function ({ store, redirect, app, req }) {
  if (!store.state.auth) {
    app.$cookies.remove('user')
    // return redirect(`/login?from=${req.headers}`)
    return redirect('/login')
  }
}

<template>
  <div class="index">
    <h1>One image</h1>
    <div style="margin: 50px;">
      <h1>{{ image.title }}</h1>
      <p>{{ image.description }}</p>
      <p>{{ image.size }}</p>
      <img :src="`http://127.0.0.1:8080/` + image.id + image.extension " height="200px">
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  middleware: 'unauthorized',
  async asyncData({ app, store, req }) {
    const result = await app.$axios.$request({
      baseURL: 'http://localhost:1945',
      url: '/image',
      method: 'get',
      data: req.url.split('/')[req.url.split('/').length - 1],
      headers: {
        'Authorization': store.state.auth
      }
    })
    return { image: result }
  }
}
</script>

<style lang="scss" scoped>

</style>

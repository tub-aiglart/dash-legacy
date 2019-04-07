<template>
  <div class="index">
    <h1>All images</h1>
    <div v-for="image in images" :key="image.id" style="margin: 50px;">
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
  async asyncData({ app, store }) {
    const result = await app.$axios.$request({
      baseURL: 'http://localhost:1945',
      url: '/images',
      method: 'get',
      headers: {
        'Authorization': store.state.auth
      }
    })
    return { images: result }
  }
}
</script>

<style lang="scss" scoped>

</style>

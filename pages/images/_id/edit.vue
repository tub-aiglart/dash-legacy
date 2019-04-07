<template>
  <div class="index">
    <input id="title" type="text" placeholder="title">
    <input id="description" type="text" placeholder="description">
    <input id="size" type="text" placeholder="size">
    <input id="displayed" type="checkbox">
    <input id="input" type="file" accept="image/png, image/jpeg">
    <button @click="edit()">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  middleware: 'unauthorized',
  methods: {
    async edit() {
      /* eslint-disable */
      const title = document.getElementById('title')
      const description = document.getElementById('description')
      const size = document.getElementById('size')
      const displayed = document.getElementById('displayed')
      const data = new FormData()
      data.append('id', 'sdaaf')
      data.append('title', title.value)
      data.append('description', description.value)
      data.append('size', size.value)
      data.append('displayed', displayed.checked)
      const result = await this.$axios.$request({
        baseURL: 'http://localhost:1945',
        url: '/image',
        method: 'patch',
        data: data,
        headers: {
          'Authorization': this.$store.state.auth
        }
      })
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

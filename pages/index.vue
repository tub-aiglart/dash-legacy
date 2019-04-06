<template>
  <div class="index">
    <input id="title" type="text" placeholder="title">
    <input id="description" type="text" placeholder="description">
    <input id="size" type="text" placeholder="size">
    <input id="displayed" type="checkbox">
    <input id="input" type="file" accept="image/png, image/jpeg">
    <button @click="test()">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  methods: {
    async test() {
      /* eslint-disable */
      const input = document.getElementById('input')
      const title = document.getElementById('title')
      const description = document.getElementById('description')
      const size = document.getElementById('size')
      const displayed = document.getElementById('displayed')
      const data = new FormData()
      data.append('files', input.files[0])
      data.append('title', title.value)
      data.append('description', description.value)
      data.append('size', size.value)
      data.append('displayed', displayed.checked)
      const result = await this.$axios.$request({
        baseURL: 'http://localhost:1945',
        url: '/images',
        method: 'post',
        data: data,
        headers: {
          'Authorization': this.$storage.getUniversal('user').token
        }
      })
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="index">
    <!-- Display image with /get-image -->
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
      const data = new FormData()
      data.append('id', 'sdaaf')
      const result = await this.$axios.$request({
        baseURL: 'http://localhost:1945',
        url: '/image',
        method: 'delete',
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

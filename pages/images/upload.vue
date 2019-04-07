<template>
  <div class="upload">
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <h1 class="top">
            tub-aiglart.
          </h1>
          <h2 class="sub">
            Upload File
          </h2>
        </div>
        <p v-if="error" class="error">
          {{ error }}
        </p>
        <div class="form">
          <input id="title" class="input" type="text" placeholder="Title">
          <input id="description" class="input" type="text" placeholder="Description">
          <input id="size" class="input" type="text" placeholder="Size">
          <div class="check input">
            <input id="displayed" type="checkbox">
            <p class="label">
              Display the Image
            </p>
          </div>
          <input id="input" class="input" type="file" accept="image/png, image/jpeg">
          <div class="buttons">
            <button class="cancel" @click="cancel()">
              Cancel
            </button>
            <button class="submit" @click="submit()">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  middleware: 'unauthorized',
  data() {
    return {
      error: null
    }
  },
  methods: {
    async submit() {
      /* eslint-disable */
      const input = document.getElementById('input')
      const title = document.getElementById('title')
      const description = document.getElementById('description')
      const size = document.getElementById('size')
      const displayed = document.getElementById('displayed')

      if (input.files === [] || title.value === '' || description.value === '' || size.value === '') {
        this.error = 'Please fill out the whole form!'
      } else {
        this.reset()
        const data = new FormData()
        data.append('files', input.files[0])
        data.append('title', title.value)
        data.append('description', description.value)
        data.append('size', size.value)
        data.append('displayed', displayed.checked)
        const result = await this.$axios.$request({
          baseURL: 'http://localhost:1945',
          url: '/image',
          method: 'put',
          data: data,
          headers: {
            'Authorization': this.$store.state.auth
          }
        })
        this.$router.push(`/images/${result.id}`)
      }
    },
    cancel() {
      this.$router.push('/')
    },
    reset() {
      this.error = null
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--white);
      padding: 75px;
      border-radius: var(--radius-medium);
      box-shadow: var(--shadow-all);

      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0;

        .top {
          font-weight: 700;
          font-size: 30px;
        }

        .sub {
          font-size: 15px;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0 0 0;

        .input {
          margin: 10px 0 0 0;
          width: 250px;
        }

        .check {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 20px 0 10px 0;

          .label {
            margin-left: 10px;
          }
        }

        .buttons {

          .cancel {
            background: var(--red);
          }

          .submit {
            background: var(--green);
          }
        }
      }

      .error {
        color: var(--red);
        font-weight: 500;
        width: 250px;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

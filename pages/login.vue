<template>
  <div class="login">
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <h1 class="top">
            tub-aiglart.
          </h1>
          <h2 class="sub">
            Dashboard Login
          </h2>
        </div>
        <p v-if="error" class="error">
          {{ error }}
        </p>
        <div class="form">
          <input id="username" class="text" type="text" placeholder="Username" autocomplete="off">
          <input id="password" class="password" type="password" placeholder="Password">
          <button id="button" class="button" @click="login()">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  data() {
    return {
      error: null
    }
  },
  methods: {
    async login() {
      const username = document.getElementById('username')
      const password = document.getElementById('password')

      if (username.value === '' && password.value === '') {
        this.error = 'You need to insert a username as well as a password!'
      } else if (username.value === '') {
        this.error = 'You need to insert a username!'
      } else if (password.value === '') {
        this.error = 'You need to insert a password!'
      } else {
        this.disable()
        const result = await this.$axios.$request({
          baseURL: 'http://localhost:1945',
          url: '/authorize',
          method: 'get',
          headers: {
            'Authorization': btoa(`${username.value}:${password.value}`),
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })

        this.$storage.setUniversal('user', result)
      }
    },
    reset() {
      this.error = null
    },
    disable() {
      this.reset()
      const username = document.getElementById('username')
      const password = document.getElementById('password')
      const button = document.getElementById('button')
      username.disabled = true
      password.disabled = true
      button.disabled = true
      button.innerText = 'Loading'
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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

        input {
          width: 250px;
        }

        .password {
          margin: 7px 0 0 0;
        }

        .button {
          margin: 25px 0 0 0;
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
</style>

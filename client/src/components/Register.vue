<template>
  <!-- form register -->
  <div
    class="register-layout"
    style="
          padding: 140px 0px;
          width: auto;
          height: 705px;
          background-color: white;
        "
  >
    <div class="container border" style="width: 500px; background-color: #e5e5e5;">
      <nav style="margin-left: 46px; padding-top: 20px;">
        <a style="font-size: 20px; color: black;" v-on:click="gotoLogin" href="#">Login</a>
        |
        <a
          style="font-size: 20px; color: black;"
          v-on:click="gotoRegister"
          href="#"
        >Register</a>
      </nav>
      <hr />
      <div style="padding: 0px 50px 50px 50px; margin: 0;">
        <h5>Register Form</h5>
        <form v-on:submit.prevent="formRegister">
          <div class="form-group">
            <label for="emailRegister">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailRegister"
              v-model="emailRegister"
              aria-describedby="emailHelp"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="passwordRegister">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordRegister"
              v-model="passwordRegister"
            />
          </div>
          <button
            type="submit"
            class="btn"
            style="background-color: #042549; color: white; width: 370px;"
          >Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      emailRegister: "",
      passwordRegister: "",
      statusRegisterLogin: false
    };
  },
  methods: {
    gotoLogin() {
      this.$emit("status", false);
    },
    gotoRegister() {
      this.$emit("status", true);
    },
    formRegister() {
      const email = this.emailRegister;
      const password = this.passwordRegister;
      axios({
        method: "post",
        url: "http://localhost:3000/register",
        data: {
          email: email,
          password: password
        }
      })
        .then(result => {
          console.log(result, "ini result");
          swal("You are Successfully Register!", "", "success");
        })
        .catch(err => {
          console.log("asdasdsa");
          swal(err.response.data.message[0], "", "error");
        })
        .finally(() => {
          (this.emailRegister = ""), (this.passwordRegister = "");
        });
    }
  }
};
</script>

<style>
</style>
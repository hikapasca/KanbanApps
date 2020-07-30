<template>
  <!-- form login -->
  <div
    class="login-layout"
    style="
          padding: 140px 0px;
          width: auto;
          height: 705px;
          background-color: white;
        "
  >
    <div
      class="container border"
      style="width: 500px; background-color: #e5e5e5;"
    >
      <nav style="margin-left: 46px; padding-top: 20px;">
        <a
          style="font-size: 20px; color: black;"
          v-on:click="gotoLogin"
          href="#"
          >Login</a
        >
        |
        <a
          style="font-size: 20px; color: black;"
          v-on:click="gotoRegister"
          href="#"
          >Register</a
        >
      </nav>
      <hr />
      <div style="padding: 0px 50px 50px 50px;">
        <h5>Login Form</h5>
        <form v-on:submit.prevent="formLogin">
          <div class="form-group">
            <label for="emailLogin">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailLogin"
              v-model="emailLogin"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="passwordLogin">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordLogin"
              v-model="passwordLogin"
            />
          </div>
          <button
            type="submit"
            class="btn"
            style="background-color: #042549; color: white; width: 370px;"
          >
            Login
          </button>
          <p>Or</p>
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
          ></GoogleLogin>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      statusRegisterLogin: false,
      params: {
        client_id:
          "603798192515-glvgho7s38d1a6jakuh0558rve9kgj17.apps.googleusercontent.com",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onFailure() {},

    gotoLogin() {
      this.$emit("status", false);
    },
    gotoRegister() {
      this.$emit("status", true);
    },
    formLogin() {
      const email = this.emailLogin;
      const password = this.passwordLogin;
      axios({
        method: "post",
        url: "https://lit-mountain-74451.herokuapp.com/login",
        data: {
          email: email,
          password: password,
        },
      })
        .then((result) => {
          console.log(result.data);
          localStorage.userEmail = result.data.userEmail;
          localStorage.access_token = result.data.access_token;
          this.$emit("statusLogin", true);
          console.log(result, "ini result");
          // this.isLoggedIn = true;
          // this.getTask();
          swal("You are Successfully Login!", "", "success");
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data);
          swal(err.response.data.message, "", "error");
          // swal(err.response, "", "error");
        })
        .finally(() => {
          (this.emailLogin = ""), (this.passwordLogin = "");
        });
    },
    onSuccess(googleUser) {
      console.log("asdasd");
      console.log(googleUser, "ini google user");
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token, "ini id token");
      // console.log(profile);
      axios({
        method: "POST",
        url: "http://localhost:3000/googleSignIn",
        data: { id_token },
      })
        .then((result) => {
          console.log(result.data, "ini result");
          localStorage.access_token = result.data.access_token;
          this.$emit("statusLogin", true);
          console.log(result, ">>?>?>?>?>?");
          swal("You are Successfully Login!", "", "success");
        })
        .catch((err) => {
          console.log(err.response, "aaaaaaa");
          swal(err.response.data.message[0], "", "error");
        })
        .finally(() => {});

      // This only gets the user information: id, name, imageUrl and email
      // console.log(googleUser.getBasicProfile());
    },
  },
};
</script>

<style></style>

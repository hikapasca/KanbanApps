<template>
  <div class="layout" id="layout">
    <div class="beforeLogin" v-if="!isLoggedIn">
      <Register v-if="statusRegisterLogin" @status="status"></Register>
      <Login v-if="!statusRegisterLogin" @statusLogin="statusLogin" @status="status"></Login>
    </div>
    <!-- home layout -->
    <div
      v-if="isLoggedIn"
      class="home-layout"
      style="width: auto; height: 705px; background-color: white;"
    >
      <NavbarAfterLogin @requestLogout="requestLogout"></NavbarAfterLogin>
      <ListKanban
        :collectData="collectData"
        @requestDelete="requestDelete"
        @requestUpdate="requestUpdate"
        @requestMove="requestMove"
        @requestAdd="requestAdd"
      ></ListKanban>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import swal from "sweetalert";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarAfterLogin from "./components/NavbarAfterLogin";
// import NavbarBeforelogin from "./components/NavbarBeforeLogin";
import ListKanban from "./components/ListKanban";

export default {
  name: "app",
  data() {
    return {
      statusRegisterLogin: false,
      isLoggedIn: false,
      collectData: []
    };
  },
  methods: {
    statusLogin(params) {
      this.isLoggedIn = params;
      console.log("ini axios");
      this.getTask();
    },
    status(params) {
      console.log(params, "ini params");
      this.statusRegisterLogin = params;
    },
    requestLogout(params) {
      this.isLoggedIn = params;
    },
    requestDelete(params) {
      this.getTask();
    },
    requestUpdate(params) {
      this.getTask();
    },
    requestMove(params) {
      this.getTask();
    },
    requestAdd(params) {
      this.getTask();
    },
    getTask() {
      console.log("line 43");
      axios({
        method: "GET",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          console.log("check");
          this.collectData = result.data;
        })
        .catch(err => {
          console.log(err, "ini error asa");
        })
        .finally(() => {
          console.log("finally");
        });
    }
  },
  computed: {},
  created() {
    if (localStorage.access_token) {
      this.isLoggedIn = true;
      this.getTask();
    } else {
      this.isLoggedIn = false;
    }
  },
  mounted() {},
  components: {
    Register: Register,
    Login: Login,
    NavbarAfterLogin: NavbarAfterLogin,
    // NavbarBeforelogin: NavbarBeforelogin,
    ListKanban: ListKanban
  }
};
</script>

<style scoped></style>

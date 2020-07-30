<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="justify-content: space-between; background-color: #042549;"
  >
    <a class="navbar-brand" style="color: white;" href="#">KANBAN</a>
    <button v-on:click="logout" type="button" class="btn btn-danger">
      Logout
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      // this.isLoggedIn = false;
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
      this.$emit("requestLogout", false);
      swal("Succesfully logout!", "", "success");
    },
  },
};
</script>

<style></style>

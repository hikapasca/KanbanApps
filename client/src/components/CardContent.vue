<template>
  <div>
    <div
      class="inside-task"
      v-if="!checkUpdateTask"
      style="
                          background-color: white;
                          border-radius: 8px;
                          padding: 5px 10px;
                          margin-left: 15px;
                          margin-top: 10px;
                        "
    >
      <p style="font-size: 20px; margin: 1;">{{ listTask.title }}</p>

      <p style="color: #9f978f; font-size: 15px; margin: 0;">
        By: User Id = {{ listTask.UserId }}
      </p>
      <p style="margin: 0;">
        Action :
        <button
          type="button"
          class="btn"
          v-on:click="deleteTask(listTask.id)"
          style="
                              font-size: 12px;
                              padding: 5px 13px;
                              color: white;
                              background-color: #042549;
                            "
        >
          Delete
        </button>
        <button
          type="button"
          class="btn"
          v-on:click="updateTask(listTask.id)"
          style="
                              color: white;
                              background-color: #042549;
                              font-size: 12px;
                              padding: 5px 13px;
                            "
        >
          Update
        </button>
        <button
          type="button"
          class="btn"
          v-on:click="moveTask(listTask.id, listTask.title, listTask.category)"
          style="
                              color: white;
                              background-color: #042549;
                              font-size: 12px;
                              padding: 5px 13px;
                            "
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Move
        </button>
      </p>
    </div>
    <div
      v-if="checkUpdateTask"
      style="background-color: bisque; margin-top: 10px;"
    >
      <div style="margin-left: 15px;">
        <textarea
          v-model="valueEditTask"
          style="
                              background-color: white;

                              width: 270px;
                            "
        ></textarea>
        <button
          v-on:click="saveEditTask(listTask.id)"
          type="button"
          class="btn btn-success"
        >
          Save
        </button>
        <button
          v-on:click="exitEditTask"
          type="button"
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["listTask", "categoryTask"],
  data() {
    return {
      valueEditTask: "",
      checkTask: false,
      checkUpdateTask: false,
    };
  },
  methods: {
    deleteTask(params) {
      console.log(params, "ini id");
      axios({
        method: "DELETE",
        url: `https://lit-mountain-74451.herokuapp.com/tasks/${params}`,
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          this.$emit("requestDelete", "success");
          swal("Succesfully delete!", "", "success");
        })
        .catch((err) => {
          console.log(err, "ini kegagalan err");
          swal("Forbidden Access!", "", "error");
        });
    },
    updateTask(params) {
      console.log(params, "ini params");
      axios({
        method: "put",
        url: `https://lit-mountain-74451.herokuapp.com/tasks/${params}`,
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          this.checkUpdateTask = true;
          console.log(result.data);

          this.valueEditTask = result.data[1][0].title;
        })
        .catch((err) => {
          swal("Forbidden Access!", "", "error");
          console.log(err.response, "ini error update");
        });
    },
    moveTask(id, title, category) {
      const list = ["Backlog", "Todo", "Done", "Completed", "Backlog"];
      let newCategory;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === category) {
          newCategory = list[i + 1];
          break;
        }
      }
      axios({
        method: "PUT",
        url: `https://lit-mountain-74451.herokuapp.com/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          title: title,
          category: newCategory,
        },
      })
        .then((result) => {
          console.log("jeje");
          this.$emit("requestMove", "success");
          swal("Succesfully move!", "", "success");
        })
        .catch((err) => {
          swal("Forbidden Access!", "", "error");
          console.log(err.response, "ono error");
        });
    },
    saveEditTask(params) {
      const updateTitle = this.valueEditTask;
      axios({
        method: "PUT",
        url: `https://lit-mountain-74451.herokuapp.com/tasks/${params}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          title: updateTitle,
          category: this.categoryTask,
        },
      })
        .then((result) => {
          this.checkUpdateTask = false;
          this.$emit("requestUpdate", "success");
          swal("Succesfully update!", "", "success");
        })
        .catch((err) => {});
    },
    exitEditTask() {
      this.checkUpdateTask = false;
    },
  },
  computed: {},
  created() {},
};
</script>

<style></style>

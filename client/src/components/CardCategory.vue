<template>
  <div>
    <div>
      <div style="background-color: white;">
        <div class>
          <div
            class="cardHeader"
            style="background-color: #042549; padding: 0px;"
          >
            <h5
              class="card-title"
              style="margin: 0; color: white; padding: 15px 20px;"
            >
              {{ data.name }}
            </h5>
          </div>
          <div
            class="content-Backlog"
            style="
                      background-color: #edeef1;
                      overflow: scroll;
                      width: auto;
                      height: 480px;
                    "
          >
            <CardCategory
              v-for="item in filterData[data.name]"
              :key="item.id"
              :listTask="item"
              :categoryTask="item.category"
              @requestDelete="requestDelete"
              @requestUpdate="requestUpdate"
              @requestMove="requestMove"
            ></CardCategory>

            <!-- <formAdd></formAdd> -->
            <div v-if="checkTask" class="form-add-Backlog">
              <textarea
                v-model="valueAddTask"
                style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
              ></textarea>
            </div>
          </div>
          <div
            class="add-todo"
            style="background-color: #042549; padding: 10px 10px;"
          >
            <div v-if="!checkTask" class="add-add">
              <button
                type="button"
                class="btn btn-secondary"
                v-on:click="addTask(data.name)"
                style="margin: 0;"
              >
                Add Task
              </button>
            </div>
            <div v-else class="add-add-inside">
              <button
                type="button"
                class="btn btn-success"
                v-on:click.prevent="saveTask(data.name)"
                style="margin: 0;"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                v-on:click="exitTask"
                style="margin: 0;"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardCategory from "./CardContent.vue";
import axios from "axios";
export default {
  props: ["data", "collectData"],
  data() {
    return {
      valueAddTask: "",
      checkTask: false,
    };
  },
  methods: {
    requestDelete(params) {
      this.$emit("requestDelete", "success");
    },
    requestUpdate(params) {
      this.$emit("requestUpdate", "success");
    },
    requestMove(params) {
      this.$emit("requestMove", "success");
    },
    addTask(category) {
      if (category === "Backlog") {
        this.checkTask = true;
      } else if (category === "Todo") {
        this.checkTask = true;
      } else if (category === "Done") {
        this.checkTask = true;
      } else if (category === "Completed") {
        this.checkTask = true;
      }
    },
    saveTask(category) {
      console.log("sssss");
      const data = this.valueAddTask;
      axios({
        method: "POST",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token },
        data: {
          title: data,
          category: category,
        },
      })
        .then((result) => {
          console.log("ini result");
          this.checkTask = false;
          this.$emit("requestAdd", "success");
          swal("Succesfully Add!", "", "success");
          // this.getTask();
        })
        .catch((err) => {
          console.log(err.response, "oomomo");
        });
    },
    exitTask() {
      this.checkTask = false;
    },
  },
  computed: {
    filterData: function() {
      let data = {};
      const backlog = this.collectData.filter((word) => {
        return word.category === "Backlog";
      });
      const todo = this.collectData.filter((word) => word.category === "Todo");
      const done = this.collectData.filter((word) => word.category === "Done");
      const completed = this.collectData.filter(
        (word) => word.category === "Completed"
      );
      //   filterBacklog.push(backlog);
      data.Backlog = backlog;
      data.Todo = todo;
      data.Done = done;
      data.Completed = completed;
      console.log(data);
      return data;
    },
  },
  created() {
    console.log(this.data, "cek data");
  },
  components: {
    CardCategory,
  },
};
</script>

<style></style>

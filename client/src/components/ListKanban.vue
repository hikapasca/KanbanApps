<template>
  <!-- list kanban -->
  <div id="list-kanban" style="margin-top: 20px; justify-content: space-around;">
    <div style="margin-left: 10px; margin-right: 10px;">
      <div class="row">
        <!-- Backlog kanban -->
        <div class="col-sm-3">
          <div style="background-color: white;">
            <div class>
              <div class="cardHeader" style="background-color: #042549; padding: 0px;">
                <h5 class="card-title" style="margin: 0; color: white; padding: 15px 20px;">Backlog</h5>
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
                  v-for="item in BacklogData"
                  :key="item.id"
                  :listTask="item"
                  :categoryTask="item.category"
                  @requestDelete="requestDelete"
                  @requestUpdate="requestUpdate"
                  @requestMove="requestMove"
                ></CardCategory>

                <!-- <formAdd></formAdd> -->
                <div v-if="checkBacklog" class="form-add-Backlog">
                  <textarea
                    v-model="valueAddBacklog"
                    style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
                  ></textarea>
                </div>
              </div>
              <div class="add-todo" style="background-color: #042549; padding: 10px 10px;">
                <div v-if="!checkBacklog" class="add-add">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="addBacklog"
                    style="margin: 0;"
                  >Add Task</button>
                </div>
                <div v-else class="add-add-inside">
                  <button
                    type="button"
                    class="btn btn-success"
                    v-on:click.prevent="saveBacklog"
                    style="margin: 0;"
                  >Save</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="exitBacklog"
                    style="margin: 0;"
                  >Exit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- todo kanban -->
        <div class="col-sm-3">
          <div style="background-color: white;">
            <div class>
              <div class="cardHeader" style="background-color: #042549; padding: 0px;">
                <h5 class="card-title" style="margin: 0; color: white; padding: 15px 20px;">Todo</h5>
              </div>
              <div
                class="content-todo"
                style="
                      background-color: #edeef1;
                      overflow: scroll;
                      width: auto;
                      height: 480px;
                    "
              >
                <CardCategory
                  v-for="item in todoData"
                  :key="item.id"
                  :listTask="item"
                  :categoryTask="item.category"
                  @requestDelete="requestDelete"
                  @requestUpdate="requestUpdate"
                  @requestMove="requestMove"
                ></CardCategory>

                <div v-if="checkTodo" class="form-add-todo">
                  <textarea
                    v-model="valueAddTodo"
                    style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
                  ></textarea>
                </div>
              </div>
              <div class="add-todo" style="background-color: #042549; padding: 10px 10px;">
                <div v-if="!checkTodo" class="add-add">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="addTodo"
                    style="margin: 0;"
                  >Add Task</button>
                </div>
                <div v-else class="add-add-inside">
                  <button
                    type="button"
                    class="btn btn-success"
                    v-on:click.prevent="saveTodo"
                    style="margin: 0;"
                  >Save</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="exitTodo"
                    style="margin: 0;"
                  >Exit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- done kanban -->
        <div class="col-sm-3">
          <div style="background-color: white;">
            <div class>
              <div class="cardHeader" style="background-color: #042549; padding: 0px;">
                <h5 class="card-title" style="margin: 0; color: white; padding: 15px 20px;">Done</h5>
              </div>
              <div
                class="content-done"
                style="
                      background-color: #edeef1;
                      overflow: scroll;
                      width: auto;
                      height: 480px;
                    "
              >
                <CardCategory
                  v-for="item in doneData"
                  :key="item.id"
                  :listTask="item"
                  :categoryTask="item.category"
                  @requestDelete="requestDelete"
                  @requestUpdate="requestUpdate"
                  @requestMove="requestMove"
                ></CardCategory>
                <div v-if="checkDone" class="form-add-done">
                  <textarea
                    v-model="valueAddDone"
                    style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
                  ></textarea>
                </div>
              </div>
              <div class="add-done" style="background-color: #042549; padding: 10px 10px;">
                <div v-if="!checkDone" class="add-add">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="addDone"
                    style="margin: 0;"
                  >Add Task</button>
                </div>
                <div v-else class="add-add-inside">
                  <button
                    type="button"
                    class="btn btn-success"
                    v-on:click.prevent="saveDone"
                    style="margin: 0;"
                  >Save</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="exitDone"
                    style="margin: 0;"
                  >Exit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- completed kanban -->
        <div class="col-sm-3">
          <div style="background-color: white;">
            <div class>
              <div class="cardHeader" style="background-color: #042549; padding: 0px;">
                <h5
                  class="card-title"
                  style="margin: 0; color: white; padding: 15px 20px;"
                >Completed</h5>
              </div>
              <div
                class="content-completed"
                style="
                      background-color: #edeef1;
                      overflow: scroll;
                      width: auto;
                      height: 480px;
                    "
              >
                <CardCategory
                  v-for="item in completedData"
                  :key="item.id"
                  :listTask="item"
                  :categoryTask="item.category"
                  @requestDelete="requestDelete"
                  @requestUpdate="requestUpdate"
                  @requestMove="requestMove"
                ></CardCategory>
                <div v-if="checkCompleted" class="form-add-completed">
                  <textarea
                    v-model="valueAddCompleted"
                    style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
                  ></textarea>
                </div>
              </div>
              <div class="add-todo" style="background-color: #042549; padding: 10px 10px;">
                <div v-if="!checkCompleted" class="add-add">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="addCompleted"
                    style="margin: 0;"
                  >Add Task</button>
                </div>
                <div v-else class="add-add-inside">
                  <button
                    type="button"
                    class="btn btn-success"
                    v-on:click.prevent="saveCompleted"
                    style="margin: 0;"
                  >Save</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="exitCompleted"
                    style="margin: 0;"
                  >Exit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardCategory from "./CardCategory";
import formAdd from "./formAdd";
export default {
  props: ["collectData"],
  data() {
    return {
      // collectData: [],
      valueAddBacklog: "",
      valueAddTodo: "",
      valueAddDone: "",
      valueAddCompleted: "",
      checkBacklog: false,
      checkTodo: false,
      checkDone: false,
      checkUpdateDone: false,
      checkCompleted: false,
      checkUpdateCompleted: false
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
    addBacklog() {
      this.checkBacklog = true;
    },
    saveBacklog() {
      console.log("sssss");
      const Backlog = this.valueAddBacklog;
      const category = "Backlog";
      axios({
        method: "POST",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token },
        data: {
          title: Backlog,
          category: category
        }
      })
        .then(result => {
          console.log("ini result");
          this.checkBacklog = false;
          this.$emit("requestAdd", "success");
          swal("Succesfully Add!", "", "success");
          // this.getTask();
        })
        .catch(err => {
          console.log(err.response, "oomomo");
        });
    },
    exitBacklog() {
      this.checkBacklog = false;
    },
    exitEditBacklog() {
      this.checkUpdateBacklog = false;
    },
    addTodo() {
      this.checkTodo = true;
    },
    saveTodo() {
      const todo = this.valueAddTodo;
      const category = "Todo";
      axios({
        method: "POST",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token },
        data: {
          title: todo,
          category: category
        }
      })
        .then(result => {
          this.checkTodo = false;
          this.$emit("requestAdd", "success");
          swal("Succesfully Add!", "", "success");
          // this.getTask();
        })
        .catch(err => {});
    },
    exitTodo() {
      this.checkTodo = false;
    },
    addDone() {
      this.checkDone = true;
    },
    saveDone() {
      const done = this.valueAddDone;
      const category = "Done";
      axios({
        method: "POST",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token },
        data: {
          title: done,
          category: category
        }
      })
        .then(result => {
          this.checkDone = false;
          this.$emit("requestAdd", "success");
          swal("Succesfully Add!", "", "success");
          // this.getTask();
        })
        .catch(err => {});
    },
    exitDone() {
      this.checkDone = false;
    },

    addCompleted() {
      this.checkCompleted = true;
    },
    saveCompleted() {
      const completed = this.valueAddCompleted;
      const category = "Completed";
      axios({
        method: "POST",
        url: "https://lit-mountain-74451.herokuapp.com/tasks",
        headers: { access_token: localStorage.access_token },
        data: {
          title: completed,
          category: category
        }
      })
        .then(result => {
          this.checkCompleted = false;
          this.$emit("requestAdd", "success");
          swal("Succesfully Add!", "", "success");
          // this.getTask();
        })
        .catch(err => {});
    },
    exitCompleted() {
      this.checkCompleted = false;
    },
    filterData(category) {
      const filterData = [];
      for (let i = 0; i < this.collectData.length; i++) {
        if (this.collectData[i].category === category) {
          filterData.push(this.collectData[i]);
        }
      }
      return filterData;
    }
  },
  computed: {
    BacklogData() {
      console.log("Task");
      return this.filterData("Backlog");
    },
    todoData() {
      console.log("todo");
      return this.filterData("Todo");
    },
    doneData() {
      console.log("done");
      return this.filterData("Done");
    },
    completedData() {
      console.log("completed");
      return this.filterData("Completed");
    }
  },
  created() {},
  components: {
    CardCategory: CardCategory,
    formAdd: formAdd
  }
};
</script>

<style></style>

<template>
  <div>
    <div
      id="list-kanban"
      style="margin-top: 20px; justify-content: space-around;"
    >
      <div style="margin-left: 10px; margin-right: 10px;">
        <div class="row">
          <Card
            class="col-sm-3"
            v-for="data in getData"
            :key="data.name"
            :data="data"
            :collectData="collectData"
            @requestDelete="requestDelete"
            @requestUpdate="requestUpdate"
            @requestMove="requestMove"
            @requestAdd="requestAdd"
          ></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./CardCategory.vue";
import axios from "axios";
export default {
  props: ["collectData"],
  data() {
    return {};
  },
  methods: {
    requestAdd(params) {
      this.$emit("requestAdd", "success");
    },
    requestDelete(params) {
      this.$emit("requestDelete", "success");
    },
    requestUpdate(params) {
      this.$emit("requestUpdate", "success");
    },
    requestMove(params) {
      this.$emit("requestMove", "success");
    },
  },
  computed: {
    getData: function() {
      const data = [
        {
          name: "Backlog",
        },
        {
          name: "Todo",
        },
        {
          name: "Done",
        },
        {
          name: "Completed",
        },
      ];
      return data;
    },
  },
  created() {},
  components: {
    Card,
  },
};
</script>

<style></style>

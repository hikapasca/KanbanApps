<template>
  <div class="form-add">
    <textarea
      v-model="valueAdd"
      style="
                          background-color: white;
                          margin-left: 15px;
                          margin-top: 10px;
                          width: 300px;
                        "
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueAdd: "",
    };
  },
};
</script>

<style></style>

<template>
  <div class="text-center submitButton" v-ripple>
    <p
      @click="upload"
      style="color: white; font-size: 20px; font-weight: bold; margin-top: 20px;"
    >
      제출
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "recent"
    };
  },
  methods: {
    upload() {
      this.$emit("upload");
    }
  }
};
</script>

<style>
.submitButton {
  position: fixed;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 75px;
  background-color: #d00015;
}
</style>

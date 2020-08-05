<template>
  <div class="bottomNav">
    <v-bottom-navigation
      grow
      color="#d00015"
      height="75"
      background-color="white"
      light
    >
      <v-btn v-model="sirenNav" x-large retain-focus-on-click @click="siren">
        <span>사이렌</span>
        <v-icon>mdi-alarm-light</v-icon>
      </v-btn>

      <v-btn
        x-large
        retain-focus-on-click
        @click="toEmergency"
      >
        <span>긴급연락망</span>
        <v-icon>mdi-phone</v-icon>
      </v-btn>

      <v-btn
        v-model="flashNav"
        x-large
        retain-focus-on-click
        @click="flashlight"
      >
        <span>손전등</span>
        <v-icon>mdi-flashlight</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sirenNav: false,
      flashNav: false
    };
  },

  methods: {
    toEmergency() {
      this.$router.push("/emergency_contact");
    },

    siren() {
      window.Android.Siren();
    },

    flashlight() {
      window.Android.FlashLight();
    }
  }
};
</script>

<style>
.bottomNav {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

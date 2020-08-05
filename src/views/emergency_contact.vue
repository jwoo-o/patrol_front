<template>
  <div class="dailyPatrol">
    <b-container fluid>
      <b-row
        style="z-index: 100; background-color: white; 
        position: fixed; width: 100%; margin-left: -16px; 
        margin-right: -16px; text-align: center; height: 50px; 
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);"
      >
        <b-col cols="2">
          <div style="text-align: left;">
            <router-link to="/home" style="color: #d00015;font-size: 1.3rem;"
              ><b-icon-chevron-left
            /></router-link>
          </div>
        </b-col>
        <b-col cols="8">
          <div style="text-align: center;">
            <p style="font-weight: bold; font-size: 1.2rem;">긴급연락망</p>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <br />
      <br />
      <br />
      <b-row>
        <b-col style="text-align: center;">
          <p style="font-size: 1rem; font-weight: bold; margin-top: -10px;">
            <v-icon>mdi-alert-circle</v-icon>&#8203; &#8203; 우측 버튼 터치 시
            즉시 연결합니다
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="font-size: 1.3rem;">
          <p v-for="number in contactList" :key="number.phone" :value="number">
            <v-icon>mdi-account</v-icon> <b>{{ number.name }}</b
            >({{ number.phone }})<b-button
              @click="call(number.phone)"
              style="margin-top: -4px;float: right; background-color: #d00015; border: none;"
              >전화</b-button
            >
          </p>
        </b-col>
      </b-row>
    </b-container>
    <bottom_nav />
  </div>
</template>

<script>
export default {
  data() {
    return {
      contactList: JSON.parse(sessionStorage.tel)
    };
  },

  methods: {
    call(number) {
      window.open("tel:" + number, "_self");
      window.Android.EmergencyNetWork(number);
    }
  }
};
</script>

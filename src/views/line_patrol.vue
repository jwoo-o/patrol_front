<template>
  <div class="dailyPatrol">
    <b-container fluid>
      <!-- Top header / back button START -->
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
            <p style="font-weight: bold; font-size: 1.2rem;">정선순찰</p>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <br />
      <br />
      <br />
      <!-- Top header / back button END -->
      <b-row>
        <b-col style="text-align: center;">
          <div class="currentStop">
            <p style="margin-top: 20px; font-size: 2rem;"><b-icon-geo-alt /></p>
            <p style=" margin-top: -15px; font-weight: bold;">
              이번 순찰지점 ({{ currentIndex }}/{{ totalIndex }})
            </p>
            <p
              style="font-size: 1.3rem; font-weight: bold; margin-top: -15px; margin-bottom: 20px;"
            >
              {{ currentLocation }}
            </p>
          </div>
          <div class="nextStop">
            <p style="margin-top: 20px; font-weight: bold;">다음 순찰지점</p>
            <p
              style="font-size: 1.3rem; font-weight: bold; margin-top: -10px; margin-bottom: 20px;"
            >
              {{ nextLocation }}
            </p>
          </div>
        </b-col>
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col cols="6" style="text-align: right;">
          <b-button style="width: 90%; height: 60px;"
            ><b-icon-search />&#8203; 차량조회</b-button
          >
        </b-col>
        <b-col cols="6" style="text-align: left;">
          <b-button @click="toReport" style="width: 90%; height: 60px;"
            ><b-icon-pencil-square />&#8203; 보고</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" style="text-align: center;">
          <b-button @click="$bvModal.show('bv-modal-route')" style="width: 90%; height: 60px;"
            ><b-icon-list-ul />&#8203; 순찰루트 상세보기</b-button
          >

          <b-modal id="bv-modal-route" hide-footer>
              <template v-slot:modal-title>
                순찰루트
              </template>
              <div class="d-block text-center">
                <p style="font-size: 1.2rem;"><b>순찰루트를 확인해주십시오</b></p>
              </div>
              <div style="text-align: center; font-size: 1.2rem;">
                <ul style="list-style: none;">
                  <li v-for="x in currentPatrol" :key="x.idx">
                    {{ x.name }}
                  </li>
                </ul>
              </div>
              <b-button
                class="mt-3"
                style="border: none; background-color: #d00015;"
                block
                @click="$bvModal.hide('bv-modal-route')"
                >닫기</b-button
              >
            </b-modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" style="text-align: center;">
          <b-button variant="danger" disabled style="width: 90%; height: 60px;"
            >순찰종료</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <br />
    <br />
    <br />
    <br />
    <bottom_nav />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPatrol: JSON.parse(sessionStorage.currentPatrol),


      currentIndex: 1,
      currentLocation: JSON.parse(sessionStorage.currentPatrol)[0].name,
      nextIndex: 2,
      nextLocation: JSON.parse(sessionStorage.currentPatrol)[1].name,
      totalIndex: JSON.parse(sessionStorage.currentPatrol).length
    };
  },

  methods: {
    toReport() {
      sessionStorage.setItem("currentLocation", this.currentLocation);
      this.$router.push("/currentPatrol_report");
    }
  }
};
</script>

<style>
.currentStop {
  border: 1px solid #d00015;
  width: 90%;
  margin-left: 5%;
  color: white;
  background-color: #d00015;
}

.nextStop {
  border: 1px solid grey;
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  color: white;
  background-color: grey;
}
</style>

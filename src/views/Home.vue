<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col cols="6">
          <img
            class="logo"
            src="../assets/patrol_logo_only.png"
            alt="patrol"
            width="40"
            height="45"
          />
        </b-col>
        <b-col cols="6" style="text-align: right;">
          <b-button
            @click="$bvModal.show('bv-modal-9')"
            style="margin-top: 5px; background-color: white; color: grey; border: 1px solid grey; font-size: 0.8rem;"
            >순찰기록 최종제출 &#8203;<b-icon-box-arrow-right
          /></b-button>

          <b-modal id="bv-modal-9" hide-footer>
            <template v-slot:modal-title>
              순찰기록 최종제출
            </template>
            <div class="d-block text-center">
              <p>순찰기록을 제출하고 로그아웃 하시겠습니까?</p>
              <p style="font-size: 0.7rem;">
                * 통신상태가 불안정할 경우 증적자료가 손실될 수 있으니
                <br />
                통신 상태가 원활한 곳에서 로그아웃 해주십시오.
              </p>
            </div>
            <b-button
              @click="logout"
              class="mt-3"
              style="border: none; background-color: #d00015;"
              block
              >순찰기록 최종제출</b-button
            >
          </b-modal>
        </b-col>
      </b-row>
      <br />
      <br />
      <b-row>
        <div style="margin-top: 50px; margin-left: 30px;">
          <p style="font-size: 1.1rem;">안녕하세요, {{ username }} 순찰자님</p>
          <h3 style="font-weight: bold; margin-top: -15px; font-size: 1.7rem;">
            업무를 선택해주십시오
          </h3>
        </div>
      </b-row>
      <br />
      <b-row>
        <b-col cols="6">
          <div class="menu-btn1">
            <b-button
              variant="danger"
              @click="$bvModal.show('bv-modal-2')"
              style="background-color: #d00015; margin-right: -10px; width: 95%; height: 125px; color: white; font-weight: bold;"
              ><b-icon-arrow-down-up /><br />정선순찰
            </b-button>

            <!-- <b-modal id="bv-modal-1" hide-footer>
              <template v-slot:modal-title>
                정선순찰
              </template>
              <div class="d-block text-center">
                <p>아래 버튼을 터치하여 순찰루트를 정해주십시오</p>
              </div>
              <b-button
                class="mt-3"
                style="border: none; background-color: #d00015;"
                block
                @click="$bvModal.show('bv-modal-2')"
                >순찰시작</b-button
              >
            </b-modal> -->

            <b-modal id="bv-modal-2" hide-footer>
              <template v-slot:modal-title>
                정선순찰
              </template>
              <div class="d-block text-center">
                <p style="font-size: 1.2rem;"><b>순찰루트를 선택해주십시오</b></p>
              </div>
              <div style="display: flex; flex: 1;">
                <b-button
                  v-for="item in allRoutes"
                  :key="item.routeCode"
                  :value="item"
                  class="mt-3"
                  style="border: none; background-color: #d00015; margin-right: 5px; margin-left: 5px;"
                  block
                  @click="showRoute(item)"
                  >{{ item.routeName }}</b-button
                >
              </div>
            </b-modal>

            <b-modal id="bv-modal-3" hide-footer>
              <template v-slot:modal-title>
                정선순찰
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
                @click="toLinePatrol"
                >순찰시작</b-button
              >
            </b-modal>
          </div>
        </b-col>
        <b-col cols="6">
          <div class="menu-btn2">
            <router-link
              to="/daily_patrol"
              style="font-weight: bold; color: white;"
              ><b-button
                variant="danger"
                style="background-color: #d00015; margin-left: -10px; width: 95%; height: 125px; color: white; font-weight: bold;"
                ><b-icon-eye-fill /><br />일상순찰</b-button
              ></router-link
            >
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="menu-btn3">
            <router-link to="/search_car"
              ><b-button
                variant="light"
                style="font-weight: bold; width: 90%; height: 60px; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);"
                ><b-icon-search />&#8203; 차량조회</b-button
              ></router-link
            >
          </div>
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
  name: "Home",
  data() {
    return {
      username: sessionStorage.getItem("name"),
      allRoutes: JSON.parse(sessionStorage.routeDef),
      currentPatrol: []
    };
  },

  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },

    showRoute(item) {
      // alert(JSON.stringify(item.route))
      this.currentPatrol = item.route;
      sessionStorage.setItem("currentPatrol", JSON.stringify(item.route));
      this.$bvModal.show("bv-modal-3");
    },

    toLinePatrol() {
      this.$router.push("/line_patrol");
    }
  }
};
</script>

<style>
.menu-btn1 {
  text-align: right;
}

.menu-btn2 {
  text-align: left;
}

.menu-btn3 {
  text-align: center;
}

/* .home {
  margin-bottom: 75px;
} */
</style>

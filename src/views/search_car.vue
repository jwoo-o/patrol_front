<template>
  <div class="searchCar">
    <b-container fluid>
      <b-row
        style="z-index: 100; background-color: white; 
        position: fixed; width: 100%; margin-left: -16px; 
        margin-right: -16px; text-align: center; height: 50px; 
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);"
      >
        <b-col cols="2">
          <div style="text-align: left;">
            <router-link to="/home" style="color: #d00015; font-size: 1.3rem;"
              ><b-icon-chevron-left
            /></router-link>
          </div>
        </b-col>
        <b-col cols="8">
          <div style="text-align: center;">
            <p style="font-weight: bold; font-size: 1.2rem;">차량조회</p>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <br />
      <br />
      <br />
      <b-row>
        <div style="width: 90%; margin-left: 5%; margin-top: 10px;">
          <p style="font-weight: bold; font-size: 0.9rem;">
            차량번호
          </p>
          <v-text-field
            v-model="carNumText"
            id="carNum"
            placeholder="상세번호를 입력해주십시오 ex) 38누1234"
            style="margin-top: -20px;"
          ></v-text-field>
        </div>
      </b-row>
      <b-row>
        <b-col cols="7">
          <div class="searchButton">
            <b-button
              @click="search"
              style="width:100%; height: 50px; margin-right: -10px; 
                  background-color: #d00015; border: none; font-weight: bold;"
              >차량번호 조회</b-button
            >
          </div>
        </b-col>
        <b-col cols="5">
          <div class="scanButton">
            <b-button
              @click="ocrCam"
              style="width:100%; height: 50px; margin-left: -10px; border: none; 
                  font-weight: bold;"
              >카메라 인식</b-button
            >
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <div
            style="border: 1px solid lightgrey; text-align: center; width: 95%; margin-left: 2.5%"
          >
            <p style="margin-top: 40px; font-size: 1rem;">차량조회 결과</p>
            <p
              style="margin-top: -5px; margin-bottom: 40px; font-size: 1.2rem; font-weight: bold;"
            >
              {{ message }}
            </p>

            <v-container fluid style="margin-top: -50px; font-weight: bold;">
              <v-radio-group v-model="carSelection" :mandatory="false">
                <v-radio
                  v-for="car in allCars"
                  :key="car.carNum"
                  :value="car"
                  :label="car.carNum + ' ' + '(' + car.aptAddr + ')'"
                  color="#d00015"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div
            style="margin-top:-25px; text-align: center; width: 95%; margin-left: 2.5%; background-color: #6e757c; color: white;"
          >
            <b-button
              @click="submitReport"
              style="width: 100%; height: 50px; font-weight: bold;"
              variant="danger"
              >조치결과 작성</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <bottom_nav />
  </div>
</template>

<script>
import requestServerApi from "../utils/request";

export default {
  data() {
    return {
      carNumText: "",
      message: "차량번호를 조회해주십시오.",
      allCars: [],
      carSelection: ""
    };
  },

  methods: {
    search() {
     /* let config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      };*/

      requestServerApi
        .get(
          "/api/parking/car/" + this.carNumText
        )
        .then(result => {
          if (JSON.stringify(result.data) == "[]") {
            // alert("차량번호 없음: 다시 확인해 주십시오.");
            this.message = "등록되지 않은 차량입니다";

            this.allCars = [];

            sessionStorage.setItem("carNum", this.carNum);
            sessionStorage.setItem("carExist", false);
          } else {
            // alert(JSON.stringify(result.data.data));
            // this.message = result.data.data[0].carNum;
            // this.message2 = result.data.data[0].aptAddr;
            this.message = "차량을 선택해주십시오";

            this.allCars = result.data;

            sessionStorage.setItem("carExist", true);
          }
        }).catch(error=>{
        alert(error.message);
      });
    },

    submitReport() {
      if (!sessionStorage.carExist) {
        alert("차량번호를 입력해주십시오");
      } else {
        if (sessionStorage.carExist == "true") {
          sessionStorage.setItem("carNum", this.carSelection.carNum);
          sessionStorage.setItem(
            "currentCar",
            JSON.stringify(this.carSelection)
          );

          if (this.carSelection == "") {
            alert("차량번호를 선택해주십시오");
          } else {
            this.$router.push("/car_report_exist");
          }
        }
        if (sessionStorage.carExist == "false") {
          this.$router.push("/car_report_new");
        }
      }
    },

    ocrCam() {
      window.Android.OCRCamera();
    }
  }
};
</script>

<style>
.searchButton {
  text-align: right;
  font-weight: bold;
  color: white;
}

.scanButton {
  text-align: left;
  font-weight: bold;
  color: white;
}
</style>

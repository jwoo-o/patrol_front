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
            <p @click="backBtn" style="color: #d00015; font-size: 1.3rem;">
              <b-icon-chevron-left />
            </p>
          </div>
        </b-col>
        <b-col cols="8">
          <div style="text-align: center;">
            <p style="font-weight: bold; font-size: 1.2rem;">
              차량조회(조치결과작성)
            </p>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <br />
      <br />
      <br />
      <b-row>
        <b-col cols="12" style="text-align: center;">
          <div style="border: 1px solid black; width: 90%; margin-left: 5%;">
            <p style="font-weight: bold; font-size: 1.5rem; margin-top: 30px;">
              {{ carNum }}
            </p>
            <p
              style="color: #d00015; font-weight: bold; margin-top: -15px; margin-bottom: 30px;"
            >
              등록된 차량입니다
            </p>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <div style="width: 90%; margin-left: 5%; margin-top: -10px;">
            <p style="font-weight: bold;">현재 상태가 어떻습니까? (조치사항)</p>
            <br>
            <v-checkbox
                v-for="item in parkingOptions"
                :key="item.statusIdx"
                :label="item.name"
                :value="item"
                style="margin-top: -15px;"
                color="#d00015"
                v-model="checkedItems"
            ></v-checkbox>
            <v-checkbox
              v-model="chkEtc"
              :label="'기타(직접입력)'"
              style="font-weight: bold; margin-top: -15px;"
              true-value="1"
              false-value="0"
              color="#d00015"
            ></v-checkbox>
            <v-text-field
              v-model="editChkEtc"
              placeholder="내용을 입력하십시오"
              style="margin-top: -70px; margin-left: 140px;"
            ></v-text-field>
          </div>
          <div style="width: 90%; margin-left: 5%;">
            <p style="font-weight: bold; margin-top: 20px;">증적자료 첨부</p>
            <p style="font-size: 0.8rem; margin-top: -15px;">
              카메라 아이콘을 터치하여 사진을 촬영하십시오
            </p>
          </div>
          <div class="filebox">
            <label for="car_file1"
              ><img :src="car_file1" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="car_file1"
              name="uploadfiles"
              @change="readUrl1"
              accept="image/*"
              capture="camera"
            />
          </div>
          <div class="filebox">
            <label for="car_file2"
              ><img :src="car_file2" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="car_file2"
              name="uploadfiles"
              @change="readUrl2"
              accept="image/*"
              capture="camera"
            />
          </div>
          <div class="filebox">
            <label for="car_file3"
              ><img :src="car_file3" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="car_file3"
              name="uploadfiles"
              @change="readUrl3"
              accept="image/*"
              capture="camera"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <submit_button @upload="upload" />
  </div>
</template>

<script>
import requestServerApi from "../utils/request";

export default {
  data() {
    return {
      parkingOptions: JSON.parse(sessionStorage.parking),
      checkedItems: [],

      carNum: sessionStorage.carNum,
      chkEtc: 0,
      editChkEtc: "",
      car_file1: "/img/camera.png",
      car_file2: "/img/camera.png",
      car_file3: "/img/camera.png"
    };
  },

  methods: {
    backBtn() {
      sessionStorage.removeItem("carNum");
      sessionStorage.removeItem("carExist");
      sessionStorage.removeItem("currentCar");
      this.$router.push("/search_car");
    },

    readUrl1(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.car_file1 = URL.createObjectURL(file);
      } else {
        this.car_file1 = "/img/camera.png";
      }
    },
    readUrl2(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.car_file2 = URL.createObjectURL(file);
      } else {
        this.car_file2 = "/img/camera.png";
      }
    },
    readUrl3(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.car_file3 = URL.createObjectURL(file);
      } else {
        this.car_file3 = "/img/camera.png";
      }
    },
    upload() {
      let form = new FormData();
      form.append("carNum", sessionStorage.carNum);
      form.append("carRegistered", 1);
      form.append("uploadFiles", document.getElementById("car_file1").files[0]);
      form.append("uploadFiles", document.getElementById("car_file2").files[0]);
      form.append("uploadFiles", document.getElementById("car_file3").files[0]);
      form.append("status", JSON.stringify(this.checkedItems));
      form.append("chkEtc", this.chkEtc);
      form.append("editChkEtc", this.editChkEtc);
      form.append("name", sessionStorage.name);
      let config = {
        headers: {
          "Content-Type": "multipart/from-data"
        }
      };
      requestServerApi
        .post(
          "/api/parking/car",
          form,config
          // eslint-disable-next-line no-unused-vars
        )
        .then(result => {
          alert("등록 성공(" + result.data + ")");
          this.$router.replace("/home");
        });
    }
  }
};
</script>
<style>
.filebox label {
  padding: 0.5em 0.75em;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0.25em;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  margin-left: 5%;
  border: 1px solid black;
  float: left;
  width: 27%;
  text-align: center;
}

.filebox input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>

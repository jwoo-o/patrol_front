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
            <router-link
              to="/line_patrol"
              style="color: #d00015;font-size: 1.3rem;"
              ><b-icon-chevron-left
            /></router-link>
          </div>
        </b-col>
        <b-col cols="8">
          <div style="text-align: center;">
            <p style="font-weight: bold; font-size: 1.2rem;">일상순찰</p>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <br />
      <br />
      <br />
      <!-- Top header / back button END -->
      <b-row>
        <b-col cols="12">
          <div style="width: 90%; margin-left: 5%; margin-top: 10px;">
            <p style="font-weight: bold; font-size: 0.9rem;">
              순찰지점
            </p>
            <p>{{ currentLocation }}</p>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <div style="width: 90%; margin-left: 5%;">
            <p style="font-weight: bold; font-size: 0.9rem;">
              현재 상태가 어떻습니까? (조치사항)
            </p>
            <v-container fluid>
              <v-checkbox
                v-model="noProblem"
                @change="changeCheckbox"
                :label="'이상없음'"
                style="margin-top: -20px; font-weight: bold;"
                color="#d00015"
              ></v-checkbox>
              <v-checkbox
                v-for="item in patrolStorage"
                :key="item.statusIdx"
                :label="item.name"
                :value="item"
                style="margin-top: -20px;"
                color="#d00015"
                v-model="checkedItems"
                @change="changeCheckbox"
              ></v-checkbox>
              <v-checkbox
                v-model="checkedItems"
                :label="'기타 (직접입력)'"
                :value="99"
                style="margin-top: -20px;"
                color="#d00015"
                @change="changeCheckbox"
              ></v-checkbox>
              <v-text-field
                placeholder="기타사유 입력"
                style="margin-top: -70px; margin-left: 150px;"
              ></v-text-field>
            </v-container>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <div style="width: 90%; margin-left: 5%;">
            <p style="font-weight: bold; font-size: 0.9rem;">
              사진/동영상 첨부
            </p>
            <p
              style="font-weight: bold; font-size: 0.7rem; color: grey; margin-top: -15px;"
            >
              카메라 아이콘을 터치하여 사진/동영상을 촬영하십시오
            </p>
          </div>
          <div class="filebox">
            <label for="patrol_file1"
              ><img :src="patrol_file1" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="patrol_file1"
              name="uploadfiles"
              @change="readUrl1"
              accept="image/*"
              capture="camera"
            />
          </div>
          <div class="filebox">
            <label for="patrol_file2"
              ><img :src="patrol_file2" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="patrol_file2"
              name="uploadfiles"
              @change="readUrl2"
              accept="image/*"
              capture="camera"
            />
          </div>
          <div class="filebox">
            <label for="patrol_file3"
              ><img :src="patrol_file3" style="height: 50px;"
            /></label>
            <input
              type="file"
              id="patrol_file3"
              name="uploadfiles"
              @change="readUrl3"
              accept="image/*"
              capture="camera"
            />
          </div>
          <br />
          <div style="width: 90%; margin-left: 5%;">
            <v-checkbox
              v-model="checkbox6"
              :label="'촬영불가'"
              style="font-weight: bold; float: left;"
              color="#d00015"
            ></v-checkbox>
            <v-text-field
              placeholder="촬영불가사유를 입력하십시오"
            ></v-text-field>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row> </b-row>
    </b-container>
    <br />
    <br />
    <br />
    <br />
    <submit_button />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLocation: sessionStorage.currentLocation,
      noProblem: false,
      checkbox6: false,
      patrol_file1: "/img/camera.png",
      patrol_file2: "/img/camera.png",
      patrol_file3: "/img/camera.png",

      patrolStorage: JSON.parse(sessionStorage.patrol),

      checkedItems: []
    };
  },

  methods: {
    changeCheckbox(e) {
      if (typeof e == "boolean") {
        if (e == true) {
          this.checkedItems = [];
        }
      } else {
        this.noProblem = false;
      }
    },

    readUrl1(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.patrol_file1 = URL.createObjectURL(file);
      } else {
        this.patrol_file1 = "/img/camera.png";
      }
    },
    readUrl2(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.patrol_file2 = URL.createObjectURL(file);
      } else {
        this.patrol_file2 = "/img/camera.png";
      }
    },
    readUrl3(e) {
      const file = e.target.files[0];
      if (file != undefined) {
        this.patrol_file3 = URL.createObjectURL(file);
      } else {
        this.patrol_file3 = "/img/camera.png";
      }
    },
    upload() {
      let form = new FormData();
      form.append("carNum", sessionStorage.carNum);
      form.append("carRegistered", 1);
      form.append(
        "uploadFiles",
        document.getElementById("patrol_file1").files[0]
      );
      form.append(
        "uploadFiles",
        document.getElementById("patrol_file2").files[0]
      );
      form.append(
        "uploadFiles",
        document.getElementById("patrol_file3").files[0]
      );
      form.append("chkSticker", this.chkSticker);
      form.append("chkEtc", this.chkEtc);
      form.append("editChkEtc", this.editChkEtc);
      form.append("name", sessionStorage.name);
      let config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "multipart/from-data"
        }
      };
      this.$http
        .post(
          "http://10.10.20.47:8090/api/parking/car",
          form,
          config
          // eslint-disable-next-line no-unused-vars
        )
        .then(result => {
          alert("등록 성공(" + result.data.data + ")");
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

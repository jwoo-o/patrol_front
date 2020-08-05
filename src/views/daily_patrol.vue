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
              순찰지점이 어디입니까?
            </p>
            <v-text-field
              v-model="dailyPatrolLocation"
              placeholder="ex) 서초래미안 105동 놀이터"
              style="margin-top: -20px;"
            ></v-text-field>
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
                v-model="chkNoProblem"
                @change="changeCheckbox"
                :label="'이상없음'"
                style="margin-top: -20px; font-weight: bold;"
                color="#d00015"
                true-value="1"
                false-value="0"
              ></v-checkbox>
              <v-checkbox
                v-for="item in patrolOptions"
                :key="item.statusIdx"
                :label="item.name"
                :value="item"
                style="margin-top: -20px;"
                color="#d00015"
                v-model="checkedItems"
                @change="changeCheckbox"
              ></v-checkbox>
              <v-checkbox
                v-model="chkEtc"
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
              v-model="chkCannotCapture"
              :label="'촬영불가'"
              style="font-weight: bold; float: left;"
              color="#d00015"
              true-value="1"
              false-value="0"
            ></v-checkbox>
            <v-text-field
              placeholder="촬영불가사유를 입력하십시오"
              v-model="editChkCannotCapture"
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
    <submit_button @upload="upload"/>
  </div>
</template>

<script>
import requestServerApi from "../utils/request";

export default {
  data() {
    return {
      dailyPatrolLocation: "",
      chkNoProblem: 0,
      patrol_file1: "/img/camera.png",
      patrol_file2: "/img/camera.png",
      patrol_file3: "/img/camera.png",
      chkCannotCapture : "",
      editChkCannotCapture : "",
      editChkEtc:"",
      chkEtc:"",
      patrolOptions: JSON.parse(sessionStorage.patrol),

      checkedItems: []
    };
  },

  methods: {
    changeCheckbox(e) {

      if (typeof e == "string") {
        if (e == 1) {
          this.checkedItems = [];
          this.chkEtc = false;
        }
      } else {
        this.chkNoProblem = 0;
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
      if(this.chkEtc){
        this.chkEtc = 1
      }else{
        this.chkEtc = 0
      }

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
      form.append("chkNoProblem", Number(this.chkNoProblem));
      form.append("chkEtc", Number(this.chkEtc));
      form.append("editChkEtc", this.editChkEtc);
      form.append("chkCannotCapture", Number(this.chkCannotCapture));
      form.append("editChkCannotCapture", this.editChkCannotCapture);
      form.append("status", JSON.stringify(this.checkedItems));
      form.append("routeName",this.dailyPatrolLocation)
      let config = {
        headers: {
          "Content-Type": "multipart/from-data"
        }
      };
     requestServerApi
        .post(
          "/api/patrol/log",
          form,
          config
          // eslint-disable-next-line no-unused-vars
        )
        .then(
                result => {
                    alert("등록 성공(" + result.data + ")");
                    this.$router.replace("/home");


        }).catch(error=>{
          alert(error.message);
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

<template>
  <div class="page" data-app>
    <b-container>
      <b-row>
        <b-col cols="12" style="margin-top: 0;text-align: center;">
          <img
            class="patrolLogo"
            src="../assets/logo_letters2.png"
            alt="patrol"
            width="200"
            height="150"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" style="margin-top: 20px;">
          <form>
            <v-text-field
              v-model="siteCode"
              :error-messages="siteCodeErrors"
              label="현장코드"
              required
              @input="$v.siteCode.$touch()"
              @blur="$v.siteCode.$touch()"
              style="color: #d00015; width: 70%; margin-left: 3%; float: left;"
            ></v-text-field>
            <v-btn
              @click="auth"
              style="background-color: #d00015; float: right; margin-right: 3%; color: white; margin-top:10px; font-weight: bold;"
              >인증</v-btn
            >
            <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="순찰자명"
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              required
              return-object
              item-text="name"
              item-value="ptrlId"
              style="color: #d00015; margin-left: 3%; width: 94%"
            ></v-select>

            <div class="loginButtons">
              <v-btn
                class="mr-4"
                @click="submit"
                style="background-color: #d00015; color: white; font-weight: bold;"
                >&#8203; &#8203; &#8203; &#8203;로그인&#8203; &#8203; &#8203;
                &#8203;</v-btn
              >
              <v-btn @click="clear">입력초기화</v-btn>
            </div>
          </form>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          style="text-align: center; color: grey; margin-top: 20px;"
        >
          <div class="warningMessage">
            <p>
              *조은세이프 재직자가 아닌 사람이 본 앱을 사용시
              <br />
              민형사상의 처벌을 받을 수 있습니다.
              <br />
              퇴사자는 반드시 본 앱을 즉시 삭제하여야 합니다.
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" style="text-align: center; margin-top: -40px;">
          <img
            class="safe1logo"
            src="../assets/safe1_logo.png"
            alt="safe1"
            width="180"
            height="100"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import requestServerApi from "../utils/request";

export default {
  mixins: [validationMixin],

  validations: {
    siteCode: { required },
    select: { required }
  },

  data: () => ({
    siteCode: "",
    select: null,
    items: [],
    name: "",
    phone: "",
    ptrlId: ""
  }),

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("순찰자명을 선택하십시오.");
      return errors;
    },
    siteCodeErrors() {
      const errors = [];
      if (!this.$v.siteCode.$dirty) return errors;
      !this.$v.siteCode.required && errors.push("현장코드를 입력하십시오.");
      return errors;
    }
  },

  methods: {
    submit() {
      let url = "/api/client/patroller/login";
      let userInfo = {
        ptrlId: this.select.ptrlId,
        siteCode: this.select.siteCode
      };

      // alert(userInfo)

        requestServerApi.post(url, userInfo).then(result => {
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("refreshToken", result.data.refreshToken);
        sessionStorage.setItem("name", this.select.name);
        sessionStorage.setItem("phone", this.select.phone);
        sessionStorage.setItem("ptrlId", this.select.ptrlId);
        sessionStorage.setItem("siteCode", this.select.siteCode);
        sessionStorage.setItem(
          "patrol",
          JSON.stringify(result.data.patrol)
        );
        sessionStorage.setItem(
          "parking",
          JSON.stringify(result.data.parking)
        );
        sessionStorage.setItem(
          "routeDef",
          JSON.stringify(result.data.routeDef)
        );
        sessionStorage.setItem("tel", JSON.stringify(result.data.tel));

        this.$router.replace("/home");
      }).catch(error=>{
          alert(error.message);
        });
    },
    clear() {
      this.$v.$reset();
      this.siteCode = "";
      this.select = null;
    },
    auth() {
      let url = "/api/client/patroller/" + this.siteCode;

      requestServerApi.get(url).then(result => {
        this.items = result.data;

        // alert(JSON.stringify(result.data.data))

        if (JSON.stringify(result.data) == "[]") {
          alert("인증실패: 현장코드를 다시 입력해주십시오.");
        } else {
          alert("인증되었습니다.");
        }
      }).catch(error=>{
        alert(error.message);
      });
    }
  }
};
</script>

<style>
.loginButtons {
  margin-top: 20px;
  text-align: center;
}
</style>

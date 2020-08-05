import axios from 'axios'
import router from "../router";

const requestServerApi = axios.create();

requestServerApi.defaults.baseURL = "http://10.10.20.147:8090"


requestServerApi.interceptors.request.use(
    config =>{
      const token = sessionStorage.getItem("token");

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
)

requestServerApi.interceptors.response.use(
    response =>{
      return response.data;
    },
    error => {
      const config = error;

      let isAlreadyFetchingAccessToken = false;
      let subscribers = [];

      function onAccessTokenFetched(accessToken) {
        subscribers = subscribers.filter(callback => callback(accessToken));
      }

      function addSubscriber(callback) {
        subscribers.push(callback);
      }

      const id = sessionStorage.getItem("ptrlId");
      const refreshToken = sessionStorage.getItem("refreshToken");
      const type = 'user'
      const isLoginUrl = config.message.includes("401")


      if(isLoginUrl){
        if(!isAlreadyFetchingAccessToken){
          isAlreadyFetchingAccessToken = true;

          axios({
            method:'post',
            url: `http://10.10.20.147:8090/api/ouath/token`,
            data:{
              id,
              refreshToken,
              type
            }
          }).then(
              response =>{
                const responseData = response.data;
                const token = responseData.data;
                sessionStorage.setItem("token",token);
                isAlreadyFetchingAccessToken = false;
                onAccessTokenFetched(token);
              },
              // eslint-disable-next-line no-unused-vars
              error =>{
                isAlreadyFetchingAccessToken = false;
                sessionStorage.clear();
                alert("로그인이 만료되었습니다.");
                router.replace("/")
              }
          )
        }
        const retryOriginalRequest = new Promise(resolve => {

          addSubscriber(token => {
            config.config.headers.Authorization = `Bearer ${token}`;

            resolve(requestServerApi(config.config));
          });
        });

        return retryOriginalRequest;
      }
        return Promise.reject(error.response.data);
    }
)
export default requestServerApi;

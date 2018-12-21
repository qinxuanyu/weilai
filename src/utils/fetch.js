/**
 * Created by qin on 2018/8/8.
 */

// import Vue from "vue";
import Vue from 'vue';
import axios from "axios";
import store from "@/store";
import tool from "@/utils/tool";
import  { ToastPlugin } from "vux";
import router from "@/router";

Vue.use(ToastPlugin);

const baseURL = "/plant_api";

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "platform": "web",
    },
    withCredentials: true, 
    credentials: 'same-origin',   
});

// request拦截器
service.interceptors.request.use(
    config => {
        store.commit("UPDATE_LOADING", true);
        config.method = config.method.toLowerCase();
       
        if (store.getters.token ) {
            config.headers['token'] = store.getters.token || "";
            config.headers['userId'] = store.getters.userId || "";
        }

        if (config.data) {
            let params = config.url.match(/(\{[^{}]+\})/g);
            if (params && params.length) {
                params.forEach(item => {
                    let key = item.replace(/(\{|\})/g, "");
                    let regx = new RegExp("\{" + key +"\}", "g");
                    config.url = config.url.replace(regx, tool.utils.isUndefined(config.data[key]) ? "" : config.data[key]);
                    delete config.data[key];
                })
            }

            if (config.method === "get") {
                config.url = tool.utils.setUrlParam(config.data, config.url);
            } else if (["post", "put"].indexOf(config.method) !== -1 ) {
                if (config.headers["Content-Type"] && config.headers["Content-Type"].toLowerCase() !== "multipart/form-data") {
                    config.data = JSON.stringify(config.data);
                }                
            }
        }

        return config;
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        store.commit("UPDATE_LOADING", false);
        if (response.status === 200 ) {
            // return Promise.resolve(response.data.data);
            if (response.data.code === 200) {
                return Promise.resolve(response.data.data);
            } else {
                return Promise.reject(response);
                // Vue.$vux.toast.show({
                //     text: response.data.msg || "服务器内部错误",
                //     type: "warn",
                //     width: "10em",
                //     position: "middle"
                // });
            }
        } else {
            Vue.$vux.toast.show({
                text: response.status,
                type: "warn",
                width: "10em",
                position: "middle"
            });
        }

        return Promise.reject(response);
    },
    error => {
        store.commit("UPDATE_LOADING", false);
        if(error.response.status == 401 || error.response.status == 403){
            
            store.dispatch("LOGOUT");
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd808625986ae581&redirect_uri=http%3a%2f%2fwsyc.xiongangs.com%2f%23%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
        
       
        Vue.$vux.toast.show({
            text: error.status,
            type: "warn",
            width: "10em",
            position: "middle"
        });
        return Promise.reject(error)
    }
);

export default service;

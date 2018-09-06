/**
 * Created by liangzc on 2017/11/14.
 */

import tool from "@/utils/tool";
import  api  from "@/api";

const user = {
    state: {
        token: "",
        id: "",
        info: "",
    },
    getters:{},
    mutations: {
        SET_TOKEN(state, token) {
            if (token) {
                tool.local.set("token", token);
                // tool.session.set("tokenExpireDate", new Date().getTime() + 7 * 86400000);
            } else {
                tool.local.clear("token");
            }

            state.token = token;
        },
        SET_USER_ID(state, userId) {
            if (userId) {
                tool.local.set("userId", userId);
            } else {
                tool.local.clear("userId");
            }

            state.id = userId;
        },
        SET_USER_INFO(state, info) {
            if (info) {
                tool.local.set("userInfo", JSON.stringify(info));
            } else {
                tool.local.clear("userInfo");
            }

            state.info = info;
        },
    },
    actions: {
        LOGIN_SUCCESS(store, data) {
            if (data) {
                store.commit("SET_TOKEN", data.token);
                store.commit("SET_USER_ID", data.userId);
                store.dispatch("GET_INFO");
            }
        },
        LOGOUT(store) {
            store.commit("SET_TOKEN", "");
            store.commit("SET_USER_ID", "");
            store.commit("SET_USER_INFO", "");
            tool.local.clear('isAuth');
            tool.local.clear("tokenExpireDate");
        },
        GET_SESSION_TOKEN(store) {
            let token = tool.local.get("token");
            let userId = tool.local.get("userId");
            let userInfo = tool.local.get("userInfo");
            let expireDate = tool.local.get("tokenExpireDate");
            let today = new Date().getTime();

            // if (token && userId && expireDate && expireDate > today) {
            //     userInfo = JSON.parse(userInfo);
            // } else {
            //     token = "";
            //     userId = "";
            //     userInfo = "";
            // }

            store.commit("SET_TOKEN", token);
            store.commit("SET_USER_ID", userId);
            store.commit("SET_USER_INFO", userInfo);
        },
        GET_INFO(store) {
            api.getInfo().then(data => {
                store.commit("SET_USER_INFO", data);
            })
        },
        UPDATE_INFO(store, data) {
            return new Promise((resolve, reject) => {
                // api.updateInfo(data).then(data => {
                //     store.dispatch("GET_INFO");
                //     resolve(data);
                // }).catch(error => {
                //     reject(error);
                // })
            });
        }
    }
}
export default user;

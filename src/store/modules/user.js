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
    mutations: {
        SET_TOKEN(state, token) {
            if (token) {
                tool.session.set("token", token);
                // tool.session.set("tokenExpireDate", new Date().getTime() + 7 * 86400000);
            } else {
                tool.session.clear("token");
            }

            state.token = token;
        },
        SET_USER_ID(state, userId) {
            if (userId) {
                tool.session.set("userId", userId);
            } else {
                tool.session.clear("userId");
            }

            state.id = userId;
        },
        SET_USER_INFO(state, info) {
            if (info) {
                tool.session.set("userInfo", JSON.stringify(info));
            } else {
                tool.session.clear("userInfo");
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
            tool.session.clear("tokenExpireDate");
        },
        GET_SESSION_TOKEN(store) {
            let token = tool.session.get("token");
            let userId = tool.session.get("userId");
            let userInfo = tool.session.get("userInfo");
            let expireDate = tool.session.get("tokenExpireDate");
            let today = new Date().getTime();

            if (token && userId && expireDate && expireDate > today) {
                userInfo = JSON.parse(userInfo);
            } else {
                token = "";
                userId = "";
                userInfo = "";
            }

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

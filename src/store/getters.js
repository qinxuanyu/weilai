/**
 * Created by liangzc on 2017/11/27.
 */

const getters = {
    token: state => state.user.token,
    userId: state => state.user.id,
    userInfo: state => state.user.info,
};

export default getters;

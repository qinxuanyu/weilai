import fetch from '@/utils/fetch';
export default {
    homeData (){
        return fetch({
            url:'/user/homeList',
            method:'get'
        })
    }
}
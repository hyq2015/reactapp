/**
 * Created by Administrator on 2017/3/23.
 */
let _ =require('lodash');
let queryString = require('query-string');
import 'whatwg-fetch';
var CONFIG={
  'baseUrl':"/alpha",
  'alphaPath':{
  "saveAddress":"/api/user/saveshippingaddr",
  "currentUserAddressList":"/api/user/userIndexInfo",
  "deleteAddress":"/api/user/delshippingaddr/",
  "themeDetail":"/api/app/detail/theme?id=",
  "deleteOrder":"/api/order/delete/",
  "checkUserAddress":"/api/user/userShippingaddrList",
  "orderDetail":"/api/order/",
  "generateOrder":"/api/pay/chargeForOrder",
  "buildOrder":"/api/order/buildFromShoppingCardItems",
  "updateShopCar":"/api/shoppingCart/update",
  "currentShopCar":"/api/shoppingCart/current",
  "userDetail":"/api/user/detail/",
  "addressDetail":"/api/user/address/",
  "confirmOrder":"/api/order/create",
  "searchThings":"/api/app/index/search",
  "queryProduct":"/api/product/query",
  "queryArticle":"/api/article/query",
  "queryShop":"/api/shop/query",
  "indexData":"/api/app/index/data",
  "findnearby":"/api/shop/findNearbyShop",
  "userIndexinfo":"/api/user/userIndexInfo",
  "mallInfo":"/api/app/index/mall/query",
  "allorder":"/api/order/query",
  "allcard":"/api/card/query",
  "hotsearch":"/api/app/index/config",
  "userlogin":"/api/wechat/user"
  },
  'CurrentVersion':'developversion/',
  'pageSize':10,
  'http':{
    get:function (url,params) {
      let hasKey=false;
      for(let key in params){
        hasKey=true;
      }
      let url1=hasKey ? url+'?'+queryString.stringify(params) : url;
      return fetch(url1,{credentials:'include'})
    },
    post:function (url,body) {
      let option = {
        'method':'POST',
        'headers':{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'credentials':'include'
      };
      option = _.extend(option, {'body':JSON.stringify(body)});
      return fetch(url,option)
    }
  }
};
export default CONFIG;
export function XHR(url,jsondata,type) {
  if(type.toUpperCase()=='POST'){
    return new Promise((resolve, reject) => {
      CONFIG.http.post(url,jsondata).then((res)=>{
        console.log(res);
        if(res.status==403){//没有权限
          reject('noRight');
        }else if(res.status!=200){
          reject('error');
        }else{
          resolve(res.json())
        }
      }).catch((err)=>{
        reject(err)
      });
    });
  }else if(type.toUpperCase()=='GET'){
    return new Promise((resolve, reject) => {
      CONFIG.http.get(url,jsondata).then((res)=>{
        console.log(res);
        if(res.status==403){//没有权限
          reject('noRight');
        }else if(res.status!=200){
          reject('error');
        }else{
          resolve(res.json())
        }
      }).catch((err)=>{
        reject(err)
      });
    });
  }
}

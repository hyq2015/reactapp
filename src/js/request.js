/**
 * Created by Administrator on 2017/3/23.
 */
var _ =require('lodash');
var queryString = require('query-string');
module.exports = {
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
  "queryShop":"/api/shop/query"
  },
  'CurrentVersion':'developversion/',
  'http':{
    get:function (url,params) {
      let url1=url+'?'+queryString.stringify(params);
      return fetch(url1).then(
        (res)=> res.json()
      )
    },
    post:function (url,body) {
      let option = {
        'method':'POST',
        'headers':{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      };
      option = _.extend(option, {'body':JSON.stringify(body)});
      return fetch(url,option).then(
        (res)=>res.json()

      )
    }
  }
};

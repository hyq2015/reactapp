import Reflux from 'reflux';
let AddaddressActions = Reflux.createActions({
  'saveAddress':{asyncResult:true},
  'getAddressDetail':{asyncResult:true}
});

export default AddaddressActions